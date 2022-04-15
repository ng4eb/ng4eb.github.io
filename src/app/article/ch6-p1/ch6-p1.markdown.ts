export const ch6P1Markdown = `
## How template-driven forms work

A *template*-driven form uses directives in the template for its core logic. Specifically, we would use the \`ngModel\` directive to create **two-way bindings** - sharing of the form data between the template and the component class in the TypeScript file. When a value is updated in either place, the change will be reflected in the other.

Commonly, we think of two-way bindings with the terms **model** and **view**. The **model** refers to the data in the component class in TypeScript, and the **view** represents the template:

![Concept of two way bindings](assets/images/ch6/two_way_binding_concept.jpg)

As we will see below, template-driven forms use two-way bindings through the use of property binding (with brackets \`[]\`), event binding (with parentheses \`()\`), and the directive \`ngModel\`. We will apply all these directly in the template.

## Using ngModel

In this section, we will learn to use the \`ngModel\` directive to build a template-driven form. 

### Setting up the Form

Let's create a new project named \`template-driven-form-demo\`:

\`\`\`
ng new template-driven-form-demo --routing=false --style=css
\`\`\`

We will create a simple registration form. So, let's create a component named \`reg-form\`:

\`\`\`
ng g c reg-form
\`\`\`

Then, put the below code into the template file \`reg-form.component.html\`:

\`\`\`html
<div class="container">  
 <h1>Registration Form</h1>  
 <form>  
 <input placeholder="full name" name="fullName" />  
 <input placeholder="email" type="email" name="email" />  
 <input placeholder="account name" name="accountName" />  
 <input placeholder="password" type="password" name="password" />  
 <button>Submit</button>  
 </form>  
</div>
\`\`\`

Note that the above code is simply a regular HTML form.

Let's then add some styling to \`reg-form.component.css\`:

\`\`\`css
.container {  
 position: fixed;  
 top: 0;  
 left: 0;  
 right: 0;  
 bottom: 0;  
 display: flex;  
 flex-direction: column;  
 align-items: center;  
 justify-content: center;  
 background: black;  
 color: white;  
}  
  
form {  
 display: flex;  
 flex-direction: column;  
 width: 100%;  
 max-width: 350px;  
 margin-bottom: 50px;
 font-size: 1.2rem;  
}  
  
input {  
 margin-bottom: 10px;  
 padding: 5px 10px;  
 font-size: 1em;  
}  
  
button {  
 padding: 5px;  
 font-size: 1em;  
}
\`\`\`

 Finally, let's show the form inside \`app.component.html\`:
 
\`\`\`html
<app-reg-form></app-reg-form>
\`\`\`

This is what we should see on the page:

![reg-form demo 1](assets/images/ch6/template_form_demo_1.jpg)


### Adding ngModel

Since \`ngModel\` directive is provided by the \`FormsModule\`, we need to import it. We will import the \`FormModule\` in the module where the \`reg-form\` component is declared. In our case, the \`reg-form\` is declared in the app module, so let's import the \`FormsModule\` in \`app.module.ts\`:

\`\`\`typescript
import {NgModule} from '@angular/core';  
import {BrowserModule} from '@angular/platform-browser';  
import {FormsModule} from '@angular/forms';  
  
import {AppComponent} from './app.component';  
import {RegFormComponent} from './reg-form/reg-form.component';  
  
@NgModule({  
 declarations: [  
  AppComponent,  
  RegFormComponent  
 ],  
 imports: [  
  BrowserModule,  
  FormsModule  
 ],  
 providers: [],  
 bootstrap: [AppComponent]  
})  
export class AppModule {  
}
\`\`\`

The \`FormsModule\` provides us with directives like \`ngModel\` and \`ngForm\` for building template-driven forms. When we import the \`FormsModule\`, it will automatically add the \`ngForm\` directive to every \`<form>\` tag in the template. This will allow us to access the status of a form. You can read more about \`NgForm\` in [the documentation](https://angular.io/api/forms/NgForm).

Now, let's add \`ngModel\` to \`reg-form.component.html\`:

\`\`\`html
<div class="container">  
 <h1>Registration Form</h1>  
 <form #regForm="ngForm" (ngSubmit)="onSubmit(regForm)">  
 <input placeholder="full name" name="fullName" ngModel />  
 <input placeholder="email" type="email" name="email" ngModel />  
 <input placeholder="account name" name="accountName" ngModel />  
 <input placeholder="password" type="password" name="password" ngModel />  
 <button>Submit</button>  
 </form>  
</div>
\`\`\`

We added \`ngModel\` to every \`input\` tag. Note that \`ngModel\` will only work with inputs that have the \`name\` properties specified.

Also, we added \`#regForm="ngForm"\` and \`(ngSubmit)="onSubmit(regForm)"\` in the form tag. Let's first talk about the former. 

As mentioned, \`FormsModule\`  attaches the \`ngForm\` directive to all form elements. With \`ngForm\`, we can access the status of a form by using a **template reference variable**. A template reference variable is declared inside a tag with a hash symbol \`#\`, followed by a name we pick. You can read more about it in [the documentation](https://angular.io/guide/template-reference-variables).

 In our case, we declared the template reference variable \`regForm\` on the \`form\` element.
 
\`\`\`html
<form #regForm>
\`\`\`

However, the above  \`regForm\` is referencing the \`HTMLFormElement\`. That will not allow us to access the values of the form. Instead, we should point \`#regForm\` to the \`ngForm\` directive:


\`\`\`html
<form #regForm="ngForm">
\`\`\`

Doing so allows us to use \`regForm\`  to track the status of the form, including the input values with \`ngModel\`.

The last step is to add a binding to the event when the user submits the form. For that, we can use the \`ngSubmit\` event emitter, which is made available by the \`ngForm\` directive. So, in \`(ngSubmit)="onSubmit(regForm)"\`, we bound our own function \`onSubmit\` to the \`ngSubmit\` event. We passed the reference variable \`regForm\` as an argument as it contains all the information we need of the form.

Now, let's define the \`onSubmit\` method inside \`reg-form.component.ts\`:

\`\`\`typescript
export class RegFormComponent implements OnInit {  
   constructor() {  
   }  
  
   onSubmit(form: NgForm) {  
     console.log('form submitted:', form);  
     console.log('form values:', form.value);  
   }  
  
   ngOnInit(): void {  
   }  
}
\`\`\`

For now, we are going to log the \`form\` object and the values \`form.value\` to the console.

Now, we can type something into the form, submit it, and see what we get in the console:

![console after form submission](assets/images/ch6/template_form_demo_2.jpg)

The \`form\` object includes all sorts of properties that describe the status of the form. The most useful information to us resides in the \`form: FormGroup\`  property. Let's expand it and see what we get:

![form object inspection](assets/images/ch6/template_form_demo_3.jpg)

 We see properties like \`controls\`, \`status\` and \`value\`. They are very handy for interacting with the form. In particular, \`controls\` gives us more fine-grained control over the individual inputs, \`status\` tells us if the form is valid, and \`value\` gives the input values in the form.

Let's have a closer look at the \`value\` property now:

![value object inspection](assets/images/ch6/template_form_demo_4.jpg)

With \`value\`, we can get back an object of the input data in the form, where the keys correspond to the \`name\` properties we give to the \`input\` tags, and the values are what the user typed into the form.

### Adding Validation

For validation in a template-driven form, we would use regular HTML form validation and some more Angular directives. Let's add some validation rules to  \`reg-form.component.html\`:

\`\`\`html
<div class="container">  
 <h1>Registration Form</h1>  
 <form #regForm="ngForm" (ngSubmit)="onSubmit(regForm)">  
 <input placeholder="full name" name="fullName" ngModel required />  
 <input placeholder="email" type="email" name="email" ngModel required email />  
 <input placeholder="account name" name="accountName" ngModel required minlength="4" />  
 <input placeholder="password" type="password" name="password" ngModel required pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />  
 <button>Submit</button>  
 </form>
 <p *ngIf="regForm.submitted">{{regForm.status}}</p>
</div>
\`\`\`

We added \`required\` to all input tags. Also, we added the \`email\` directive to the second input, a \`minlength\` validation to the third input, and a pattern validation to the final input. The pattern \`(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}\` is used to validate a password with a lowercase letter, an uppercase letter, a number and at least 8 digits.

Finally, we added a paragraph tag at the end. It will only be rendered when the form is submitted. We can know when the form is submitted by using the \`submitted\` property of the \`regForm\` variable. We will show if the form is valid via the \`status\` property.

Now, if we type in invalid values in each input field and submit the form, we will see the \`INVALID\` text showing at the bottom:

![invalid text](assets/images/ch6/template_form_demo_5.jpg)

If we check the console and expand the \`controls\` property, we would see there is an \`error\` object in each input, which shows the error that the input contains:

- \`accountName\`:
![accountName error](assets/images/ch6/template_form_demo_6.jpg)

- \`email\`:
![email error](assets/images/ch6/template_form_demo_7.jpg)

- \`fullName\`:
![fullName error](assets/images/ch6/template_form_demo_8.jpg)

- \`password\`:
![password error](assets/images/ch6/template_form_demo_9.jpg)

### Adding Error Styles

Now, let's add some styles to our input fields for indicating when there is an invalid value.

For that, we can use the CSS classes Angular applies to the inputs (with \`ngModel\`) based on their status:

- \`ng-untouched\`: when an input is not visited
- \`ng-touched\`: when an input has been visited
- \`ng-valid\`: when an input value is valid
- \`ng-invalid\`: when an input value is invalid
- \`ng-pristine\`: when an input value is not changed
- \`ng-dirty\`: when an input value has been changed

We will use \`ng-touched\`, \`ng-dirty\` and \`ng-invalid\` to target inputs that have been visited, changed and have invalid values. So, let's add the following styles to \`reg-form.component.css\`:

\`\`\`css
input.ng-touched.ng-invalid.ng-dirty {  
    border: 4px solid deeppink;  
}
\`\`\`

Now, if we try to type in invalid values in the inputs, we will get a thick border in deep pink as visual feedback:
![error feedback styling](assets/images/ch6/template_form_demo_10.jpg)

### Adding Default Values - Binding Model to View

So far, we have only added \`ngModel\`. The rest of the logic is handled by \`ngForm\`. While that works, sometimes we need more controls over the inputs. For example, we may want to add default values to the inputs. This is where we will need to apply property binding to \`ngModel\` using \`[]\`.

For example, we can add a default value of \`helloworld@example.com\`  to the email field. Let's do that in \`reg-form.component.html\`:

\`\`\`html
<input
  placeholder="email"
  type="email"
  name="email"
  [ngModel]="'helloworld@example.com'"
  required
  email
/>
\`\`\`

With the help of \`[]\`, we can pass the string \`'helloworld@example.com'\` as the value. We can put this string inside the TypeScript component class too if we want. Now, the email field should have a default value as we refresh the page:

![default value for email](assets/images/ch6/template_form_demo_11.jpg)

### Storing Values in TypeScript - Binding View to Model

On top of \`[]\`, we can also add the event binding syntax \`()\` on \`ngModel\` to achieve two-way binding.

Why do we want that though? As we have the values inside the component class, we can change the input values there. For example, we may add a reset button to reset the form. In this demo, we will only reset the \`accountName\` field.

So, let's create a \`accountName\` variable inside \`reg-form.component.ts\`. We will also give it a default value of \`bob123\`:

\`\`\`typescript
export class RegFormComponent implements OnInit {
  accountName = 'bob123';
  constructor() {}

  onSubmit(form: NgForm) {
    console.log('form submitted:', form);
    console.log('form values:', form.value);
  }

  resetAccountName() {
\tthis.accountName = 'bob123';
  }

  ngOnInit(): void {}
}
\`\`\`

Also, we added the \`resetAccountName\` method. It will reset the value of \`accountName\` to \`bob123\`

Then, let's edit \`reg-form.component.html\`:

\`\`\`html
<div class="container">  
 <h1>Registration Form</h1>  
 <form #regForm="ngForm" (ngSubmit)="onSubmit(regForm)">  
 <input placeholder="full name" name="fullName"  
  ngModel required/>  
 <input  
  placeholder="email"  
  type="email"  
  name="email"  
  [ngModel]="'helloworld@example.com'"  
  required  
  email />  
 <input  
  placeholder="account name"  
  name="accountName"  
  [(ngModel)]="accountName"  
  required  
  minlength="4"  
 />  
 <input  
  placeholder="password"  
  type="password"  
  name="password"  
  ngModel  
  required pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  
 />  
 <button type="button" (click)="resetAccountName()">  
  Reset accountName  
 </button>  
 <button>Submit</button>  
 </form>  
 <p *ngIf="regForm.submitted">{{ regForm.status }}</p>  
</div>
\`\`\`

First, in the input tag for \`accountName\`, we used \`[(ngModel)]\`. Note that it cannot be \`([ngModel])\`. That's because Angular sets the syntax of two-way bindings to be \`[()]\`, i.e. the parentheses should be placed inside the brackets.

We also added a new button that would trigger the \`clearAccountName\` method when clicked.

If we now change the value of the account name input, and then click the reset button, we will see the value be reset to \`bob123\`:

![reset value for accountName](assets/images/ch6/template_form_demo_12.jpg)

Great! Now you have learned the basics of template-driven forms in Angular!

The code of this demo is available on [Stackblitz](https://stackblitz.com/edit/ng4eb-template-driven-form-demo).
`
