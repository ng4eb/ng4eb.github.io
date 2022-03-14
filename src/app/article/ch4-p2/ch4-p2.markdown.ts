export const ch4P2Markdown = `
## Lazy-loading a module

There are many cases where we want to load a module only when a visitor visits a particular path. The technique to defer loading something is known as **lazy loading**. Lazy loading is critical for larger-scale applications with many routes and modules. The benefit is well-explained in [the official documentation](https://angular.io/guide/lazy-loading-ngmodules):

> Lazy loading helps keep initial bundle sizes smaller, which in turn helps decrease load times.

When we choose to lazy-load a module, the code for the module will not be downloaded until the visitor has visited the path where the module is required.

Let's create a new project named \`lazy-loading-demo\` to see how we can leverage this feature:

\`\`\`
ng new lazy-loading-demo --routing=true --style=css
\`\`\`

Next, let's create a new module named \`feature-a\`. This is the module we will lazy-load later:

\`\`\`
ng generate module feature-a --routing
\`\`\`

We added the \`--routing\` flag to ask the CLI to generate the routing module for us. When we want lazy-load a module, that module has to include routing of its own.

The above command will create a \`feature\` folder with two files in it, namely, \`feature-a.module.ts\` and \`feature-a-routing.module.ts\`. Then, let's also generate a component called \`feature-a\` as well:

\`\`\`
ng g c feature-a
\`\`\`

This will create the component and updated the \`feature-a\` module.

Next, we will configure the routing for lazy-loading. Let's edit the \`routes\` array in \`app-routing.module.ts\`:

\`\`\`typescript
const routes: Routes = [  
   {  
      path: 'feature-a',  
      loadChildren: () => import('./feature-a/feature-a.module').then((m) => m.FeatureAModule)  
   },  
];
\`\`\`

In the above, we used the \`loadChildren\` property. We specify this property for lazy-loading child routes. It accepts a dynamically imported module as value. One common syntax for that is \`() => import('...relativePathToModule').then((m) => m.moduleClassName)\`. So, we added that to import the \`feature-a\` module dynamically.

Since we \`loadChildren\` is for lazy-loading **child routes**, we need set them up in the lazy-loaded module. Hence, let's edit the \`routes\` array in \`feature-a-routing.module.ts\`:

\`\`\`typescript
const routes: Routes = [  
  {path: '', component: FeatureAComponent}  
];
\`\`\`

In the above, we set the empty path to render the \`feature-a\` component. Note that this empty path is a child route of the \`feature-a\` path. So, when a visitor visits \`localhost:4200/feature-a\`, the \`feature-a\` part is matched in the parent route in \`app-routing.module.ts\`, then it is forwarded to \`feature-a-routing.module.ts\` for further handling.

Now, the lazy-loaded module is fully set up. One last thing to do before we test it, is add a link to it in \`app.component.html\`:

\`\`\`html
<a routerLink="/feature-a">Feature A</a>
<router-outlet></router-outlet>
\`\`\`

Now, we can go to \`localhost:4200\` (assumed we serve the project to port 4200), we should see the link. If we open the devtools and go to the network tab, we should see these \`JavaScript\` downloaded initially:

![Lazy loaded demo - empty path](assets/images/ch4/lazy_loaded_1.png)

Now, if we click the link to \`localhost:4200/feature-a\`, the code for the lazy-loaded module will be downloaded, which will be reflected in the network tab:

![Lazy loaded demo - feature a path](assets/images/ch4/lazy_loaded_2.png)

Congratulations! Now you have learned how to lazy-load a module in Angular.

You can also check out the code on [Stackblitz](https://stackblitz.com/edit/ng4eb-lazy-loading-demo).

## Implementing an authentication router guard
In this section, we will learn how to block unauthenticated access to a route in Angular. The big idea is to implement a **guard**, which we can think of as a boolean test on whether a visitor is authenticated. If the result is *true*, we grant the access to the route. Otherwise, deny the access and redirect the visitor to some other page.

![router guard concept](assets/images/ch4/router_guard_concept.png)

### Project Setup

Let's create a new project named \`authentication-router-guard-demo\`:

\`\`\`
ng new authentication-router-guard-demo --routing=true --style=css
\`\`\`

Let's generate a guard named \`auth\` (short for *authentication*) under a folder called \`guard\`:

\`\`\`
ng generate guard guard/auth
\`\`\`

The CLI will prompt us on *which interfaces we would like to implement* with four options:

- CanActivate
- CanActivateChild
- CanDeactivate
- CanLoad

We will choose the \`CanActivate\`  option. It is for deciding if a route can be activated based on a boolean test, which is exactly what we want. You can read more about it in [the documentation](https://angular.io/api/router/CanActivate).

Below is the generated \`auth.guard.ts\` file:

\`\`\`typescript
import { Injectable } from '@angular/core';  
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';  
import { Observable } from 'rxjs';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class AuthGuard implements CanActivate {  
  canActivate(  
   route: ActivatedRouteSnapshot,  
   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {  
    return true;  
 }  
    
}
\`\`\`

In the above, we can see that the \`AuthGuard\` class implements the \`CanActivate\` interface. The interface enforces the implementation of a method called \`canActivate\`, which is the boolean test that we have been mentioning. 

Actually, it's a little more powerful than a boolean test. Its return types can be the following:

\`\`\`typescript
Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
\`\`\`

The above means that the \`canActivate\` method can return a \`boolean\` value, a \`UrlTree\` value, or a value of these two types wrapped inside an \`Observable\` or \`Promise\` (for asynchronous code). 

\`UrlTree\` is a class that represents a **parsed URL**. If we want to redirect a visitor to another url given the test fails, we can return a \`UrlTree\`. We can create a \`UrlTree\` object using the built-in \`Router\` as shown in [the documentation](https://angular.io/api/router/Router#createurltree).

### Implementing the Authentication Guard

Now, let's add the route guarding logic to \`auth.guard.ts\`. We will simulate the login flow for a visitor who has not logged in yet:

\`\`\`typescript
import {Injectable} from '@angular/core';  
import {  
 ActivatedRouteSnapshot,  
 CanActivate,  
 Router,  
 RouterStateSnapshot,  
 UrlTree  
} from '@angular/router';  
import {Observable} from 'rxjs';  
  
let isLoggedIn = false;  
  
@Injectable({  
   providedIn: 'root'  
})  
export class AuthGuard implements CanActivate {  
   constructor(private _router: Router) {  
   }  
  
   canActivate(  
    route: ActivatedRouteSnapshot,  
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {  
      if (!isLoggedIn) {  
         isLoggedIn = !isLoggedIn;  
\t\t return this._router.createUrlTree(['/login-route']);  
\t  }  
      return true;  
  }  
  
}
\`\`\`

For the sake of this demo, we created a global variable \`isLoggedIn\`. We don't usually declare global variables in an Angular application unless definitely necessary. In the next chapter, we will learn how to store variables inside a service to be consumed in multiple places.

We set \`isLoggedIn\` to \`false\` initially. Then, if the user tries to go to the *protected route* for the first time, we would redirect the user to the absolute path \`/login-route\` by returning a UrlTree.

At the same time, we would set the \`isLoggedIn\` to \`true\` to simulate the login process. Therefore, the second time the user tries to access the protected route, we would return \`true\`, meaning access is granted.

Let's now generate two pages for the protected route and the login route. We'd name them \`protected-page\` and \`login-page\` respectively:

\`\`\`
ng g c protected-page
ng g c login-page
\`\`\`

Next, we will add the two routes to the \`routes\` array in \`app-routing.module.ts\`:

\`\`\`typescript
const routes: Routes = [  
   {  
     path: 'protected-route',  
\t component: ProtectedPageComponent,  
\t canActivate: [AuthGuard]  
   },  
   {path: 'login-route', component: LoginPageComponent}  
];
\`\`\`

The first route is the \`protected-route\` path which corresponds to the \`protected-page\` component. We specified the \`canActivate\` property - it takes an array of router guards which implement the \`canActivate\` interface - to guard the route.

The second route is the \`login-route\` which would show the \`login-page\` component.

Finally, let's add a link and router-outlet to \`app.component.html\`:

\`\`\`html
<a routerLink="protected-route">Protected route</a>  
<router-outlet></router-outlet>
\`\`\`

Now, on the application page, if we click the link for the first time, we'd be redirected to \`/login-route\`:

![router guard login-route](assets/images/ch4/router_guard_demo_1.png)

Then, if we click the link again, we'd be able to get to \`/protected-route\`:

![router guard protected-route](assets/images/ch4/router_guard_demo_2.png)

Awesome! Now you have learned how to create and use an authentication guard in Angular!

You can check out the code for this demo on [Stackblitz](https://stackblitz.com/edit/ng4eb-authentication-router-guard-demo).

## Using resolvers

When a visitor routes to a page where plenty of data have to be loaded from a server, we may not want to show the page before the data are ready. For that, we may show a loading component when the data are being fetched, or we may simply use a **resolver**. A resolver is a class we use to tell the router to defer routing until the data are ready. You can read more about it in [the documentation](https://angular.io/api/router/Resolve).

In this section, we will build a demo that simulates the data loading in a route, and apply a resolver to defer routing until the data are resolved.

### Project Setup

Let's create a new project named \`resolver-demo\`:

\`\`\`
ng new resolver-demo --routing=true --style=css
\`\`\`

We will first prepare a file with some dummy data to be fetched from the resolver. Let's create a file named \`bigdata.ts\` under the \`app\` directory:

\`\`\`typescript
export const bigdata = [  
 "Lorem ipsum dolor sit amet. Star Resolver Great Data Great Great Great. Resolver Great Ebook Contribute Contribute ng4eb angular ng4eb Great Great Github Github. Great Contribute ng4eb angular Data Github Ebook Star.",  
 "Resolver Github Github Data Resolver angular Great Ebook Contribute. Ebook Resolver angular Ebook Star Ebook Data Data Great Ebook Contribute angular Data. Data Great Data Star Ebook Ebook ng4eb Resolver ng4eb ng4eb angular Great Github angular.",  
 "Contribute angular Github Data Star Github Resolver Data Great Contribute ng4eb Great Data angular. Resolver Contribute Star Github angular Data Github Github Contribute! Great Ebook angular Ebook ng4eb Ebook Ebook Contribute.",  
 "Github Star Data ng4eb angular Ebook Github Resolver Contribute Great ng4eb Ebook. Star Github Great Resolver Contribute.",  
 "Contribute ng4eb Ebook Star Data Contribute Star Github Contribute angular Data Github. Github Ebook Contribute Great ng4eb ng4eb Resolver Data Ebook Contribute ng4eb Ebook. Star Great Great Github Contribute Contribute Contribute Great Github angular! Data Great Contribute Great Resolver angular angular Star Data Contribute.",  
 "Resolver Star ng4eb Contribute Great Github Contribute? Github Ebook Star Github ng4eb Great. Great Star Ebook Resolver Contribute ng4eb Data ng4eb Github ng4eb Github angular.",  
 "Angular Ebook Contribute ng4eb Resolver Resolver Data Star Ebook ng4eb Great Resolver Data. Angular Contribute Contribute Ebook angular Data Contribute Contribute. Star Contribute Ebook Data Data Data Contribute Great Great Data Ebook!",  
 "Ebook Data angular Great Github Data Star. Data Contribute Contribute Contribute Contribute. Star Ebook Star angular Data Contribute Ebook Great Github Star.",  
 "Contribute Github Ebook ng4eb Star Ebook. Ebook Ebook Github angular Github Great angular Contribute Ebook Resolver ng4eb ng4eb! Great angular Contribute angular Resolver ng4eb Contribute Ebook Github Star.",  
 "Contribute Github Github Contribute Great ng4eb Data. Data Star Star Contribute Data Contribute angular Contribute angular Github Contribute?"  
]
\`\`\`

The \`bigdata.ts\` file simply exports an array of strings. In a real application, the data would come a server.

Next, we will create a resolver named \`bigdata\` in a new folder named \`resolver\`:

\`\`\`
ng generate resolver resolver/bigdata
\`\`\`

This is the generated \`bigdata.resolver.ts\` file:

\`\`\`typescript
import { Injectable } from '@angular/core';  
import {  
 Resolve,  
 RouterStateSnapshot,  
 ActivatedRouteSnapshot  
} from '@angular/router';  
import { Observable, of } from 'rxjs';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class BigdataResolver implements Resolve<boolean> {  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {  
    return of(true);  
 }  
}
\`\`\`
The \`BigdataResolver\` class implements the \`Resolver\` interface. This interface requires a generic type - for example, in the boilerplate it's set to \`boolean\` by default.

The \`Resolver\` interface enforces the implementation of the \`resolve\` method, which returns the data of the specified generic type wrapped in an observable. We will learn more about observables later. For now, let's simply edit the file to return the data from \`bigdata.ts\`:

\`\`\`typescript
import {Injectable} from '@angular/core';  
import {  
 ActivatedRouteSnapshot,  
 Resolve,  
 RouterStateSnapshot  
} from '@angular/router';  
import {Observable, of} from 'rxjs';  
import {bigdata} from '../bigdata';  
  
@Injectable({  
   providedIn: 'root'  
})  
export class BigdataResolver implements Resolve<string[]> {  
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {  
      this._busy(3000);  
\t  return of(bigdata);  
 }  
  
   private _busy(ms: number) {  
     const startTime = new Date().getTime();  
\t while (new Date().getTime() - startTime <= ms) {/* busy */}  
   }  
}
\`\`\`

In the above, we imported  \`bigdata\` from \`bigdata.ts\`. We also changed the generic type from \`boolean\` to \`string[]\`. 

We implemented and used a method \`_busy\`, which will simulate a delay in fetching the data. We set a 3 second delay in the above, before returning the observable of  \`bigdata\`.

### Applying the Resolver

Let's create a new component to use the resolver. We will call the component \`bigdata-page\`:

\`\`\`
ng g c bigdata-page -s -t
\`\`\`

Next, let's add a \`bigdata\` route to the \`routes\` array in \`app-routing.module.ts\`:

\`\`\`typescript
import {  
  BigdataPageComponent  
} from './bigdata-page/bigdata-page.component';  
import {BigdataResolver} from './resolver/bigdata.resolver';  
  
const routes: Routes = [  
   {  
      path: 'bigdata',  
      component: BigdataPageComponent,  
      resolve: {bigdata: BigdataResolver}  
   }  
];
\`\`\`

We added the \`resolve\` property to the route. It takes in an object of key-value pairs. The keys are the names for retrieving the data in the component. The values are the resolvers. Hence, the data with name \`bigdata\` will be sent from \`BigdataResolver\` to the \`bigdata-page\` component. 

Let's use the data in \`bigdata-page.component.ts\`:

\`\`\`typescript
import {Component, OnInit} from '@angular/core';  
import {ActivatedRoute} from '@angular/router';  
  
@Component({  
 selector: 'app-bigdata-page',  
 template: \`  
  <p *ngFor="let item of bigdata">  
  {{item}}  
  </p> \`,  
 styles: []  
})  
export class BigdataPageComponent implements OnInit {  
  bigdata: string[] = [];  
  
  constructor(private _route: ActivatedRoute) {  
  }  
  
  ngOnInit(): void {  
    this.bigdata = this._route.snapshot.data['bigdata'];  
  }  
  
}
\`\`\`

Above, we set up a new variable named \`bigdata\` of type \`string[]\`.  We also used injected the \`_route\` object from \`ActivatedRoute\` through dependency injection, a topic we will cover later. 

During the \`OnInit\` event of the component, we will retrieve the \`bigdata\` data under the \`snapshot.data\` property of the \`_route\` object, and pass it to the local variable \`bigdata\`. In the template, we used \`*ngFor\` to loop through the \`bigdata\` and render them in \`p\` tags.

Let's finally add a link and \`router-outlet\` to \`app.component.html\`:

\`\`\`html
<a routerLink="/bigdata">bigdata page</a>  
<router-outlet></router-outlet>
\`\`\`

 Now, let's serve the application to any port you like. If we go to the empty route (e.g. \`lcoalhost:4200/\`) and click the link, we will experience a 3-second delay before landing on the \`/bigdata\` route:

![resolver demo bigdata page](assets/images/ch4/resolver_demo.png)

Congratulations! You have now learned how to create, configure and apply a resolver!

You may also check out the code for this demo on [Stackblitz](https://stackblitz.com/edit/ng4eb-resolver-demo).

`;