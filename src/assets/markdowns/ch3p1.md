## How components & modules work

### Introduction to Components

A component is a reusable building block of a user interface (UI) that can be combined with others to form a UI application. Examples of components include the navigation bar, the sidebar menu, and the footer. In Angular, components are used extensively to create complex applications.

### Angular Components

When we generate a component using the Angular CLI command `ng generate component`, four files are created for us:
- a template file (HTML)
- a stylesheet file (CSS/SCSS/SASS/LESS)
- a component logic file (TypeScript)
- a testing file (TypeScript).

![component structure](/assets/images/ch3/component_structure.jpg)

The template is dynamically injected into the DOM by Angular. The stylesheet file is a regular stylesheet that applies only to the component using it, thanks to scoped styling. The component logic file is responsible for the following:
- Gathering the template and stylesheet for Angular
- Adding logic to the component

### Components within Modules

Components are registered within modules, which are composed of components, services, and other modules. The app module is the **root module** that Angular uses to gather information for building the application.

![component inside module](/assets/images/ch3/component_inside_module.jpg)

## Creating a counter component

### Project Setup

Let's create a new Angular application called `counter-demo` using the following CLI command:

```
ng new counter-demo --routing=false --style=css
```

We used the flags `--routing=false` and `--style=css` above to tell the CLI that we do not need default routing setup and we want CSS as the stylesheet format.

Now, let's serve the app to port 12345 (feel free to choose any port you want):

```
ng serve --port=12345
```

We should see Angular's default content on localhost:12345:

![default page](/assets/images/ch3/default_content.jpg)

To get a blank page, simply remove everything in `app.component.html`.

### Creating the Counter

Let's create a new component for the counter:

```
ng generate component counter
```

The above command should create four new files and register the new component in app module.

To use the counter component, we need to add it into the template of the app component. That's because in our current setup, only the app component is read. So let's add the counter inside `app.component.html`:

```html
<app-counter></app-counter>
```

