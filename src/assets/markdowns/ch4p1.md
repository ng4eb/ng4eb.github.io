## How Routing Works
*Routing in Angular is used to render different components based on the requested page, which is determined by the URL path.*

![basic concept of routing](/assets/images/ch4/routing_concept.jpg)

### Why Router Is Needed

In a traditional, non-SPA (single page application) website, when a visitor goes to a page, the server returns an HTML file along with the assets that it contains.

However, an SPA works differently. No matter which page a visitor goes to, the whole application is sent to the visitor's browser first. Then, the application will determine which parts of the UI to render based on the url path. In Angular, the logic to decide what to render is handled by a **router**.

## Using the Routing Module

### Project Setup

To demonstrate how routing works, let's create a new project named `routing-demo` using the Angular CLI with the following command:

```
ng new routing-demo --routing=true --style=css
```

The `--routing=true` flag generates the default routing setup for us.

Under the `src/app` directory, we will see a file named `app-routing.module.ts`:

```typescript
import { NgModule } from '@angular/core';  
import { RouterModule, Routes } from '@angular/router';  
  
const routes: Routes = [];  
  
@NgModule({  
 imports: [RouterModule.forRoot(routes)],  
 exports: [RouterModule]  
})  
export class AppRoutingModule { }
```

Here's what we need to know about the `AppRoutingModule`:

1. It sets up the routes (think of them as paths) in the `imports` array. It uses the `routes` array (to be defined by us) and `RoutingModule` (provided by Angular)
2. The `RoutingModule` provides all sorts of tools we need for routing
3. The `AppRoutingModule` exports the `RoutingModule`

Angular knows and uses this module because It is imported inside `app.module.ts`:

```typescript
@NgModule({  
  declarations: [  
    AppComponent  
 ],  
 imports: [  
   BrowserModule,  
   AppRoutingModule  
 ],  
 providers: [],  
 bootstrap: [AppComponent]  
})  
export class AppModule { }
```

Let's create two pages with routes `/home` and `/about`.  On the `/home` route, we would show a `navbar` component and a `greeting` component. For the `/about` route, we would show the `navbar` component and an `about-us` component.

Let's generate the three components:

```
ng g c navbar -s -t
ng g c greeting -s -t
ng g c about-us -s -t
```

### Setting up the Routes

To set up the routes `/home` and `/about`, we have to define them in the `routes` array in `app-routing.module.ts`:

```typescript
import { NgModule } from '@angular/core';  
import { RouterModule, Routes } from '@angular/router';  
import {  
  GreetingComponent  
} from './greeting/greeting.component';  
import {  
  AboutUsComponent  
} from './about-us/about-us.component';  
  
const routes: Routes = [  
 {path: 'home', component: GreetingComponent},  
 {path: 'about', component: AboutUsComponent}  
];  
  
@NgModule({  
 imports: [RouterModule.forRoot(routes)],  
 exports: [RouterModule]  
})  
export class AppRoutingModule { }
```

In the above, we added two objects to the `routes` array:

```typescript
const routes: Routes = [  
 {path: 'home', component: GreetingComponent},  
 {path: 'about', component: AboutUsComponent}  
];  
```

