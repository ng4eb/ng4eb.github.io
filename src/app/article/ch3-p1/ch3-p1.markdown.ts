export const ch3P1Markdown = `
## How components & modules work

### What are Components

A component is a building block of the UI, i.e., a standalone unit that can be reused and combined with others to build a website. For example, we can break down a website into components like the navigation bar, the sidebar menu, the footer, etc.

### How Angular Uses Components

When we use \`ng generate component\`, the Angular CLI generates four files for us - a template file (HTML), a stylesheet file (CSS/SCSS/SASS/LESS), a component logic file (TypeScript), and a testing file (TypeScript). 

![component structure](/assets/images/ch3/component_structure.png)

The template is generated and injected into the DOM dynamically by Angular.

The stylesheet file is just a regular stylesheet file. By default, the styles apply only to component(s) which uses them. In other words, styles are scoped within their components. Scoped styling is a nice feature as it prevents unwanted conflicts between global styles.

The logic file is responsible of two things. One, it gathers the template and stylesheet so that Angular knows where to look for the code. Two, it adds *logic* to the component. For example, we will create a counter component later in which we want to have the listed logic: (1) keep a count value, (2) increment the value, and (3) decrement the value.

### Components inside Modules

Components are registered in modules. Modules are made up of components, services and other modules:

![component inside module](/assets/images/ch3/component_inside_module.png)

The app module is the *root module* that Angular uses to get the information for building the application. We will soon see how all these things come together.

## Creating a counter component

### Project Setup

Let's create a new application named \`counter-demo\`:

\`\`\`
ng new counter-demo --routing=false --style=css
\`\`\`

We used the flags \`--routing=false\` and \`--style=css\` above to tell the CLI that we do not need default routing setup and we want CSS as the stylesheet format.

Now, let's serve the app to port 12345 (feel free to choose any port you want):

\`\`\`
ng serve --port=12345
\`\`\`

We should see Angular's default content on localhost:12345:

![default page](/assets/images/ch3/default_content.png)

To get a blank page, simply remove everything in \`app.component.html\`. 

### Creating the Counter

Let's create a new component for the counter:

\`\`\`
ng generate component counter
\`\`\`

The above command should create four new files and register the new component in app module.

To use the counter component, we need to add it into the template of the app component. That's because in our current setup, only the app component is read. So let's add counter inside \`app.component.html\`:

\`\`\`html
<app-counter></app-counter>
\`\`\`

We added a tag with the name \`app-counter\`, which represents the counter component.  The name \`app-counter\` is the value of the \`selector\` property inside the file \`counter.component.ts\`. As explained in the [documentation](https://angular.io/api/core/Component#inherited-from-directive-decorator), the \`selector\` property is:

> The CSS selector that identifies this directive in a template and triggers instantiation of the directive.

Now, our page on localhost:12345 should auto-refresh and show the content of the counter component, which should be \`counter works!\` for now.

### Adding the Logic

Let's add a count variable inside \`counter.component.ts\` for keeping the current count value:

\`\`\`typescript
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
\`\`\`

In the above, we added the line \`count = 0\` to set the value 0 to a variable named \`count\`. As you can see, the variable is a member inside the \`CounterComponent\` class, and so we can manipulate it there.

Let's add two methods: one for incrementing the count value, and one for decrementing it:

\`\`\`typescript
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
\`\`\`

In the above, we added two methods \`increment\` and \`decrement\` respectively.

### Updating the Template

Finally, let's update the template of the counter component to see how we can display the count value. For that, we will remove everything in \`counter.component.html\` and then add the following:

\`\`\`html
{{count}}
\`\`\`

Now, our page should show the value \`0\`. The reason why it is showing \`0\` instead of \`{{count}}\` is because Angular recognizes the double curly brackets \`{{}}\`as a special syntax to extrapolate whatever the value inside as a string. The \`count\` value is \`0\`, which comes from the same component; therefore Angular is able to extrapolate it as \`0\` .

If we try to change it to some other names, like \`{{counter}}\` , then it won't work and we will see an error.

Let's add two buttons into the template for using the increment and decrement methods defined earlier:

\`\`\`html
<button (click)="decrement()">-</button>  
{{count}}  
<button (click)="increment()">+</button>
\`\`\`

The \`(click)="someFunction()"\` is another special syntax. The parentheses \`()\` are used for **event binding**. You can read more about it in [the documentation](https://angular.io/guide/event-binding).

In the case of \`(click)\`, it registers click events on an HTML element. So the above code means to fire the two methods whenever the buttons are clicked.

Now, we should have a fully functional counter on our page. Congratulations!

You can see the code for the counter demo app on [Stackblitz](https://stackblitz.com/edit/ng4eb-counter-demo).

## Nested components & two-way binding

### @Input Decorator - From Parent to Child

A nested component is a component that appears inside the template of another component. For example, when we put the counter component inside the template of the app component, the counter component is nested.

In a nested relationship, we have a parent component and a child component. The parent component is the one that contains the other. In the example above, the app component is the parent of the counter component.

What's special about nested components? Angular provides us ways for making them communicate. With an example, we will see how the parent component can give values to the child, and also how the child can give its parent some values based on events.

Let's create a project named \`super-counter-demo\`:

\`\`\`
ng new super-counter-demo --routing=false --style=css
\`\`\`

We will create a super counter. The super counter is consisted of an outer counter and two inner counters. The outer counter will keep the count values of the two inner counters, and the inner counters will be able to increment and decrement those values respectively.

So let's create the two types of counter:

\`\`\`
ng g c outer-counter
ng g c inner-counter
\`\`\`

*In the above, we used the shortcut \`ng g c\` instead of \`ng generate component\`. Feel free to use both.*

Let's first add the outer-counter component to the template of app component (replace the content of \`app.component.html\` with below code):

\`\`\`html
<app-outer-counter></app-outer-counter>
\`\`\`

Then, inside the template of the outer-counter component, we want to place instances of the inner-counter component, a sum of the two count values, and a reset button. So, let's change \`outer-counter.component.html\`:

\`\`\`html
<app-inner-counter></app-inner-counter>
<app-inner-counter></app-inner-counter>
<div>Sum: {{count1 + count2}}</div>
<button (click)="reset()">reset</button>
\`\`\`
Let's also define the variables \`count1\` and \`count2\`, and the method \`reset()\` inside \`outer-counter.component.ts\`:

\`\`\`typescript
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
\`\`\`

We set \`count1\` and \`count2\` to \`5\` and \`10\` initially above.

Now, we need to set up a way for the inner counters to receive the values from the parent. For that, Angular provides the decorator \`@Input\`. Let's edit \`inner-counter.component.ts\` now to see it in play:

\`\`\`typescript
export class InnerCounterComponent implements OnInit {  
  @Input() count!: number;  
  constructor() { }  
  
  ngOnInit(): void {  
  }  
  
}
\`\`\`

Above, we added the line \`@Input() count!: number;\`, which means to save an *input* value from the parent, of the type *number*, to a local variable called \`count\`. The exclamation mark (\`!\`) after the variable name is for handling the **strict property initialization** requirement from TypeScript. You can read more about it in [the TypeScript documentation](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization). Essentially, using \`!\` tells TypeScript that the variable won't be \`undefined\` though it is not initialized inline or in the constructor function.

With \`@Input()\`, we can pass the values from the outer component by editing its template file again:

\`\`\`html
<app-inner-counter [count]="count1"></app-inner-counter>  
<app-inner-counter [count]="count2"></app-inner-counter>  
<div>Sum: {{count1 + count2}}</div>  
<button (click)="reset()">reset</button>
\`\`\`

Angular recognizes \`[count]="someValue"\` as a special syntax. The square brackets \`[]\` are used for **property binding**. You can read more about it in [the documentation](https://angular.io/guide/property-binding).
 
In short, \`[]\` means that there is a property of a child element that we control from the parent.

Now the inner counters will receive the \`count\` value from the outer counter. So we should be able to use them in the template (\`inner-counter.component.html\`):

\`\`\`html
<button (click)="decrement()">-</button>  
{{count}}  
<button (click)="increment()">+</button>
\`\`\`

We will also need to define the \`decrement()\` and \`increment()\` methods. Let's try the following:

\`\`\`typescript
increment() {  
  this.count++;  
}  
 
decrement() {  
  this.count--;  
}  
\`\`\`

If we serve the application, we will see the counters. However, there are two problems: 
1. the +/- buttons will only change the count in the inner counters, which is not reflected in the outer counter's sum;
2. the reset button does not reset the values of the inner counters.

Let's tackle the first problem, which is closely related to the second one.

### @Output Decorator - From Child to Parent

For emitting a new count value from a child component to the parent, we will use the \`@Output\` decorator.  \`@Output\` is based on events:

![component output flow](/assets/images/ch3/component_output.png)

Since the child component does not contain the parent, it cannot send data directly via properties. Instead, the child will emit an event to which the parent can listen. 

When the event is triggered, the child can emit a value as the event data, so that the parent who listens to the event will get the value.

Let's set up **an event emitter** inside \`inner-counter.component.ts\`  using \`@Output\`:

\`\`\`typescript
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
\`\`\`

In the above, we added the line \`@Output() countUpdatedEvent = new EventEmitter<number>();\` and modified the implementations of \`increment()\` and \`decrement()\`.

The event emitter \`countUpdatedEvent\` is an instance of the \`EventEmitter\` class. We use \`EventEmitter\` together with the \`@Output()\`  decorator to tell Angular that \`countUpdatedEvent\` can be used to emit a new value to which can be listened from the parent.

Therefore, in both \`increment()\` and \`decrement()\`, we now use \`countUpdatedEvent\` to emit new count values.

Let's change the template of the outer counter component to listen to the event. Recall that \`()\` is used for event binding:

\`\`\`html
<app-inner-counter [count]="count1" (countUpdatedEvent)="updateCount1($event)"></app-inner-counter>  
<app-inner-counter [count]="count2" (countUpdatedEvent)="updateCount2($event)"></app-inner-counter>  
<div>Sum: {{count1 + count2}}</div>  
<button (click)="reset()">reset</button>
\`\`\`

In the above, we added \`(countUpdatedEvent)="updateCount1($event)"\` and \`(countUpdatedEvent)="updateCount2($event)"\`, which tells Angular that the outer counter should listen to the \`countUpdatedEvent\` from the inner counters.

We will define the \`updateCount1\` and \`updateCount2\` in a second. Before that, we should know that \`$event\` is a special variable that contains the data from an event. We pass \`$event\` to both methods so that we can manipulated the value. Let's add the methods to \`outer-counter.component.ts\` to see how:

\`\`\`typescript
updateCount1(count: number) {  
  this.count1 = count;  
}  
updateCount2(count: number) {  
  this.count2 = count;  
}
\`\`\`

The methods update \`count1\` and \`count2\` respectively. Note that the argument \`count\` corresponds to the variable \`$event\` in the template. As we have learned, \`$event\` is the emitted count value from the inner counters.

Now the application will work as expected. Not only is the first problem solved, the reset button should now work too. Congratulations!

*But why didn't the reset button work previously?*

The short story is that we should not alter the  \`@Input()\` value inside the child component directly because that causes the value to be out of sync with the parent. Either we choose not to change it, or we should use \`@Output()\` to update the value in the parent, as we did above.

You can see the full code on [Stackblitz](https://stackblitz.com/edit/ng4eb-super-counter-demo).
`