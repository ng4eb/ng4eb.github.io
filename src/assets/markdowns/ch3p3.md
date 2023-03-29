## Overview of lifecycles
*The concept of a lifecycle applies to all directives, including components. In this section, we will focus on the lifecycles of components, but the same concepts and techniques apply to all directives.*

Just like every story has a beginning, a middle, and an end, a component instance has a lifecycle as it is being created, updated and destroyed. In Angular, there are eight lifecycle events in total:

![eight lifecycle events](/assets/images/ch3/8_lifecycle_events.jpg)

A component lifecycle typically starts with the `OnChanges` or `OnInit` event, and from there goes through the events clockwise until it ends with `OnDestory`.

Let's examine all these events below.

### Beginning: OnChanges & OnInit

All components will first go through the `OnChanges` or `OnInit` event when Angular initializes them.

The `OnInit` event will happen in all components. During this event, we will often put in logic such as making HTTP requests, performing side effects, and subscribing to observables. We will discuss all of these in detail later.

The `OnChanges` event will only happen in components using the `@Input()` decorator. It occurs before the `OnInit` event.

`OnChanges` occurs whenever Angular detects a change in the property bound by `@Input()`. As the parent component gets initialized, the data bound by `@Input()` will get initialized before the child component. Hence, `OnChanges` will occur first. Then, as the child component gets initialized, the `OnInit` event will take place.

While `OnInit` occurs only once, `OnChanges` happens whenever there is a change in the `@Input()` data from the parent.

### Middle

#### DoCheck

`DoCheck` is a lifecycle event that runs immediately after the first `OnInit` event and subsequently immediately after all `Onchanges` events. It is useful for custom **change detection**. We will focus on the topic of **change detection** in the next section.