Both objects are of the `Route` type, which you can read more about in [the official documentation](https://angular.io/api/router/Route).  A `Route` object must have the `path` property, which specifies the url path the router should monitor.

For example, the path `home`  tells the router to look for any path that begins with `home`. If we serve the application on port 4200, then the base url of our application will be `http://localhost:4200/`. So, the path `home` means `http://localhost:4200/home`.

After setting up the routes, we also need to integrate the router into our template. Let's replace `app.component.html` with the following:

```html
<app-navbar></app-navbar>
<router-outlet></router-outlet>
```

We added `<app-navbar></app-navbar>` because both the `home` and `about` paths have it. Below it, we added the `<router-outlet></router-outlet>`, which is a component from the `RouterModule` for rendering components based on paths.

Now, if we go to the `home` path, we should see both `navbar works!` and `greeting works!`, and on the `about` path, we will see `navbar works!` and `about-us works!`.

![basic setup success](/assets/images/ch4/routing_demo_1.jpg)

### Redirecting & Links

If we now go to the empty route, i.e., `localhost:4200/`, we will only see the navbar component. That's because the router fails to match any component to show under the empty path.

We can configure the router so that the empty route can be redirected to the `home` route. Let's edit the `routes` array in `app-routing.module.ts`:

```typescript
const routes: Routes = [  
 {path: 'home', component: GreetingComponent},  
 {path: 'about', component: AboutUsComponent},  
 {path: '', pathMatch: 'full', redirectTo: 'home'}  
];
```

In the above, we added the line:

```typescript
{path: '', pathMatch: 'full', redirectTo: 'home'}  
```

The empty path is denoted by `path: ''`.

We also need to set the `pathMatch` to `'full'` because Angular will otherwise match all possible routes. Typically, we would leave the `pathMatch` property to its default, which is `pathMatch: 'prefix'`. We have to set `pathMatch: 'full'` here since an empty path is a prefix of any URL.

We specified the `redirectTo` property to `home`. That means when the empty route is visited, the router would redirect the visitor to the `home` route.

Now, if we go to `localhost:4200` again, we should be redirected to `localhost:4200/home`.

Next, let's add some links and styling to `navbar` in `navbar.component.ts`:

```typescript
@Component({  
 selector: 'app-navbar',  
 template: `  
 <nav> 
 <a routerLink="home">Home</a> <a routerLink="about">About Us</a> 
 </nav>`,  
 styles: [  
      `nav {
        display: flex;
        align-items: center;
        height: 2rem;
        background: khaki;
       }
       a {
         margin-right: 0.5rem;
       }`
     ]  
})  
export class NavbarComponent implements OnInit {  
  
  constructor() { }  
  
  ngOnInit(): void {  
  }  
  
}
```

Pay attention to how links are declared in the template:

```html
<a routerLink="home">Home</a> <a routerLink="about">About Us</a> 
```

We use the `routerLink` property instead of `href` inside an anchor tag. The `routerLink` property comes from the `RouterModule`. It allows us to declare internal links. `routerLink` indicates to the router where the visitor is going and what components to render. That way, the page needs not refresh on a new page, hence making our app an SPA:

![routerlink setup](/assets/images/ch4/routing_demo_2.jpg)

### Not Found Page

What if a visitor goes to a route that does not exist? For example, if a visitor goes to `localhost:4200/hello`, there will be an error in the console:

![route not found error](/assets/images/ch4/routing_demo_not_found_error.jpg)

To fix this, we can create a fallback page. Typically, that would be a not-found page component. Let's create it now:

```
ng g c not-found-page -s -t
```

Let's edit the `routes` array in `app-routing.module.ts`:

```typescript
const routes: Routes = [  
 {path: 'home', component: GreetingComponent},  
 {path: 'about', component: AboutUsComponent},  
 {path: '', pathMatch: 'full', redirectTo: 'home'},  
 {path: '**', component: NotFoundPageComponent}  
];
```

In the above, we added the line:

```typescript
{path: '**', component: NotFoundPageComponent}
```

When we set `path` to `'**'` , it means to match all routes that are not matched above where it is declared. In this case, it will match all routes that are not `home`, `about`, or the empty route. The router will render the `NotFoundPageComponent` if we go to `localhost:4200/hello`:

![route not found page](/assets/images/ch4/routing_demo_not_found_page.jpg)

Congratulations! Now you have learned the basics of routing in Angular.

You can check out the code of this demo on [Stackblitz](https://stackblitz.com/edit/ng4eb-routing-demo).

## Creating Child Routes

Child routes are routes that are nested inside other routes. They are commonly used in scenarios like e-commerce sites, where we have pages that are related to a product, like the product listing page and the product detail page. These pages are children of the product page.

![basic child routes concept](/assets/images/ch4/child_routes_concept.jpg)

Let's create a new project named `child-routes-demo` to see child routes in practice:

```
ng new child-routes-demo --routing=true --style=css
```

Then, create three components, `navbar`, `product-listing` and `product-detail`:

```
ng g c navbar -s -t
ng g c product-listing -s -t
ng g c product-detail -s -t
```

In `app.component.html`, let's replace the content with the navbar and router-outlet:

```html
<app-navbar></app-navbar>
<router-outlet></router-outlet>
```

Let's also add a link to `product/list` and some styling in `navbar.component.ts`:

```typescript
@Component({  
 selector: 'app-navbar',  
 template: `  
 <nav>
  <a routerLink="product/list">Product Listing</a>
 </nav> `,  
 styles: [  
    `nav {
      display: flex;
      align-items: center;
      height: 2rem;
      background: khaki;
     } 
    ` 
   ]  
})  
export class NavbarComponent implements OnInit {  
  
  constructor() { }  
  
  ngOnInit(): void {  
  }  
  
}
```

In `product-listing.component.ts`, we want to show some products on the `product/list` route:

```typescript
import { Component, OnInit } from '@angular/core';  
  
type product = {  
 id: number;  
 name: string;  
 description: string;  
 price: number;  
}  
  
@Component({  
 selector: 'app-product-listing',  
 template: `  
 <div *ngFor="let item of products">  
   <h2>{{item.name}}</h2>  
   <p>{{item.description}}</p>  
   <p>price: \${{item.price}}</p>  
   <a [routerLink]="['/product', item.id]">read more</a>  
 </div> `,  
 styles: [  
  ]  
})  
export class ProductListingComponent implements OnInit {  
  
  readonly products: product[] = [  
   { id: 1, name: 'water bottle', description: 'this is a big water bottle', price: 5},  
   { id: 2, name: 'flashlight', description: 'this is a bright flashlight!', price: 3}  
  ];  
  
 constructor() { }  
  
  ngOnInit(): void {  
  }  
  
}
```

Note that we defined the `Product` type to have an `id`, `name`, `description`, and `price`. It helped us define our products array with better type safety.

We looped through the products using the `ngFor` directive and used `[routerLink]` to create links to the `product/:productId` route.

Note that since we are using inline template within backticks, we put a backward slash \ in front
of $ in the template to escape it since it is immediately followed by `{}`.

Also, we used `[routerLink]` instead of `routerLink` for using dynamic values. `[routerLink]="['someStaticString', someDynamicValue]"` is a common syntax to combine static and dynamic values to form a link. In `[routerLink]="['/product', item.id]"`,  `'/product'` is a static string. It has to begin with a `/` to tell the router that we want the link to be absolute. Otherwise, if we used `'product'`, we would have a link like this:

```
/product/listing/product/...
```

With `'/product'` instead, we will get:

```
/product/...
```

Therefore, `[routerLink]=['/product', item.id]` means:

```
/product/item.id
```

where `item.id` is a dynamic value coming from the `products` array.

In `app-routing.module.ts`, let's set up the routes array:

```typescript
const routes: Routes = [  
  {  
     path: 'product', children: [  
        {  
           path: 'list',  
           component: ProductListingComponent  
        },  
        {  
           path: ':productId',  
           component: ProductDetailComponent  
        }  
     ]  
  },  
  {path: '', pathMatch: 'full', redirectTo: 'product/list'}  
];
```

Note the colon symbol `:` in `:productId`. It specifies that `productId` is a parameter.  For example, if someone goes to `product/123`, the route `product/:productId` will be matched, and the value `123` will map to `productId`.  We will see how we can extract the parameter later.

After saving the changes, we can see that our page is already working:

![product listing child route working](/assets/images/ch4/child_routes_demo_1.jpg)

![product detail child route working](/assets/images/ch4/child_routes_demo_2.jpg)

The `children` property is where we specify the child routes. Although we did not specify any component at the `path: 'product'` level, we could do so. For example, we can set up a `product-page` wrapper for both the `product-listing` and `product-detail` components.

Let's create a `product-page` component to see how it works:

```
ng g c product-page -s -t
```

Then, let's edit `product-page.component.ts` to give it a background color and heading:

```typescript
@Component({  
 selector: 'app-product-page',  
 template: `  
  <div class="product-page">
   <h1>Product Page</h1>
   <router-outlet></router-outlet>
  </div> `,  
 styles: [  
      `.product-page { 
         background: lightblue;
       }`
      ]  
})  
export class ProductPageComponent implements OnInit {  
  
  constructor() { }  
  
  ngOnInit(): void {  
  }  
  
}
```

Note that we added `router-outlet` to the template. This step is important. Without it, the router would not be able to render the components specified in the child routes.

Finally, let's go back to `app-routing.module.ts` and modify the `routes` array:

```typescript
const routes: Routes = [  
   {  
      path: 'product', component: ProductPageComponent, children: [  
        {  
           path: 'list',  
           component: ProductListingComponent  
        },  
        {  
           path: ':productId',  
           component: ProductDetailComponent  
        }  
     ]  
  },  
  {path: '', pathMatch: 'full', redirectTo: 'product/list'}  
];
```

Now, we should see the wrapper around both the `product-listing` and `product-detail` components!

![product page wrapper working](/assets/images/ch4/child_routes_demo_3.jpg)

### Getting the Url Parameter

To retrieve and display the URL parameter `:productId` on the product detail page, we can use the Angular `ActivatedRoute`. Let's make the following changes to `product-detail.component.ts`:

```typescript
import {Component, OnInit} from '@angular/core';  
import {ActivatedRoute} from '@angular/router';  
  
@Component({  
 selector: 'app-product-detail',  
 template: `  
  <p> product-detail with product id {{productId}} works! </p> 
 `,  
 styles: [],  
})  
export class ProductDetailComponent implements OnInit {  
  productId = this._route.snapshot.paramMap.get('productId');  
  
  constructor(private _route: ActivatedRoute) {  
  }  
  
  ngOnInit(): void {
  }  
}
```

To retrieve the `productId` value, we first inject the `ActivatedRoute` dependency into the component. We then use its `snapshot` property to get the current route information. The `paramMap` property returns a map of all the parameter values in the URL. We use the get method with `'productId'` as an argument to retrieve the value of the `productId` parameter.

We store the value of `productId` in a variable and use it in the template. If we navigate to the URL `/product/1`, we should see the value `1` displayed in the template:

![extracting url parameter productId](assets/images/ch4/url_parameter_extraction.jpg)

Congratulations! You have learned how to use and configure child routes in Angular.

You can check out the code for this section on [Stackblitz](https://stackblitz.com/edit/ng4eb-child-routes-demo).
