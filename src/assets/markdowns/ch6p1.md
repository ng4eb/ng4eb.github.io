## How template-driven forms work

**Template-driven forms** use directives in the template for their core logic. The `ngModel` directive creates two-way bindings, allowing the form data to be shared between the template and the component class in TypeScript. Any updates made in either location will be reflected in the other.

In the context of two-way bindings, we commonly refer to the **model** as the data in the component class and the **view** as the template:

![Concept of two way bindings](assets/images/ch6/two_way_binding_concept.jpg)

In template-driven forms, two-way bindings are achieved through property binding (using brackets `[]`), event binding (using parentheses `()`), and the `ngModel` directive. All of these are applied directly in the template.

## Using ngModel

In this section, we will learn to use the `ngModel` directive to build a template-driven form.

### Setting up the Form

Let's create a new project named `template-driven-form-demo` by running the following command:

```
ng new template-driven-form-demo --routing=false --style=css
```

We will create a simple registration form by generating a component called `reg-form` using the following command:

```
ng g c reg-form
```

Then, put the below code into the template file `reg-form.component.html`:

```html
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
```

Note that this is a regular HTML form.

Now, let's add some styles to `reg-form.component.css`:

```css
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
```

Finally, let's show the form inside `app.component.html`:

```html
<app-reg-form></app-reg-form>
```

This is what the form should look like on the page:

![reg-form demo 1](assets/images/ch6/template_form_demo_1.jpg)


### Adding ngModel

To use the `ngModel` directive in template-driven forms, we need to import the `FormsModule`. In our case, since we have declared the `reg-form` component in the app module, we will import `FormsModule` in `app.module.ts`. The `FormsModule` provides us with directives like `ngModel` and `ngForm` for building template-driven forms.

```typescript
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
```

Now, let's add `ngModel` to `reg-form.component.html`:

```html
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
```

We added `ngModel` to every `input` tag. Note that `ngModel` will only work with inputs that have the `name` properties specified.

Also, we added `#regForm="ngForm"` and `(ngSubmit)="onSubmit(regForm)"` in the form tag. Let's first talk about the former.

