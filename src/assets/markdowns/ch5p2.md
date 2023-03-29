## What is an observable

*RxJS and observables are broad topics, but we will focus on the basics to get you ready for most day-to-day usages.*

An **observable** is an object from the RxJS library. It is used for asynchronous, reactive programming like **promises**.

### Introduction to Promises

If you're not familiar with promises, [this entry](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises) on the MDN docs is a great guide to learn about them. In short, a promise is an object that allows you to attach callback functions. Here's an example using promises with the fetch API:

```typescript
async fetchSomething() {
  try {
	const response = await fetch(someUrl);
	// put callbacks below for handling different cases based on returned code
	switch (response.data.code) {
		case 0:
			// callback for handling case 0 here
			break;
		// callbacks for other cases
	}
  } catch (err) {
    // callback for handling network error here
  }
}
```

Note that the `async` keyword marks the `fetchSomething` function, allowing the use of `await` in front of the returned promise from the `fetch` function.

Using `await` causes the code in the `async` function block to wait for the awaited promise to be fulfilled. Once fulfilled, we can carry out different actions based on the returned value.

### Introduction to Observables

[The RxJS documentation](https://rxjs.dev/guide/observable#pull-versus-push) defines an observable as below:

> An **Observable** is a lazily evaluated computation that can synchronously or asynchronously return zero to (potentially) infinite values from the time it's invoked onwards.

And a promise is defined as:

> A **Promise** is a computation that may (or may not) eventually return a single value.

One significant difference between promises and observables is that a promise will only ever return a single value (if fulfilled), whereas an observable can return multiple values.

This makes observables ideal for handling a stream of data. We can use an observable to listen to the data stream and keep the front-end updated. This is commonly referred to as the **pub-sub pattern**:

![pub-sub pattern concept](assets/images/ch5/pub_sub_pattern.jpg)

In the pub-sub pattern, the **publisher** (e.g. server) is in charge of outputting data, and the **subscriber** reacts to the data based on the changes it observes.

When we use an observable, we are telling the program to keep looking for changes in the emitted data. When a change is observed, we can instruct the program to react to it (for example, to update the UI).

Another difference between observables and promises is that an observable is *lazily evaluated*. After an observable is created, it won't be evaluated until it is *subscribed*. In other words, the observable code only executes when we subscribe to it.

In contrast, a promise is *eagerly evaluated*, meaning that it executes immediately when created.

Overall, observables are more feature-rich than promises and are great for complex asynchronous programming. We will demonstrate how to use them in Angular with a demo below.

## Creating a counter service using observables
In this section, we will refactor the counter service created earlier to use observables. To access the project, you can fork it from [Stackblitz](https://stackblitz.com/edit/ng4eb-counter-service-demo).

Open the file `pool.service.ts`:

```typescript
@Injectable({
  providedIn: 'root',
})
export class PoolService {
  constructor() {}
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

Let's convert the `_points` property to an observable, specifically a `BehaviorSubject`.

A `BehaviorSubject` is a special type of observable. It has some important characteristics:

1. It has to be created with an initial value
2. When subscribed to, it returns the latest value
3. Its `getValue()` method retrieves its current value synchronously
4. Its value can be updated by calling its `next()` method

Since components always require the latest value for display, `BehaviorSubject` is an ideal choice for creating observables in Angular.

Let's change the `_points` variable now:

```typescript
private _points$ = new BehaviorSubject<number>(10);
```

The `BehaviorSubject` class is imported from the rxjs package, and we have renamed the variable to `_points$` to follow the convention of adding the $ suffix to observable variables.

```typescript
import { BehaviorSubject } from 'rxjs';
```

We created a `BehaviorSubject` by using the `new` keyword in front of the `BehaviorSubject` class and specifying the generic type number. We provided an initial value of 10 as an argument.

Next, let's modify the implementation of the points getter to use the `getValue()` method:

```typescript
get points(): number {
  return this._points$.getValue();
}
```

By using the `getValue` method on `_points$`, we can still get the value we want in a synchronous manner.

To return an observable, we will add a new getter called `points$`:

```typescript
get points$() {
  return this._points$.asObservable();
}
```

We used the `asObservable()` method to ensure that the observable is treated as a regular observable by the consuming components or services.

Finally, we will update the implementation of `incrementPool` and `decrementPool` to update `_points$` using its `next()` method:

```typescript
incrementPool() {
  this._points$.next(this.points + 1);
}

decrementPool() {
  this._points$.next(this.points - 1);
}
```

Now our application will work. However, there's one more improvement we can make to better utilize the power of observables.

Let's go back to `app.component.ts`. Previously, we had to use the `PoolService` directly in the template. With observables, we can turn it into a private variable instead:

```typescript
export class AppComponent {
  points$ = this._poolService.points$;
  constructor(private _poolService: PoolService) {}
}
```

Note that we also created a new variable named `points$`, to which we assigned the observable `points$` from `PoolService`.

Finally, let's update the template `app.component.html` to use `points$`:

```html
<h1>Total points in pool: {{ points$ | async }}</h1>
<app-counter owner="Alice"></app-counter>
<br />
<br />
<app-counter owner="Bob"></app-counter>
```

We replaced `{{ poolService.points }}` with`{{ points$ | async }}`. We used the `async` pipe for dealing with an observable in the template. Under the hood, Angular will subscribe to the observable and manage the subscription for us. You can read more about the pipe in [the documentation](https://angular.io/api/common/AsyncPipe).

Now, our application will work without directly consuming `PoolService` in the template!

Congratulations! You have learned the basics of using observables in services. In the next chapter, we will see more use cases of observables.

You can also check out the code on [Stackblitz](https://stackblitz.com/edit/ng4eb-counter-service-observable-demo).
