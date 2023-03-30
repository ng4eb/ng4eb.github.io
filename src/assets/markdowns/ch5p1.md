## How Services Work

In Angular, services are often considered as a solution to a common issue: keeping the code manageable as an application scales up. In small applications, it may be okay to have all the logic within a component. However, this approach becomes problematic as the application grows in complexity.

Therefore, whenever appropriate, we should move the logic out of a component. Previously, we have learned that:

- For transformation *in the template*, we use **pipes**.
- For additional attributes to an element *in the template*, we use **directives**.

However, for logic that must reside in the TypeScript part of a component, we can use **services**.

### What the Service Layer Does

The **service** layer is responsible for two main duties:
1. Communication between the components (the view layer) and the backend & database (the data layer)
2. Communication among the components (within the view layer)

Below is a diagram that illustrates the above two points:

![the service layer's duties](assets/images/ch5/service_layer.jpg)

One common use case for a service is when we want to fetch data from a server that one or more components will use. In such cases, we can place the data fetching logic within a service.

Another use case is when we want to create a common value or function that multiple components can use. Here again, we can use a service.

### Structure of a Service

Here's a basic service class in Angular:

```typescript
@Injectable({
  providedIn: 'root'
})
export class SomeService {}
```

To turn a class into a service, we apply the `@Injectable` decorator. The decorator takes an object with the key providedIn as an argument. The value can be one of the following:

1. `'root'`
2. `'platform'`
3. `'any'`

In most cases, we use the default `providedIn: root` option, which makes the service a global singleton available application-wide. For more information about these options, check out [the official Angular documentation](https://angular.io/api/core/Injectable#options).

## Concept of Dependency Injection
When using services inside a component class, we could instantiate the service inside the component class using the `new` keyword. However, this approach makes the service no longer a global singleton, and we'll have to manage its dependencies ourselves. For instance, if `SomeService` depends on `AService`, which depends on `BService`, we'd have to provide the dependencies like this:

```typescript
const bService = new BService();
const aService = new AService(bService);
this.someService = new SomeService(aService);
```

Instantiating classes this way can make the application unnecessarily large, hard to read, test, and maintain.

To address these issues, Angular uses a technique called **dependency injection**.

### How Dependency Injection Works

Angular wraps our app inside a dependency injection container that manages the dependencies for us. When we decorate a service with the `@Injectable` decorator, Angular marks the class with some token ids. These token ids act as keys in a key-value mapping, where the values are the dependency instances.

When we inject a service into a component, Angular finds if an instance of this dependency has already been created in the mapping through its token id. If the instance exists, Angular returns it. If not, Angular creates the instance.

In cases where the service has other dependencies, Angular also obtains their token ids and resolves the dependencies through the mapping as described above.

### How to Use Dependency Injection

To use dependency injection, we inject the dependencies as constructor arguments. For example, if we want to inject `SomeService` into `SomeComponent`, we can write the following in the `SomeComponent` class:

```typescript
export class SomeComponent {
  someService: any;
  constructor(someService: SomeService) {
	this.someService = someService;
  }
}
```

Using TypeScript, we can use a shortcut by providing an access modifier like `private`:

```typescript
export class SomeComponent {
  constructor(private _someService: SomeService) {}
}
```

If we want to use the service directly in the template, we may use the `public` modifier:

```typescript
export class SomeComponent {
  constructor(public someService: SomeService) {}
}
```

## Creating a Counter Service

Let's create a new Angular project to demonstrate the use of services and dependency injection. Open up your terminal and type:

```
ng new counter-service-demo --routing=false --style=css
```

Next, generate a new component called `counter` using the following command:

```
ng g c counter -t -s
```

In this demo, we will create two counter instances for Alice and Bob respectively. They will share a pool of points. When we increment Alice's or Bob's count by 1, the points in the pool will decrement by 1. On the other hand, if we decrement Alice's or Bob's count by 1, the points in the pool will increment by 1. When there are no points left in the pool, we cannot increment the count of either Alice or Bob.

To keep track of the pool of points, we can create a service called `PoolService` inside a folder named service by running the following command:

```
ng generate service service/pool
```

Now, let's implement the functionality of the `PoolService` by editing the `pool.service.ts` file:

```typescript
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
```

We added a private property `_points` and a getter to retrieve the current points in the pool. We then implemented two methods: `incrementPool` and `decrementPool`. They are for incrementing and decrementing `_points`, respectively.

Next, let's edit `counter.component.ts` to use the `PoolService` and set up the UI:

```typescript
@Component({  
 selector: 'app-counter',  
 template: `  
  {{owner}}'s count: {{count}}  
  <br /> 
  <button (click)="increment()">+</button>  
  <button (click)="decrement()">-</button>  
 `,  
 styles: []  
})  
export class CounterComponent implements OnInit {  
  @Input() owner!: string;  
  count = 0;  
  
  constructor(private _poolService: PoolService) { }  
  
  increment() {  
    if (this._poolService.points > 0) {  
        this._poolService.decrementPool();  
	    this.count++;  
	}  
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
```

Each component instance will have a  `count` property to keep track of its own count. It will get an `owner` string (decorated with `@Input()`) from the parent component. We will use `Alice` or `Bob` for the owners later.

We used dependency injection to inject `PoolService` into the class. Since we do not need to access the class directly in the template, we used the `private` modifier.

In the `increment` and `decrement` methods, we check if there are any points in the pool and component respectively. If yes, we will carry on the increment or decrement.

Let's also inject the service to `app.component.ts` to show the total points available in the pool:

```typescript
@Component({  
 selector: 'app-root',  
 templateUrl: './app.component.html',  
 styleUrls: ['./app.component.css']  
})  
export class AppComponent {  
  
  constructor(public poolService: PoolService) {  
  }  
  
}
```

We used the `public` modifier this time because we will use `poolService` in the template. Speaking of which, let's edit `app.component.html`:

```html
<h1>Total points in pool: {{poolService.points}}</h1>  
<app-counter owner="Alice"></app-counter>  
<br />  
<br />  
<app-counter owner="Bob"></app-counter>
```

In the template, we used `poolService.points` for getting the total points in the pool. Also, we included two `app-counter`'s, one for Alice, and one for Bob.

If we serve the application, we should be able to increment and decrement the counts of Alice and Bob. Also, we cannot increase either of their counts anymore if the pool runs out of points:

![counter service demo page](assets/images/ch5/counter_service_demo.jpg)

Nice job! You have learned how to create and use services in Angular!

You can check out the code of the demo on [Stackblitz](https://stackblitz.com/edit/ng4eb-counter-service-demo).