As mentioned, `FormsModule`  attaches the `ngForm` directive to all form elements. With `ngForm`, we can access the status of a form by using a **template reference variable**. A template reference variable is declared inside a tag with a hash symbol `#`, followed by a name we pick. You can read more about it in [the documentation](https://angular.io/guide/template-reference-variables).

In our case, we declared the template reference variable `regForm` on the `form` element.

```html
<form #regForm>
```

However, the above  `regForm` is referencing the `HTMLFormElement`. That will not allow us to access the values of the form. Instead, we should point `#regForm` to the `ngForm` directive:

```html
<form #regForm="ngForm">
```

Doing so allows us to use `regForm` to track the status of the form, including the input values with `ngModel`.

The last step is to add a binding to the event when the user submits the form. For that, we can use the `ngSubmit` event emitter, which is made available by the `ngForm` directive. So, in `(ngSubmit)="onSubmit(regForm)"`, we bound our own function `onSubmit` to the `ngSubmit` event. We passed the reference variable `regForm` as an argument as it contains all the information we need of the form.

Now, let's define the `onSubmit` method inside `reg-form.component.ts`:

```typescript
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
```

For now, we are going to log the `form` object and the values `form.value` to the console.

Now, we can type something into the form, submit it, and see what we get in the console:

![console after form submission](assets/images/ch6/template_form_demo_2.jpg)

The `form` object includes all sorts of properties that describe the status of the form. The most useful information to us resides in the `form: FormGroup`  property. Let's expand it and see what we get:

![form object inspection](assets/images/ch6/template_form_demo_3.jpg)

We see properties like `controls`, `status` and `value`. They are very handy for interacting with the form. In particular, `controls` gives us more fine-grained control over the individual inputs, `status` tells us if the form is valid, and `value` gives the input values in the form.

Let's have a closer look at the `value` property now:

![value object inspection](assets/images/ch6/template_form_demo_4.jpg)

We can get back an object of the input data from `value` in the form, where the keys correspond to the `name` properties given to the `input` tags, and the values are what the user typed into the form.

### Adding Validation

To add validation to a template-driven form, we can use regular HTML form validation and some additional Angular directives. Let's modify `reg-form.component.html` to add some validation rules:

```html
<div class="container">  
 <h1>Registration Form</h1>  
 <form #regForm="ngForm" (ngSubmit)="onSubmit(regForm)">  
 <input placeholder="full name" name="fullName" ngModel required />  
 <input placeholder="email" type="email" name="email" ngModel required email />  
 <input placeholder="account name" name="accountName" ngModel required minlength="4" />  
 <input placeholder="password" type="password" name="password" ngModel required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />  
 <button>Submit</button>  
 </form>
 <p *ngIf="regForm.submitted">{{regForm.status}}</p>
</div>
```

We added required to all input tags. Additionally, we added the email directive to the second input, a minlength validation to the third input, and a pattern validation to the final input. The pattern `(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}` is used to validate a password with a lowercase letter, an uppercase letter, a number, and at least eight characters.

Finally, we added a paragraph tag at the end. It will only be rendered when the form is submitted. We can know when the form is submitted by using the `submitted` property of the `regForm` variable. We will show if the form is valid via the `status` property.

When we type in invalid values in each input field and submit the form, we will see the `INVALID` text showing at the bottom:

![invalid text](assets/images/ch6/template_form_demo_5.jpg)

If we check the console and expand the `controls` property, we would see there is an `error` object in each input, which shows the error that the input contains:

- `accountName`:
  ![accountName error](assets/images/ch6/template_form_demo_6.jpg)

- `email`:
  ![email error](assets/images/ch6/template_form_demo_7.jpg)

- `fullName`:
  ![fullName error](assets/images/ch6/template_form_demo_8.jpg)

- `password`:
  ![password error](assets/images/ch6/template_form_demo_9.jpg)

### Adding Error Styles

Now, let's add some styles to our input fields for indicating when there is an invalid value.

For that, we can use the CSS classes Angular applies to the inputs (with `ngModel`) based on their status:

- `ng-untouched`: when an input is not visited
- `ng-touched`: when an input has been visited
- `ng-valid`: when an input value is valid
- `ng-invalid`: when an input value is invalid
- `ng-pristine`: when an input value is not changed
- `ng-dirty`: when an input value has been changed

We will use `ng-touched`, `ng-dirty` and `ng-invalid` to target inputs that have been visited, changed and have invalid values. So, let's add the following styles to `reg-form.component.css`:

```css
input.ng-touched.ng-invalid.ng-dirty {  
    border: 4px solid deeppink;  
}
```

Now, if we try to type invalid values in the inputs, we will get a thick border in deep pink as visual feedback:
![error feedback styling](assets/images/ch6/template_form_demo_10.jpg)

### Adding Default Values - Binding Model to View

While `ngForm` provides most of the form logic, sometimes we may want more control over the inputs. For example, we may want to set default values or dynamically bind the value of an input field to a property of the component class.

To set a default value for an input field, we can use property binding (`[]`) on `ngModel`. For instance, let's set a default value of `helloworld@example.com` for the email field in `reg-form.component.html`:

```html
<input
  placeholder="email"
  type="email"
  name="email"
  [ngModel]="'helloworld@example.com'"
  required
  email
/>
```

By enclosing `'helloworld@example.com'` within `brackets`, we bind it to the `ngModel` directive, and the email field will now have the default value on page refresh:

![default value for email](assets/images/ch6/template_form_demo_11.jpg)

### Storing Values in TypeScript - Binding View to Model

In addition to using `[]`, we can achieve two-way binding on `ngModel` by adding the event binding syntax `()`.

Why do we want two-way binding? By storing the values inside the component class, we can change the input values programmatically. For instance, we may add a reset button to reset the form or make changes to the input values based on some condition.

Let's create a `accountName` variable inside `reg-form.component.ts` with a default value of `bob123`:

```typescript
export class RegFormComponent implements OnInit {
  accountName = 'bob123';
  constructor() {}

  onSubmit(form: NgForm) {
    console.log('form submitted:', form);
    console.log('form values:', form.value);
  }

  resetAccountName() {
	this.accountName = 'bob123';
  }

  ngOnInit(): void {}
}
```

We also added the `resetAccountName` method that resets the value of `accountName` to `bob123`.

Then, let's edit `reg-form.component.html`:

```html
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
  required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  
 />  
 <button type="button" (click)="resetAccountName()">  
  Reset accountName  
 </button>  
 <button>Submit</button>  
 </form>  
 <p *ngIf="regForm.submitted">{{ regForm.status }}</p>  
</div>
```

In the input tag for accountName, we used `[(ngModel)]` for two-way binding. Note that the syntax should be `[(ngModel)]` instead of `([ngModel])`. You can remember this by thinking of bananas in a box.

We also added a new button that would trigger the `resetAccountName` method when clicked.

If we now change the value of the account name input and click the reset button, we will see the value be reset to `bob123`:

![reset value for accountName](assets/images/ch6/template_form_demo_12.jpg)

Great! Now you have learned the basics of template-driven forms in Angular!

The code of this demo is available on [Stackblitz](https://stackblitz.com/edit/ng4eb-template-driven-form-demo).
