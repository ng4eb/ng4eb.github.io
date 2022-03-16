export const ch5P2Markdown = `
## What is an observable

*RxJS and Observables are a broad topic. We will only focus on the basics to get you ready for most day-to-day usages.*

An **observable** is an object from the RxJS library. It is used for asynchronous, reactive programming like **promises**.

### Introduction to Promises

[This entry](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises) on the MDN docs is a great guide to learn about promises. In short, a promise is an object to which you attach callback functions. Below's a code template using promises with the fetch API:

\`\`\`typescript
async fetchSomething() {
  try {
\tconst response = await fetch(someUrl);
\t// put callbacks below for handling different cases based on returned code
\tswitch (response.data.code) {
\t\tcase 0:
\t\t\t// callback for handling case 0 here
\t\t\tbreak;
\t\t// callbacks for other cases
\t}
  } catch (err) {
    // callback for handling network error here
  }
}
\`\`\`

In the above,  note that the function \`fetchSomething\` is marked with the \`async\` keyword. In an \`async\` function, we can use the \`await\` keyword in front of a promise. Since the \`fetch\` function is a promise, we can use \`await\` in front of it. 

Using \`await\` will cause the code in the \`async\` function block to wait for the awaited promise to be *fulfilled*. Once fulfilled, based on the returned value, we can carry out different actions to handle different cases.

### Introduction to Observables

[The RxJS documentation](https://rxjs.dev/guide/observable#pull-versus-push) defines an observable as below:

> An **Observable** is a lazily evaluated computation that can synchronously or asynchronously return zero to (potentially) infinite values from the time it's invoked onwards.

And a promise is defined as:

> A **Promise** is a computation that may (or may not) eventually return a single value.

As shown in the definitions, a major difference between them is that *a promise will always only return a single value (if fulfilled), whereas an observable can return more than one*. 

This makes observables shine in handling a stream of data. We can use an observable to listen to the data stream and keep the front-end updated. This is commonly referred to **the pub-sub pattern**:

![pub-sub pattern concept](assets/images/ch5/pub_sub_pattern.png)

In the pub-sub pattern, the **publisher** (e.g. server) is in charge of outputting data. On the other hand, the **subscriber** reacts to the data based on the changes it observes. 

When we use an observable, we are telling the program to keep looking for changes in the emitted data. When a change is observed, we can instruct the program to react to it (for example, to update the UI).

Another difference is that an observable is *lazily-evaluated*. After an observable is created, it won't be evaluated until it is *subscribed*. In other words, only if we *subscribe* to an observable, would the observable code execute.

In contrast, a promise is *eagerly-evaluated*, i.e., when we create a promise, it will be immediately executed.

All in all, observables are more full-featured than promises. They are great for complex asynchronous programming. We will see how we can use them in Angular with a demo below.

## Creating a counter service using observables
In this section, we will come back to the counter service we made in the previous part. We will refactor it by using observables. If you do not have the project, you can fork it from [Stackblitz](https://stackblitz.com/edit/ng4eb-counter-service-demo).

Let's open the file \`pool.service.ts\`:

\`\`\`typescript
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
\`\`\`

We will first modify the \`_points\` property. Currently, it holds a number type value. We will turn it into an observable. Precisely ,we will convert it to a \`BehaviorSubject\`.

A \`BehaviorSubject\` is a special type of observable. It has some important characteristics: 

1. it has to be created with an initial value
2. when we subscribe to it, it will return the latest value, so we will at least get one value
3. we can use its \`getValue\`  method to retrieve its current value synchronously
4. we can update its value by calling its \`next\` method

\`BehaviorSubject\` works very well with components because the latter always wants at least one latest value (for display). So, more often than not, we will use \`BehaviorSubject\` to create our own observables in Angular.

Let's change the \`_points\` variable now:

\`\`\`typescript
private _points$ = new BehaviorSubject<number>(10);
\`\`\`

The \`BehaviorSubject\` class comes from the \`rxjs\` package, so we need to import it from there:

\`\`\`typescript
import { BehaviorSubject } from 'rxjs';
\`\`\`

Note that we renamed the variable to \`_points$\`. A common convention for naming observables is to add the dollar sign suffix \`$\`. 

We created a \`BehaviorSubject\` by using the \`new\` keyword in front of the \`BehaviorSubject\` class, which requires a generic type. Since we are dealing with the \`number\` type, we specified the generic type to \`number\`. Then, we provided an initial value of \`10\` as an argument. Without the initial value, we will get an error.

Next, let's change the implementation of the getter \`points\`:

\`\`\`typescript
get points(): number {
  return this._points$.getValue();
}
\`\`\`

By using the \`getValue\` method on \`_points$\`, we can still get the value we want in a synchronous manner.

Let's also add a new getter \`point$\` to return an observable:

\`\`\`typescript
get points$() {
  return this._points$.asObservable();
}
\`\`\`

Note that we used the \`asObservable\` method in the getter. That's because other components or services which consume it from outside should not know that they are getting a \`BehaviorSubject\`. By using \`asObservable\`, we make sure that whoever uses it will treat it as a regular observable.

Finally, let's change the implementation of \`incrementPool\` and \`decrementPool\`:

\`\`\`typescript
incrementPool() {
  this._points$.next(this.points + 1);
}

decrementPool() {
  this._points$.next(this.points - 1);
}
\`\`\`

To update \`_points$\`, we will use its \`next\` method. The argument is simply its current value (via the getter \`points\`) plus or minus \`1\`.

Now our application will work. However, there's one more improvement we can make to better utilize the power of observables.

Let's go back to \`app.component.ts\`. Previously, we had to use the \`PoolService\` directly in the template. With observables, we can turn it into a private variable instead:

\`\`\`typescript
export class AppComponent {
  points$ = this._poolService.points$;
  constructor(private _poolService: PoolService) {}
}
\`\`\`

Note that we also created a new variable named \`points$\`, to which we assigned the observable \`points$\` from \`PoolService\`.

Finally, let's update the template \`app.component.html\` to use \`points$\`:

\`\`\`html
<h1>Total points in pool: {{ points$ | async }}</h1>
<app-counter owner="Alice"></app-counter>
<br />
<br />
<app-counter owner="Bob"></app-counter>
\`\`\`

We replaced \`{{ poolService.points }}\` with\`{{ points$ | async }}\`. We used the \`async\` pipe for dealing with an observable in the template. Under the hood, Angular will subscribe to the observable and manage the subscription for us. You can read more about the pipe in [the documentation](https://angular.io/api/common/AsyncPipe).

Now, our application will still work without using \`PoolService\` directly in the template!

Congratulations! You have learned the basics of using observables in services. In the next chapter, we will see more use cases of observables.

You can also check out the code on [Stackblitz](https://stackblitz.com/edit/ng4eb-counter-service-observable-demo).

`