We added a tag with the name `app-counter`, which represents the counter component.  The name `app-counter` is the value of the `selector` property inside the file `counter.component.ts`. As explained in the [documentation](https://angular.io/api/core/Component#inherited-from-directive-decorator), the `selector` property is:

> The CSS selector that identifies this directive in a template and triggers instantiation of the directive.

Now, our page on localhost:12345 should auto-refresh and show the content of the counter component, which should be `counter works!` for now.

### Adding the Logic

Let's add a count variable inside `counter.component.ts` for keeping the current count value:

```typescript
import { Component, OnInit } from '@angular/core';  
  
@Component({  
 selector: 'app-counter',  
 templateUrl: './counter.component.html',  
 styleUrls: ['./counter.component.css']  
})  
export class CounterComponent implements OnInit {  
  count = 0;  
  
  constructor() { }  
  
  ngOnInit(): void {  
  }  
  
}
```

We added the line `count = 0` to set the value 0 to a variable named `count`. The variable is a member inside the `CounterComponent` class, and so we can manipulate it there.

Let's add two methods: one for incrementing the count value, and one for decrementing it:

```typescript
export class CounterComponent implements OnInit {  
  count = 0;  
  
  constructor() { }  
    
  increment() {  
    this.count++;  
  }  
 
  decrement() {  
    this.count--;  
  }  
  
  ngOnInit(): void {  
  }  
  
}
```

We added two methods `increment` and `decrement` respectively.

### Updating the Template

Finally, let's update the template of the counter component to see how we can display the count value. For that, we will remove everything in `counter.component.html` and then add the following:

```html
{{count}}
```

Now, our page should show the value `0`. The reason why it is showing `0` instead of `{{count}}` is because Angular recognizes the double curly brackets `{{}}`as a special syntax to extrapolate whatever the value inside as a string. The `count` value is `0`, which comes from the same component; therefore Angular is able to extrapolate it as `0` .

If we try to change it to some other names, like `{{counter}}` , it won't work, and we will see an error.

Let's add two buttons into the template for using the increment and decrement methods defined earlier:

```html
<button (click)="decrement()">-</button>  
{{count}}  
<button (click)="increment()">+</button>
```

The `(click)="someFunction()"` is another special syntax. The parentheses `()` are used for **event binding**. You can read more about it in [the documentation](https://angular.io/guide/event-binding).

In the case of `(click)`, it registers click events on an HTML element. So the above code means to fire the two methods whenever the buttons are clicked.

Now, we should have a fully functional counter on our page. Congratulations!

You can see the code for the counter demo app on [Stackblitz](https://stackblitz.com/edit/ng4eb-counter-demo).

## Nested components & two-way binding

A nested component is a component that appears within the template of another component. For example, as we put the counter component inside the template of the app component, the counter component is a nested component within the app component.

In a nested relationship, the parent component is the one that contains the other. In the example above, the app component is the parent of the counter component.

Angular provides us ways for making components in a nested relationship communicate. With an example, we will see how the parent component can give values to the child, and how the child can give its parent some values based on events.

### Project Setup

Let's create a project named `super-counter-demo`:

```
ng new super-counter-demo --routing=false --style=css
```

The super counter is consisted of an outer counter and two inner counters. The outer counter will keep the count values of the two inner counters, and the inner counters will be able to increment and decrement those values respectively.

Let's create the two types of counter:

```
ng g c outer-counter
ng g c inner-counter
```

*In the above, we used the shortcut `ng g c` instead of `ng generate component` as a shortcut.*

Let's first add the outer-counter component to the template of app component (replace the content of `app.component.html` with below code):

```html
<app-outer-counter></app-outer-counter>
```

Then, inside the template of the outer-counter component, we want to create instances of the inner-counter component. Also, let's display a sum of the two count values and a reset button. Let's change `outer-counter.component.html`:

```html
<app-inner-counter></app-inner-counter>
<app-inner-counter></app-inner-counter>
<div>Sum: {{count1 + count2}}</div>
<button (click)="reset()">reset</button>
```

Let's also define the variables `count1` and `count2`, and the method `reset()` inside `outer-counter.component.ts`:

```typescript
export class OuterCounterComponent implements OnInit {  
  count1 = 5;  
  count2 = 10;  
  constructor() { }  
    
  reset() {  
    this.count1 = 0;  
    this.count2 = 0;  
  }  
  
  ngOnInit(): void {  
  }  
  
}
```

We set `count1` and `count2` to `5` and `10` initially.

### @Input Decorator - From Parent to Child

Now, we need to set up a way for the inner counters to receive the values from the parent. For that, Angular provides the decorator `@Input`. Let's edit `inner-counter.component.ts` now to see it in play:

```typescript
export class InnerCounterComponent implements OnInit {  
  @Input() count!: number;  
  constructor() { }  
  
  ngOnInit(): void {  
  }  
  
}
```

Above, we added the line `@Input() count!: number;`, which saves an *input* value from the parent to a local variable called `count`. The exclamation mark (`!`) after the variable name is for satisfying the **strict property initialization** requirement from TypeScript. You can read more about it in [the TypeScript documentation](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization). Essentially, using `!` tells TypeScript that the variable won't be `undefined` though it is not initialized inline or in the constructor function.

With `@Input()`, we can pass values from the parent component:

```html
<app-inner-counter [count]="count1"></app-inner-counter>  
<app-inner-counter [count]="count2"></app-inner-counter>  
<div>Sum: {{count1 + count2}}</div>  
<button (click)="reset()">reset</button>
```

Angular recognizes `[count]="someValue"` as a special syntax. The square brackets `[]` indicate **property binding**. You can read more about it in [the documentation](https://angular.io/guide/property-binding).

In short, they indicate a property of a child element with a dynamic value from the parent.

Now the inner counters will receive the `count` value from the outer counter. So we should be able to use them in the template (`inner-counter.component.html`):

```html
<button (click)="decrement()">-</button>  
{{count}}  
<button (click)="increment()">+</button>
```

We will also need to define the `decrement()` and `increment()` methods. Let's try the following:

```typescript
increment() {  
  this.count++;  
}  
 
decrement() {  
  this.count--;  
}  
```

If we serve the application, we will be able to see the counters. However, there are problems:
1. the +/- buttons will only change the count in the inner counters, which is not reflected in the outer counter's sum;
2. the reset button does not reset the values of the inner counters.

To solve these, we need to make the inner counters emit events to the outer counter.

### @Output Decorator - From Child to Parent

For emitting a new count value from a child component to the parent, we will use the `@Output` decorator.  `@Output` is based on events:

![component output flow](/assets/images/ch3/component_output.jpg)

Since the child component does not contain the parent, it cannot send data directly via properties. Instead, the child will emit an event to which the parent can listen.

When the event is triggered, the child can emit a value as the event data, so that the parent who listens to the event will get the value.

Let's set up **an event emitter** inside `inner-counter.component.ts`  using `@Output`:

```typescript
import {  
 Component,  
 EventEmitter,  
 Input,  
 OnInit,  
 Output  
} from '@angular/core';  
  
@Component({  
  selector: 'app-inner-counter',  
  templateUrl: './inner-counter.component.html',  
  styleUrls: ['./inner-counter.component.css']  
})
export class InnerCounterComponent implements OnInit {  
  @Input() count!: number;  
  constructor() { }  
  
  @Output() countUpdatedEvent = new EventEmitter<number>();  
  
  increment() {  
    this.countUpdatedEvent.emit(this.count + 1);  
  }  
  decrement() {  
    this.countUpdatedEvent.emit(this.count - 1);  
  }  
  
  ngOnInit(): void {  
  }  
  
}
```

In the above, we added the line `@Output() countUpdatedEvent = new EventEmitter<number>();` and modified the implementations of `increment()` and `decrement()`.

The event emitter `countUpdatedEvent` is an instance of the `EventEmitter` class. We use `EventEmitter` together with the `@Output()`  decorator to tell Angular that `countUpdatedEvent` can be used to emit a new value to which can be listened from the parent.

Therefore, in both `increment()` and `decrement()`, we now use `countUpdatedEvent` to emit new count values.

Let's change the template of the outer counter component to listen to the event. Recall that `()` is used for event binding:

```html
<app-inner-counter [count]="count1" (countUpdatedEvent)="updateCount1($event)"></app-inner-counter>  
<app-inner-counter [count]="count2" (countUpdatedEvent)="updateCount2($event)"></app-inner-counter>  
<div>Sum: {{count1 + count2}}</div>  
<button (click)="reset()">reset</button>
```

In the above, we added `(countUpdatedEvent)="updateCount1($event)"` and `(countUpdatedEvent)="updateCount2($event)"`, which tells Angular that the outer counter should listen to the `countUpdatedEvent` from the inner counters.

We will define the `updateCount1` and `updateCount2` in a second. Before that, we should know that `$event` is a special variable that contains the data from an event. We pass `$event` to both methods so that we can manipulated the value. Let's add the methods to `outer-counter.component.ts` to see how:

```typescript
updateCount1(count: number) {  
  this.count1 = count;  
}  
updateCount2(count: number) {  
  this.count2 = count;  
}
```

The methods update `count1` and `count2` respectively. Note that the argument `count` corresponds to the variable `$event` in the template. As we have learned, `$event` is the emitted count value from the inner counters.

Now the application will work as expected. Not only is the first problem solved, the reset button should now work too. Congratulations!

*But why didn't the reset button work previously?*

That's because we should not alter the  `@Input()` value inside the child component as that causes the value to be out of sync with the parent. Either we choose not to change it, or we could use `@Output()` to update the value in the parent, as we did above.

You can see the full code on [Stackblitz](https://stackblitz.com/edit/ng4eb-super-counter-demo).
