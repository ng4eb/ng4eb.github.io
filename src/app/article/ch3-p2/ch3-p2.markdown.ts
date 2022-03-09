export const ch3P2Markdown = `
## How directives work

In Angular, **directives** are used to change the appearance or behaviour of existing DOM elements. There are three types of directives:

1. components
2. attribute directives
3. structural directives

![types of directives](/assets/images/ch3/directives.png)

We have explored components in the previous part. They are a special extension of directives with a template for building UI blocks. The other two kinds of directives don't come with a template, and so they are not used for generating the UI. However, they are handy for attaching behavior and structural attributes to an existing component or element.

### Attribute Directives
Attribute directives are used to add behavior. For example, we can use an attribute directive such as \`ngStyle\` to add styles to an element dynamically.

### Structural Directives
Structural directives are used to bring structural changes to the DOM. For example, we can use the \`ngIf\` directive to attach or detach an element dynamically.

## Using ngIf, ngFor & ngStyle

In this section, we will use three built-in directives of Angular - ngIf, ngFor & ngStyle. Other built-in directives are similar in how they work and can be looked up easily.

Let's create a new application named \`built-in-directives-demo\`:

\`\`\`
ng new built-in-directive-demo --routing=false --style=css
\`\`\`

Let's remove everything in \`app.component.html\` and type in the following:

\`\`\`html
<p [ngStyle]="{color: 'green', fontSize: '3em'}">I am green and big because Angular says so!</p>  
<p [ngStyle]="{color: 'green', 'font-size': '3em'}">Another one!</p>
<hr />  
<p *ngIf="true">You can see me because ngIf is evaluated to true</p>  
<p *ngIf="false">You can't see me because ngIf is evaluated to false</p>  
<hr />  
<p *ngFor="let fruit of ['orange', 'apple', 'banana']">  
 {{fruit}}  
</p>
\`\`\`

### ngStyle

The attribute directive - \`ngStyle\` - is used to add dynamic styles to an element. Recall the square brackets \`[]\` are used for **property binding**. Under the hood, \`ngStyle\` attaches the \`ngStyle\` property to get the dynamic style values and apply them to the **host** element. 

As shown above, there are two ways of writing the style values. Either use camel case for the property names like \`fontSize\`, or use the original format by putting them in quotes , e.g., \`'font-size'\`.

*We can also put the style values in the TypeScript file, and reference the variable name from the template.* For example, imagine the values \`"{color: 'green', fontSize: '3em'}"\` come from a parent component and are stored into a variable named \`someStyles\`, we can then use \`[ngStyle]="someStyles"\` to apply them.

### ngIf

It is a structural directive that toggles the presence of an element in the DOM. For marking directives as structural, we need to prefix them with an asterisk \`*\` That's why we wrote \`*ngIf\`.

If we serve the application, we would see that the line \`<p *ngIf="false">You can't see me ...</p>\` is not on the page because it is not added to the DOM tree. That is because when \`*ngIf\` is evaluated to \`false\`, the **host** element is not added to the DOM.

*Usually, ngIf is use with a dynamic boolean value from the TypeScript file*. We can then add a way to toggle the boolean value to attach or detach the host element as we wish.

### ngFor

It is a structural directive that allows us to loop through an array of items and generate the **host** element as many times as the number of items in the array.

The format\`*ngFor="let someItem of someItems"*\` is a special syntax. In \`let someItem of someItems\`, \`someItem\`  is the looped value, and \`someItems\`  is the array.

*We can also get the index of the current item from ngFor* by using \`let i = index\`, where \`i\` can be any name. For example, we can type in:

\`\`\`html
<p *ngFor="let fruit of ['orange', 'apple', 'banana']; let i = index">  
 {{i}}. {{fruit}}  
</p>
\`\`\`

The above will render the below numbered list on the page:

0. orange
1. apple
2. banana

Now you have already learned about three built-in directives in Angular! You can look at the full code of this section on [Stackblitz](https://stackblitz.com/edit/ng4eb-built-in-directives-demo).

## Creating a random color directive

In this section, we will create a custom directive that applies random colors to the host elements. Before we do so, it helps to have a brief look at the code structure of a custom directive.

### Structure of Custom Directive
The core of a directive is the \`@Directive\` decorator. Below is a basic setup of a directive:

\`\`\`typescript
import {Directive} from '@angular/core';

@Directive({
 selector: '[customDirective]',
})
export class CustomDirective {

}
\`\`\`

The structure for \`@Directive\` is almost identical to \`@Component\`. The only difference is that \`@Component\` requires either the property \`template\` or \`templateUrl\`. 

Like \`@Component\`, \`@Director\` has a \`selector\` property. Typically, we would use \`[someName]\` for the \`selector\` . It is a special syntax to allow the directive to be attached as an attribute to a tag in the template.

### Hands-on

Let's create a new project called \`random-color-directive-demo\`:

\`\`\`
ng new random-color-directive-demo --routing=false --style=css
\`\`\`

Now we can create a directive named \`random-color\` with the following command:

\`\`\`
ng generate directive random-color
\`\`\`

There will be two new files in the app folder, named \`random-color.directive.ts\` (main logic) and \`random-color.directive.spec.ts\`  (testing) respectively.

Let's edit \`random-color.directive.ts\`:

\`\`\`typescript
import { Directive, HostBinding } from '@angular/core';  
  
@Directive({  
   selector: '[appRandomColor]'  
})  
export class RandomColorDirective {  
   @HostBinding('style.color') get color() {  
        return 'red';
   }
  
}
\`\`\`

In the above, we added the portion:

\`\`\`typescript
@HostBinding('style.color') get color() {  
     return 'red';
}
\`\`\`

First, the decorator \`@HostBinding()\` is used to retrieve a property of the **host** element. We know that an HTML element has the property \`style\`, which is an object that contains the property \`color\`. Therefore, we can target it by specifying \`style.color\` inside the decorator as an argument.

Then, we typically use \`@HostBinding()\` with a getter function. The getter will set the value to the bound property. In the getter above, we return \`'red'\`.Therefore, the host element of this directive will have its \`style.color\` property set to \`'red'\`.

For generating a random color, we can use \`rgb\`, which accepts three integers of range between 0 and 255. Let's change the implementation now:

\`\`\`typescript
@HostBinding('style.color') get color() {  
   // generate three values of range 0 - 255  
 const rand1 = Math.ceil(Math.random() * 255);  
 const rand2 = Math.ceil(Math.random() * 255);  
 const rand3 = Math.ceil(Math.random() * 255);  
 return \`rgb(\${rand1}, \${rand2}, \${rand3})\`;  
}
\`\`\`

Then, we can test the decorator by using it in \`app.component.html\`:

\`\`\`html
<p appRandomColor>testing 1</p>  
<p appRandomColor>testing 2</p>  
<p appRandomColor>testing 3</p>  
<p appRandomColor>testing 4</p>  
<p appRandomColor>testing 5</p>
\`\`\`

And voila! You should see some random text colors on the screen.

You can check out the code for this section on [Stackblitz](https://stackblitz.com/edit/ng4eb-random-color-directive-demo).
`