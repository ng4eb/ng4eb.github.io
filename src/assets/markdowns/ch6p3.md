## What is HTTP Client

The [HTTP Client](https://angular.io/api/common/http/HttpClient) is a built-in tool in Angular for interacting with a server using the HTTP protocol. It is designed to work well with observables, which allows us to efficiently handle complex HTTP requests. Unlike [the fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), which is built into modern browsers, Angular HttpClient uses XMLHttpRequest to make HTTP requests.

Angular uses XMLHttpRequest (XHR) instead of the fetch API because XMLHttpRequest is more powerful and flexible. XMLHttpRequest is an older technology but is still used extensively because it is more mature and has more features than the fetch API.

To use the HTTP Client, we need to import the `HttpClientModule` in our application. Let's create a new project named `http-client-demo` to see it in practice:

```
ng new http-client-demo --routing=false --style=css
```

Let's now import the `HttpClientModule` in `app.module.ts`:

```typescript
import {NgModule} from '@angular/core';  
import {BrowserModule} from '@angular/platform-browser';  
import {HttpClientModule} from '@angular/common/http';  
  
import {AppComponent} from './app.component';  
  
@NgModule({  
 declarations: [  
   AppComponent  
 ],  
 imports: [  
   BrowserModule,  
   HttpClientModule  
 ],  
 providers: [],  
 bootstrap: [AppComponent]  
})  
export class AppModule {  
}
```

After we have imported the `HttpClientModule`, we can use *dependency injection* to inject `HttpClient` into any component class that belongs to the `AppModule`.

For example, we may create a new component named `try-http-client` and use the `HttpClient` in it:

```
ng g c try-http-client -s -t --skip-tests
```

Then, let's edit the generated TypeScript file:

```typescript
import {Component, OnInit} from '@angular/core';  
import {HttpClient} from '@angular/common/http';  
  
@Component({  
 selector: 'app-try-http-client',  
 template: `  
 <p> try-http-client works! </p> `,  
 styles: []  
})  
export class TryHttpClientComponent implements OnInit {  
  
   constructor(private http: HttpClient) {  
   }  
  
   ngOnInit(): void {  
     console.log('Http Client:', this.http);  
     // Read  
    console.log('Http Client Get:', this.http.get(  
      '', // we will pass the endpoint url of the server here  
	  { 
          /*  
          This is for the options (optional) 
          We can pass things like headers and params here 
          */ 
      }  
    ));  
    // Create  
    console.log('Http Client Post:', this.http.post(  
       '', // we will pass the endpoint url of the server here  
       [], // we will pass the data (body) here  
       {  
         // Options again  
       }  
    ));  
    // Update entirely  
    console.log('Http Client Put:', this.http.put(  
      '', // we will pass the endpoint url of the server here  
      [], // we will pass the entire data (body) here  
      {   
         // Options again   
      }  
    ));  
    // Update partially  
    console.log('Http Client Put:', this.http.put(  
      '', // we will pass the endpoint url of the server here  
      [], // we will pass the partial data (body) here  
      {  
        // Options again  
      }  
    ));  
   // Delete  
   console.log('Http Client Delete:', this.http.delete(  
     '', // we will pass the endpoint url of the server here  
     {  
       // Options again  
     }  
   ))  
   }  
  
}
```

We injected the `HttpClient` and made it available in the private `http` variable. During the `OnInit` lifecycle phase of this component, we console log the `http` object and its **CRUD** methods - `post` for **C**reate, `get` for **R**ead, `put` & `patch` for **U**pdate, and `delete` for **D**elete.

In each of these methods, we need to pass in the endpoint url of a server. Suppose we have a task management server at the base url `https://task-management.com/api`. If we want to use the API endpoint `task`, then we will pass the url `https://task-management.com/api/task`.

Each method can also accept an optional object where we can pass configurations like `headers` and `params`. You can also find all the configuration options in [the documentation](https://angular.io/api/common/http/HttpClient#options):

```typescript
options?: {  
  headers?: HttpHeaders | {  
    [header: string]: string | string[];  
  };  
  context?: HttpContext;  
  observe?: 'body';  
  params?: HttpParams | {  
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;  
  };  
  reportProgress?: boolean;  
  responseType?: 'json';  
  withCredentials?: boolean;  
  body?: any | null;  
}
```

Let's use the component in `app.component.html`:

```html
<app-try-http-client></app-try-http-client>
```

Now, if we open the console, we should see the following logs:

![console logging http client](assets/images/ch6/http_client_console_log.jpg)

As we can see, all the Http methods of the `HttpClient` return an observable. That means we can subscribe to it for getting the server's response.

## HTTP Requests to External API

In this section, we will demonstrate the usage of the `get` method with a free external API - [https://catfact.ninja](https://catfact.ninja).

The endpoint we will use is `fact`, which accepts a `GET` method call. Requesting this endpoint will return an object with the property `fact`, which is a random cat fact.

To use it, let's modify the `get` method call in `try-http-client.component.ts`:

```typescript
@Component({  
 selector: 'app-try-http-client',  
 template: `  
 <p> {{catFact}} </p> `,  
 styles: []  
})  
export class TryHttpClientComponent implements OnInit {  
   catFact = '';
   constructor(private http: HttpClient) {  
   }  
  
   ngOnInit(): void {  
     console.log('Http Client:', this.http);  
     // Read  
     console.log('Http Client Get:', this.http.get(  
       'https://catfact.ninja/fact', // we will pass the endpoint url of the server here  
       {  
         /*  
            This is for the options (optional) 
            We can pass things like headers and params here
         */ 
       }  
     ).subscribe((data: any) => this.catFact = data.fact));
    // Create  
    console.log('Http Client Post:', this.http.post(  
       '', // we will pass the endpoint url of the server here  
       [], // we will pass the data (body) here  
       {  
         // Options again  
       }  
    ));  
    // Update entirely  
    console.log('Http Client Put:', this.http.put(  
      '', // we will pass the endpoint url of the server here  
      [], // we will pass the entire data (body) here  
      {   
         // Options again   
      }  
    ));  
    // Update partially  
    console.log('Http Client Put:', this.http.put(  
      '', // we will pass the endpoint url of the server here  
      [], // we will pass the partial data (body) here  
      {  
        // Options again  
      }  
    ));  
   // Delete  
   console.log('Http Client Delete:', this.http.delete(  
     '', // we will pass the endpoint url of the server here  
     {  
       // Options again  
     }  
   ))  
   }  
  
}
```

After passing the api url to the `get` method, we also subscribed to it. In the subscription callback, we would get back the server response. We know the server will respond with an object that has a `fact` property. So we extracted it and assigned it to a local variable named `catFact`.

In the template, we simply displayed the `catFact` message in a `p` tag. Now, our page should show a new random cat fact on every refresh:

![demo of http client get](assets/images/ch6/http_client_demo.jpg)

Awesome! You have learned the basics of HTTP Client in Angular!

You can also find the code for this demo on [Stackblitz](https://stackblitz.com/edit/ng4eb-http-client-demo).