Because `DoCheck` gets called frequently, it can be computationally expensive to use. Generally, this event should only be used as a last resort if there are changes that Angular cannot detect. You can read more about it in [the official documentation](https://angular.io/guide/lifecycle-hooks#docheck).

#### AfterContentInit & AfterContentChecked

Like `OnInit`, the `AfterContentInit` event will only occur once. It happens when **content projection** has completed, a topic you can explore [in the documentation](https://angular.io/guide/content-projection).

The `AfterContentChecked` event takes place immediately after `AfterContentInit` initially and immediately after `DoCheck` subsequently.

#### AfterViewInit & AfterViewChecked

The `AfterViewInit` event occurs only once. It happens when a component's **view** is attached. In Angular, a **view** is like an organization of component(s). It helps to think of **view** in a nesting relationship.

Consider four components, A, B, C, and  X, where A is the parent of B and X, and B is the parent of C. Then, we can think of having four views here:

1. View One

```
A
----|----
|       |
X       B
|
C
```

2. View Two

```
X
```

3. View Three

```
B
|
C
```

4. View Four

```
C
```

Then, the `AfterViewInit` event of `B` will only occur after that of `C` has run. Similarly, the `AfterViewInit` event of `A` will only occur after that of `B` and `X`.

`AfterViewChecked`  is the event that runs immediately after `AfterViewInit` at first, and immediately after `AfterContentChecked` subsequently.

We should be careful when using `AfterViewChecked` because it can also be computationally expensive. We should avoid changing the state of the component within this event.

### End: OnDestroy

Finally, a component may leave the DOM tree. This can happen because we detach it using a structural directive like `*ngIf`, or we route to another page where the component does not exist. This is when the `OnDestroy` event will fire.

During the `OnDestory` event, we should commonly unsubscribe from observables to prevent memory leaks. We should also clear timers, unbind native event listeners, and other actions that may prevent our component from being garbage collected by the browser.

## Change Detection
*The topic of change detection is quite broad and deep. We will only cover the basics for most common usages.*

**Change detection** is the flow of Angular detecting changes in our application. It is about knowing when there may be a possible change in the data, so that Angular can start looking for those changes and update the DOM.

It helps to understand change detection with a scenario. Imagine that we store some value in TypeScript, and we put it into the DOM using text interpolation `{{}}`. When the value changes, we want Angular to automatically update the DOM with the new value.

To do that, Angular uses a library called [Zone.js](https://github.com/angular/angular/tree/master/packages/zone.js). As an Angular application initializes, Zone.js sets up a zone to wrap around it. Within the zone, all asynchronous tasks like click events, http requests and `setTimeout` are registered, i.e., Zone.js will insert implementations such as for monitoring when these asynchronous tasks start and end.

With that, Angular can start detecting changes whenever an asynchronous task has finished!

Now we know how the **detection** part is handled fundamentally, but how does Angular update the changes?

Long story short, during a change detection cycle, Angular will run through the **views** from top to bottom. In other words, Angular will start looking for changes from the app component, all the way down to the most nested components.

Although the default change detection mechanism of Angular is made to be performant, there are cases where we could increase the performance further by doing change detection manually. This is especially true in larger-scale applications.

We will work on an example where we will use manual change detection later. Meanwhile, you can read more about it from [this free article](https://www.digitalocean.com/community/tutorials/angular-change-detection-strategy) on Digital Ocean.

## Using lifecycles hooks

So how do we put our logic during a lifecycle event? No worries, Angular provides us with eight lifecycle hooks corresponding to the eight lifecycle events. Let's see how we can implement them.

### Project Setup

Let's create a new project named `lifecycle-hooks-demo`:

```
ng new lifecycle-hooks-demo --routing=false --style=css
```

Let's also generate four components, `A`, `B`, `C`,  and `X`,  with inline templates, styles and no testing files:

```
ng g c A -s -t --skip-tests
ng g c B -s -t --skip-tests
ng g c C -s -t --skip-tests
ng g c X -s -t --skip-tests
```

In the above, we used the `-s` flag to indicate using inline template, `-t` to indicate inline styles, and `--skip-tests` to skip generating the testing file.

Now, we will build the below nesting structure:

```
    A
----|----
|       |
X       B
|
C
```

First, let's edit `a.component.ts`:

```typescript
@Component({  
selector: 'app-a',  
template: `  
<app-x></app-x>
<app-b></app-b>
`,  
styles: []  
})  
export class AComponent implements OnInit {

constructor() { }

ngOnInit(): void {  
}

}
```

Then `b.component.ts`:

```typescript
@Component({  
selector: 'app-b',  
template: `  
<app-c></app-c>
`,  
styles: []  
})  
export class BComponent implements OnInit {

constructor() { }

ngOnInit(): void {  
}

}
```

Both `c.component.ts` and `x.component.ts` with an empty div:

```typescript
@Component({  
selector: 'app-c',  
template: `
  <div></div> 
 `,  
 styles: []  
})  
export class CComponent implements OnInit {  

constructor() { }

ngOnInit(): void {  
}

}
```

```typescript
@Component({  
selector: 'app-x',  
template: `
  <div></div> 
 `,  
 styles: []  
})  
export class XComponent implements OnInit {  

constructor() { }

ngOnInit(): void {  
}

}
```

Finally, let's replace `app.component.html` with the below one-liner:

```html
<app-a></app-a>
```

The page should be blank. If we inspect it with the element inspector, we should see the below structure:

![inspecting structure](/assets/images/ch3/inspecting_setup.jpg)

### Working with the ngOnInit hook

If we look at any of the component we have created, we will find that they all implement the `OnInit` interface by default. For example, here's the line inside `a.component.ts`:

```typescript
export class AComponent implements OnInit {
```

Since the `OnInit` event is commonly used, Angular ship it with the boilerplate code for a component by default. We can try to remove it, and the code will still work:

```typescript
export class AComponent {
```

That's because an interface is a TypeScript feature. It only ensures the classes that implement it should contain the `ngOnInit` hook method. However, even without the interface, we are allowed to use the `ngOnInit` method inside any component class.

The main benefit of implementing a lifecycle event interface is type safety. As a rule of thumb, we should implement a lifecycle event interface whenever we need to use its hook.

Let's now add some `console.log` inside the `ngOnInit` hook for all four components:

This is for `a.component.ts`:

```typescript
ngOnInit(): void {  
console.log('OnInit - A component');  
}
```

`b.component.ts`:

```typescript
ngOnInit(): void {  
console.log('OnInit - B component');  
}
```

`c.component.ts`:

```typescript
ngOnInit(): void {  
console.log('OnInit - C component');  
}
```

`x.component.ts`:

```typescript
ngOnInit(): void {  
console.log('OnInit - X component');  
}
```

Now, if we serve the application and open the developer's console, we should see the below:

![ngOnInit hooks in the console](/assets/images/ch3/console_ngoninit.jpg)

The order of initialization should be no surprise to us. The first component to initialize is `A` followed by `X`, `B`, and finally the most nested `C`.

What's interesting is if we switch the position of `X` and `B` components inside `a.component.ts`:

```typescript
@Component({  
selector: 'app-a',  
template: `  
<app-b></app-b>
<app-x></app-x> `,  
styles: []  
})  
export class AComponent implements OnInit {

constructor() { }

ngOnInit(): void {  
console.log('OnInit - A component');  
}

}
```

Now, the console should show the following:

![ngOnInit hooks with B and X swapped](/assets/images/ch3/console_ngoninit_2.jpg)

The reason why `X` is initialized before `C` is that nest components will only initialize after the components of the parent level have been initialized.

### Working with ngOnChanges

Let's also try to implement the `ngOnChanges`  hook, which corresponds to the `OnChanges` event.

For that, let's edit `x.component.ts`:

```typescript
import {  
Component,  
OnChanges,  
OnInit,  
SimpleChanges  
} from '@angular/core';

@Component({  
selector: 'app-x',  
template: `
  <div></div> `,  
 styles: []  
})  
export class XComponent implements OnChanges, OnInit {  

constructor() { }

ngOnChanges(changes: SimpleChanges) {  
console.log('OnChanges - X component, changes:', changes) ;  
}

ngOnInit(): void {  
console.log('OnInit - X component');  
}

}
```

In the above, we made the `XComponent` class implement the `OnChanges` interface. Then, we implement the `ngOnChanges` hook, which takes an optional argument of type `SimpleChanges`. This argument is injected by Angular and contains the changes the take place.

If we check the console, we will see that this lifecycle hook is not fired. That's because we do not use `@Input()` to bind a property from a parent component. So, let's edit `x.component.ts` again to add an bound property:

```typescript
export class XComponent implements OnChanges, OnInit {  
@Input() boundInput = 0;

constructor() { }

ngOnChanges(changes: SimpleChanges) {  
console.log('OnChanges - X component, changes:', changes) ;  
}

ngOnInit(): void {  
console.log('OnInit - X component');  
}

}
```

We will also edit `a.component.ts` to provide the `boundInput` data:

```typescript
@Component({  
selector: 'app-a',  
template: `  
<app-b></app-b>
<app-x [boundInput]="boundInput"></app-x>  
<button (click)="changeBoundInput()">Change Bound Input</button>
`,  
styles: []  
})  
export class AComponent implements OnInit {  
boundInput = 1;

constructor() { }

changeBoundInput() {
this.boundInput++;
}

ngOnInit(): void {  
console.log('OnInit - A component');  
}

}
```

Besides providing the `boundInput` value, we also created a button and a method to change it. Below is what we will see from the console after we save the changes:

![ngOnChanges hooks in the console](/assets/images/ch3/console_ngonchanges.jpg)

We can see the `changes` object tells us the `currentValue` , `previousValue`, and whether it is the first change. If we click the button to change `boundInput` value, `ngOnChanges` will fire again:

![ngOnChanges hooks fired after bound input changed](/assets/images/ch3/console_ngonchanges_2.jpg)

### Working with ngDoCheck

We will include `ngDoCheck` hook in all components to see when it fires. First, let's add it to `a.component.ts`:

```typescript
@Component({  
selector: 'app-a',  
template: `  
<app-b></app-b>
<app-x [boundInput]="boundInput"></app-x>  
<button (click)="changeBoundInput()">Change Bound Input</button>  
`,  
styles: []  
})  
export class AComponent implements OnInit, DoCheck {  
boundInput = 1;

constructor() { }

changeBoundInput() {  
this.boundInput++;  
}

ngOnInit(): void {  
console.log('OnInit - A component');  
}

ngDoCheck() {  
console.log('DoCheck - A Component')  
}

}
```

In the above, we made `AComponent` implement `DoCheck`. Then, inside the class body, we implemented the `ngDoCheck` hook. Let's do the same to all three other components.

Then, we should see the below in the console:

![ngDoCheck hooks in the console](/assets/images/ch3/console_ngdocheck.jpg)

As we expect, `DoCheck` will happen immediately after `OnInit` when a component initializes. The curious fact that `DoCheck`  fires twice for each component initially is due to the internal implementation of Angular engine, mainly to ensure that all changes are reflected correctly.

### ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit & ngAfterViewChecked

Next, let's add four hooks to all our components at once.

For example, here's the updated `a.component.ts`:

```typescript
import {  
AfterContentChecked,  
AfterContentInit,  
AfterViewChecked,  
AfterViewInit,  
Component,  
DoCheck,  
OnInit  
} from '@angular/core';

@Component({  
selector: 'app-a',  
template: `  
<app-b></app-b>
<app-x [boundInput]="boundInput"></app-x>  
<button (click)="changeBoundInput()">Change Bound Input
</button>
`,  
styles: []  
})  
export class AComponent implements OnInit,  
DoCheck,  
AfterContentInit,  
AfterContentChecked,  
AfterViewInit,  
AfterViewChecked {

boundInput = 1;

constructor() {  
}

changeBoundInput() {  
this.boundInput++;  
}

ngOnInit(): void {  
console.log('OnInit - A component');  
}

ngDoCheck() {  
console.log('DoCheck - A Component')  
}

ngAfterContentInit() {  
console.log('AfterContentInit - A Component');  
}

ngAfterContentChecked() {  
console.log('AfterContentChecked - A Component');  
}

ngAfterViewInit() {  
console.log('AfterViewInit - A Component');  
}

ngAfterViewChecked() {  
console.log('AfterViewChecked - A Component');  
}

}
```

If we check the console after updating all four components, we should see the following results:

![other hooks in the console](assets/images/ch3/console_other_hooks.jpg)

Pay attention to when these events happen at different times for all components. For `A`  component, as it is the root of all other components, it will go through the `AfterCotentInit` and `AfterContentChecked` events first. However, it is the last to go through `AfterViewInit` and `AfterViewChecked` because it has to wait until all other subviews nested in it become ready.

### Working with ngOnDestroy

The hook `ngOnDestroy` allows us to run code during the `OnDestroy` event of a component. To see how it works, let's add it to the `X` component:

```typescript
@Component({  
selector: 'app-x',  
template: `
   <div></div> 
  `,  
  styles: []  
})  
export class XComponent implements OnChanges,  
 OnInit,  
 AfterContentInit,  
 AfterContentChecked,  
 AfterViewInit,  
 AfterViewChecked,  
 OnDestroy {  
   @Input() boundInput = 0;  

constructor() {  
}

ngOnChanges(changes: SimpleChanges) {  
console.log('OnChanges - X component, changes:', changes);  
}

ngOnInit(): void {  
console.log('OnInit - X component');  
}

ngDoCheck() {  
console.log('DoCheck - X Component');  
}

ngAfterContentInit() {  
console.log('AfterContentInit - X Component');  
}

ngAfterContentChecked() {  
console.log('AfterContentChecked - X Component');  
}

ngAfterViewInit() {  
console.log('AfterViewInit - X Component');  
}

ngAfterViewChecked() {  
console.log('AfterViewChecked - X Component');  
}

ngOnDestroy() {  
console.log('OnDestroy - X Component');  
}

}
```

The `OnDestory` event will not occur unless we have a way to remove `X` component from the DOM. Therefore, let's add that logic to `a.component.ts`:

```typescript
@Component({  
selector: 'app-a',  
template: `  
<app-b></app-b>
<app-x *ngIf="renderX" [boundInput]="boundInput"></app-x>  
<button (click)="changeBoundInput()">
Change Bound Input
</button>
<button (click)="toggleXComponent()">
Toggle X Component
</button>  
`,  
styles: []  
})  
export class AComponent implements OnInit,  
DoCheck,  
AfterContentInit,  
AfterContentChecked,  
AfterViewInit,  
AfterViewChecked {

boundInput = 1;

renderX = true;

constructor() {  
}

changeBoundInput() {  
this.boundInput++;  
}

toggleXComponent() {  
this.renderX = !this.renderX;  
}

ngOnInit(): void {  
console.log('OnInit - A component');  
}

ngDoCheck() {  
console.log('DoCheck - A Component')  
}

ngAfterContentInit() {  
console.log('AfterContentInit - A Component');  
}

ngAfterContentChecked() {  
console.log('AfterContentChecked - A Component');  
}

ngAfterViewInit() {  
console.log('AfterViewInit - A Component');  
}

ngAfterViewChecked() {  
console.log('AfterViewChecked - A Component');  
}

}
```

In the above, we added a button to attach/detach the `X` component using the directive `*ngIf`. If we go to the webpage and click the button once, we should see that the `ngOnDestroy`  hook has fired:

![ngOnDestroy hooks in console](/assets/images/ch3/console_ngondestroy.jpg)

Awesome! Now we have seen how to use lifecycle hooks in Angular.

You can check out the code of this demo on [Stackblitz](https://stackblitz.com/edit/ng4eb-lifecycle-hooks-demo).
