export const ch5P1Markdown = `
## How services work

We can think of services (*the service layer*) as a solution to an issue:

*Writing all the logic inside components might be fine in a small application, but the code can quickly turn messy and unmanageable when the application scales up.*

Therefore, whenever appropriate, we should move the logic out of a component. Previously, we have learned that:

- For transformation *in the template*, we use **pipes**.
- For additional attributes to an element *in the template*, we use **directives**.

However, for logic that must reside in the TypeScript part of a component, we would use **services**.

### What the Service Layer Does

The **service** layer is responsible for two main duties:
1. communication between the components (the view layer) and the backend & database (the data layer)
2. communication among the components (within the view layer)

Below is a diagram that illustrates the above two points:

![the service layer's duties](assets/images/ch5/service_layer.jpg)

For example, if we want to fetch data from a server used in one or more components, we can put the data fetching logic inside a service.

Another use case is when we want to create a common value or function for multiple components to consume. We can put that into a service.

### Structure of a Service

Here's a basic service class in Angular:

\`\`\`typescript
@Injectable({
  providedIn: 'root'
})
export class SomeService {}
\`\`\`

The \`@Injectable\` decorator is applied to the class to turn it into a service. The decorator requires an object with the key \`providedIn\` as argument. The value can be:

1. \`'root'\`
2. \`'platform'\`
3. \`'any'\`

For most use cases, we will stick with the default \`providedIn: root\` option - this makes the service a global singleton available application-wide. You can read more about these options in [the documentation](https://angular.io/api/core/Injectable#options).

## Concept of dependency injection
Services are classes. If we intend to use them inside a component class, do we instantiate the former in the latter? In TypeScript, that means we will use the keyword \`new\`.

However, doing so means the service is no longer a global *singleton*. We will also have to manage the dependencies of the service ourselves. For example, if \`SomeService\`  depends on \`AService\`, which depends on \`BService\`, then we'd have to provide the dependencies:

\`\`\`typescript
const bService = new BService();
const aService = new AService(bService);
this.someService = new SomeService(aService);
\`\`\`

As we keep instantiating classes like this, the application will become unnecessarily big, hard to read, test and maintain. That's not ideal.

To avoid these issues, Angular uses a technique called **dependency injection**.

### How Dependency Injection Works

Angular wraps our app inside a dependency injection container. The container will be in charge of handling the dependencies for us. 

As we have seen, a service is decorated by the \`@Injector\` decorator. Angular will mark those classes with the decorator with some *token ids*. We can think of those ids as keys in a key-value mapping, where the values are the dependency instances.

Then, when we *inject* a service into a component, Angular will find if an instance of this dependency has been created in the mapping through its token id. If yes, simply return the instance. If not, Angular will create the instance.

In the case where the service has other dependencies, Angular will also get their token ids, and then resolve the dependencies through the mapping like the above. 

### How to Use Dependency Injection

Using dependency injection is simple. We simply inject the dependencies as constructor's arguments. For example, if we want to inject \`SomeService\` to \`SomeComponent\`, we can write the following in the \`SomeComponent\` class:

\`\`\`typescript
export class SomeComponent {
  someService: any;
  constructor(someService: SomeService) {
\tthis.someService = someService;
  }
}
\`\`\`

As we are using TypeScript, there's a shortcut to the above we often use, which is by providing an access modifier like \`private\`:

\`\`\`typescript
export class SomeComponent {
  constructor(private _someService: SomeService) {}
}
\`\`\`

If we want to use the service directly in the template, we may use the \`public\` modifier too:

\`\`\`typescript
export class SomeComponent {
  constructor(public someService: SomeService) {}
}
\`\`\`

## Creating a counter service

Let's create a new project to use services and dependency injection:

\`\`\`
ng new counter-service-demo --routing=false --style=css
\`\`\`

Then, create a counter component named \`counter\`:

\`\`\`
ng g c counter -t -s
\`\`\`

In this demo, we will create two counter instances - one for Alice, and one for Bob. They will share a pool of points. When we increment Alice's or Bob's count by 1, the points in the pool will decrement by 1. On the other hand, if we decrement Alice's or Bob's count by 1, the points in the pool will increment by 1. When there's no point in the pool, we cannot increment the count of both Alice and Bob.

We can use a service to keep the pool of points. So, let's create a service called \`pool\` inside a folder named \`service\`:

\`\`\`
ng generate service service/pool
\`\`\`

Next, let's edit \`pool.service.ts\` to create the points and functionality:

\`\`\`typescript
@Injectable({  
   providedIn: 'root'  
})  
export class PoolService {  
   constructor() {  
   }  
  
   private _points = 10; // default to have 10 points in total  
  
   get points() {  
      return this._points;  
   }  
  
   incrementPool() {  
      this._points++;  
   }  
  
   decrementPool() {  
      this._points--;  
   }  
}
\`\`\`

We added a private property \`_points\` and a getter. We then implemented two methods: \`incrementPool\` and \`decrementPool\`. They are for incrementing and decrementing \`_points\` respectively.

Next, let's edit \`counter.component.ts\` to use the service and set up the UI:

\`\`\`typescript
@Component({  
 selector: 'app-counter',  
 template: \`  
  {{owner}}'s count: {{count}}  
  <br /> 
  <button (click)="increment()">+</button>  
  <button (click)="decrement()">-</button>  
 \`,  
 styles: []  
})  
export class CounterComponent implements OnInit {  
  @Input() owner!: string;  
  count = 0;  
  
  constructor(private _poolService: PoolService) { }  
  
  increment() {  
    if (this._poolService.points > 0) {  
        this._poolService.decrementPool();  
\t    this.count++;  
\t}  
  }  
  
  decrement() {  
    if (this.count > 0) {  
        this._poolService.incrementPool();  
        this.count--;  
    }  
  }  
  
  ngOnInit(): void {  
  }  
  
}
\`\`\`

Each component instance will have a  \`count\` property to keep track of its own count. It will get an \`owner\` string (decorated with \`@Input()\`) from the parent component. We will use \`Alice\` or \`Bob\` for the owners later.

We used dependency injection to inject \`PoolService\` into the class. Since we do not need to access the class directly in the template, we used the \`private\` modifier. 

In the \`increment\` and \`decrement\` methods, we check if there are any points in the pool and component respectively. If yes, we will carry on the increment or decrement.

Let's also inject the service to \`app.component.ts\` to show the total points available in the pool:

\`\`\`typescript
@Component({  
 selector: 'app-root',  
 templateUrl: './app.component.html',  
 styleUrls: ['./app.component.css']  
})  
export class AppComponent {  
  
  constructor(public poolService: PoolService) {  
  }  
  
}
\`\`\`

We used the \`public\` modifier this time because we will use \`poolService\` in the template. Speaking of which, let's edit \`app.component.html\`:

\`\`\`html
<h1>Total points in pool: {{poolService.points}}</h1>  
<app-counter owner="Alice"></app-counter>  
<br />  
<br />  
<app-counter owner="Bob"></app-counter>
\`\`\`

In the template, we used \`poolService.points\` for getting the total points in the pool. Also, we included two \`app-counter\`'s, one for Alice, and one for Bob.

If we serve the application, we should be able to increment and decrement the counts of Alice and Bob. Also, we cannot increase either of their counts anymore if the pool runs out of points:

![counter service demo page](assets/images/ch5/counter_service_demo.jpg)

Nice job! You have learned how to create and use services in Angular!

You can check out the code of the demo on [Stackblitz](https://stackblitz.com/edit/ng4eb-counter-service-demo).
`;
