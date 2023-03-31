## How Reactive Forms Work

A reactive form is built using TypeScript to create the form logic, making it model-driven in terms of both **view** (template) and **model** (component class). While template-driven forms are easier to set up for simple forms like login forms, reactive forms are more efficient for complex forms like surveys, as they provide many APIs to handle different scenarios and write custom logic.

![Reactive Form Concept](assets/images/ch6/reactive_form_concept.jpg)

To build a reactive form, we can use `FormControl` and `FormGroup`, or `FormBuilder`. In this demo, we will start by using `FormControl` and `FormGroup`.

## Using FormControl & FormGroup

Let's create a new project called `reactive-form-demo` and build a survey form with two sections: "Personal Information" and "Company Information". The "Personal Information" section will ask for the user's name, sex, date of birth, and address, while the "Company Information" section will ask for the company name, role, and monthly salary.

```
ng new reactive-form-demo --routing=false --style=css
```

To create this form, we can use `FormControl` to create a form control for each input field and `FormGroup` to group related fields together.

![Survey Structure Overview](assets/images/ch6/reactive_form_demo_overview.jpg)

### Project Setup

Let's create a new component named `survey`:

```
ng g c survey
```

Then, let's display the `survey` component inside `app.component.html`:

```html
<app-survey></app-survey>
```

Let's start by editing the `survey.component.ts` file to construct the logic of our reactive form. To get started with creating a reactive form, we need to import `ReactiveFormsModule` in the `app.module.ts` file.

`ReactiveFormsModule` is a built-in module that provides a set of APIs for building reactive forms such as `FormGroup`, `FormControl`, and `FormBuilder`.

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {AppComponent} from './app.component';
import {SurveyComponent} from './survey/survey.component';

@NgModule({
 declarations: [
   AppComponent,
   SurveyComponent
 ],
 imports: [
   BrowserModule, ReactiveFormsModule
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule {
}
```

In `survey.component.ts`, we will define two form groups for the sections, the "Personal Information" and "Company Information" sections. Let's call them `personalInfo` and `companyInfo` respectively. These two form groups can be grouped together into a bigger form group to represent the entire form.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
 selector: 'app-survey',
 templateUrl: './survey.component.html',
 styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  form = new FormGroup({
    personalInfo: new FormGroup({}),
    companyInfo: new FormGroup({})
  })
  constructor() { }

  ngOnInit() {
  }

}
```

Inside `personalInfo` and `companyInfo`, we use `FormControl` to control the individual input fields. Let's start with `personalInfo`. We can have `FormControl` for `name`,  `sex`, `dateOfBirth`  and `email`. For `address`, we can use another `FormGroup` to group three `FormControl` for`street`, `city` and `country` respectively:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
 selector: 'app-survey',
 templateUrl: './survey.component.html',
 styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  form = new FormGroup({
    personalInfo: new FormGroup({
      name: new FormControl(),
      sex: new FormControl(),
      dateOfBirth: new FormControl(),
      email: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
        country: new FormControl()
      })
    }),
    companyInfo: new FormGroup({})
  })
  constructor() { }

  ngOnInit() {
  }

}
```

Note that reactive forms are not strongly typed prior to Angular 14 (see [this Github issue](https://github.com/angular/angular/issues/13721)). That means we are unable to write generic types, e.g.,  `name: new FormControl<string>()`, to reinforce strong-typing in TypeScript if we use an older version of Angular.

Let's also fill in `companyInfo`. We should add `companyName`, `role` and `monthlySalary`:

```typescript
export class SurveyComponent implements OnInit {
  form = new FormGroup({
    personalInfo: new FormGroup({
      name: new FormControl(),
      sex: new FormControl(),
      dateOfBirth: new FormControl(),
      email: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
        country: new FormControl()
      })
    }),
    companyInfo: new FormGroup({
      companyName: new FormControl(),
      role: new FormControl(),
      monthlySalary: new FormControl()
    })
  })
  constructor() { }

  ngOnInit() {
  }

}
```

Let's also add an `onSubmit` method which will simply console log the `form` object for now:

```typescript
onSubmit() {
  console.log(this.form);
}
```

Finally, let's construct the form in the template `survey.component.html`:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <h1>A Big Survey!</h1>
    <fieldset formGroupName="personalInfo">
       <h2>Step 1: Personal Information</h2>
       <input formControlName="name" placeholder="Name" />
       <div>
         <label>
           <input type="radio" value="male" formControlName="sex" />
           <span>Male</span>
        </label>
        <label>
          <input type="radio" value="female" formControlName="sex" />
          <span>Female</span>
        </label>
        <label>
          <input type="radio" value="others" formControlName="sex" />
          <span>Others</span>
        </label>
      </div>
      <input formControlName="email" />
      <input formControlName="dateOfBirth" type="date" />
      <fieldset formGroupName="address">
        <h3>Address</h3>
        <input formControlName="street" placeholder="Street" />
        <input formControlName="city" placeholder="City" />
        <input formControlName="country" placeholder="Country" />
      </fieldset>
    </fieldset>
    <fieldset formGroupName="companyInfo">
      <h2>Step 2: Company Information</h2>
      <input formControlName="companyName" placeholder="Company Name" />
      <input formControlName="role" placeholder="Role" />
      <input formControlName="monthlySalary" placeholder="Monthly Salary" />
    </fieldset>
  <button>Submit</button>
</form>
```

As shown above, the template can access the `form` object via the `formGroupName` and `formControlName` directives. These directives come from the `ReactiveFormsModule`.

Let's also give the form some basic styling in `survey.component.css`:

```css
form {
  max-width: 800px;
  margin: 0 auto;
}

fieldset {
  display: flex;
  flex-direction: column;
  padding: 0;
  border: none;
}

fieldset > * {
  margin-bottom: 12px;
}

input {
  height: 20px;
}

input[type = date] {
  max-width: 300px;
}

label {
  display: inline-flex;
  align-items: center;
}
```

Now, our page should look like this:

![Reactive form demo 1](assets/images/ch6/reactive_form_demo_1.jpg)

### Adding Default Values & Options

Providing default values to form fields makes them easier to complete. For example, we can set the default value for `sex` to be `male`, and for `dateOfBirth`, `1990-12-31`. Doing so in a reactive form is simple. We can add the default values directly in the TypeScript code for the form.

```typescript
form = new FormGroup({
  personalInfo: new FormGroup({
    name: new FormControl(),
    sex: new FormControl('male'),
    dateOfBirth: new FormControl('1990-12-31'),
    email: new FormControl(),
    address: new FormGroup({
      street: new FormControl(),
      city: new FormControl(),
      country: new FormControl()
    })
  }),
  companyInfo: new FormGroup({
    companyName: new FormControl(),
    role: new FormControl(),
    monthlySalary: new FormControl()
  })
})
```

Now the two fields of our form have default values:

![Reactive form demo 2](assets/images/ch6/reactive_form_demo_2.jpg)

Next, let's provide a list of options for the `country` field. Suppose our survey participants come from the below 20 countries:

```typescript
[
	'Australia', 'Austria', 'Belgium', 'Brazil',
	'Canada', 'China', 'Egypt', 'Finland',
	'France', 'Germany', 'Greece', 'India',
	'Indonesia', 'Italy', 'Japan', 'Korea'
]
```

First, we can add this array of country names to the component class and use it to dynamically generate option tags in the template. To do this, we replace the original `input` tag for the `country` field with a `select` tag and use `ngFor` to iterate over the array and generate `option` tags.

Here's how we can add the array to `survey.component.ts`:

```typescript
export class SurveyComponent implements OnInit {
  form = new FormGroup({
    personalInfo: new FormGroup({
      name: new FormControl(),
      sex: new FormControl('male'),
      dateOfBirth: new FormControl('1990-12-31'),
      email: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
        country: new FormControl()
      })
    }),
    companyInfo: new FormGroup({
      companyName: new FormControl(),
      role: new FormControl(),
       monthlySalary: new FormControl()
    })
  })

  countryList = [
    'Australia', 'Austria', 'Belgium', 'Brazil',
    'Canada', 'China', 'Egypt', 'Finland',
    'France', 'Germany', 'Greece', 'India',
    'Indonesia', 'Italy', 'Japan', 'Korea'
  ]

  constructor() { }

  onSubmit() {
    console.log(this.form);
 }

  ngOnInit() {
  }

}
```

Next, modify `survey.component.html`:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <h1>A Big Survey!</h1>
  <fieldset formGroupName="personalInfo">
    <h2>Step 1: Personal Information</h2>
    <input formControlName="name" placeholder="Name" />
    <div>
      <label>
        <input type="radio" value="male" formControlName="sex" />
        <span>Male</span>
      </label>
      <label>
        <input type="radio" value="female" formControlName="sex" />
        <span>Female</span>
      </label>
      <label>
        <input type="radio" value="others" formControlName="sex" />
        <span>Others</span>
      </label>
    </div>
    <input formControlName="email" />
    <input formControlName="dateOfBirth" type="date" />
    <fieldset formGroupName="address">
      <h3>Address</h3>
      <input formControlName="street" placeholder="Street" />
      <input formControlName="city" placeholder="City" />
      <label for="country">Country</label>
        <select id="country" formControlName="country">
          <option *ngFor="let country of countryList" [value]="country">{{country}}</option>
        </select>
    </fieldset>
  </fieldset>
  <fieldset formGroupName="companyInfo">
    <h2>Step 2: Company Information</h2>
    <input formControlName="companyName" placeholder="Company Name" />
    <input formControlName="role" placeholder="Role" />
    <input formControlName="monthlySalary" placeholder="Monthly Salary" />
  </fieldset>
  <button>Submit</button>
</form>
```

Now we should be able to select a country from a dropdown:

![Reactive form demo 3](assets/images/ch6/reactive_form_demo_3.jpg)

### Adding Validation
After setting up the basics of the form, the next step is to add validation rules to ensure data quality. In a reactive form, validation rules are defined in TypeScript and added to the `FormControl` objects as the second argument. The constructor signature for `FormControl` includes `validatorOrOpts`, which is the parameter that accepts validation rules:

```typescript
constructor(formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null);
```

Here's how we can add validation rules to the form in `survey.component.ts`. We'll start with using the built-in validation rules provided by the `Validators` object from the `@angular/forms` library:

```typescript
form = new FormGroup({
  personalInfo: new FormGroup({
    name: new FormControl(
       '',
       [Validators.required, Validators.minLength(2)]
    ),
    sex: new FormControl('male'),
    dateOfBirth: new FormControl('1990-12-31'),
    email: new FormControl(
       '',
       [Validators.required, Validators.email]
    ),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    })
  }),
  companyInfo: new FormGroup({
    companyName: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    monthlySalary: new FormControl('', Validators.required)
  })
})
```

We use the `Validators` object to add rules such as `required`, `email`, and `minLength`. These rules are passed as an array in the second argument of the `FormControl` constructor.

We can also create custom validation rules by writing our own validator function, which should also be passed as the second argument of the `FormControl` constructor. For example, we can validate that a survey participant is at least 18 years old by comparing their date of birth to the current date.

Here's an example of how to create a custom validator function and apply it to the `dateOfBirth` field:

```typescript
checkAtLeastAge(age = 18): ValidatorFn {
  return (control: AbstractControl) => {
    const currDate = new Date();
    const [year, month, day] = control.value.split('-');
    /* find how many years have passed - 1 */
    let yearsOld = currDate.getFullYear() - parseInt(year) - 1;
    /* take birth month into account */
    const isBirthMonthPassed =
      parseInt(month) < currDate.getMonth() + 1 ||
      (parseInt(month) == currDate.getMonth() + 1 &&
        parseInt(day) <= currDate.getDate());
      isBirthMonthPassed && yearsOld++;
    /* if below age, return an error object */
    return yearsOld < age ? { ageRequirement: `Age limit is \${age}. You are \${yearsOld} years old.` } : null;
 }
}
```

We typically write the custom validator as a factory of `ValidatorFn` (from the `@angular/forms` package). That's because it allows us to pass in custom parameters such as the `age` variable in our case.

The `ValidatorFn` is a function that takes in an argument of `AbstractControl`  (from the `@angular/forms` package), from which we get the field value. We had logic to check if the date value from the field is below the `age` specified (i.e., 18). If so, we return an error object, in which a key is the error name, and its value is the error message.

If there is no error, we return `null`.

To use the validator, we add it as the second argument in the `dateOfBirth` field:

```typescript
form = new FormGroup({
  personalInfo: new FormGroup({
    name: new FormControl(
       '',
      [Validators.required, Validators.minLength(2)]
    ),
    sex: new FormControl('male'),
    dateOfBirth: new FormControl('1990-12-31', this.checkAtLeastAge()),
    email: new FormControl(
      '',
      [Validators.required, Validators.email]
    ),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    })
  }),
  companyInfo: new FormGroup({
    companyName: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    monthlySalary: new FormControl('', Validators.required)
  })
})
```

Now, submitting the form with an age below 18 will result in an error message in the `form` object:

![Reactive form demo 4](assets/images/ch6/reactive_form_demo_4.jpg)

### Error Handling

At this point, we should add some error handling to the form.

Let's add a thick pink border to the invalid fields using the following styles in `survey.component.css`:

```css
form.ng-submitted input.ng-invalid,
form.ng-submitted select.ng-invalid,
input.ng-touched.ng-invalid.ng-dirty {
   border: 4px solid deeppink;
}
```

This border styling will be triggered when the user has edited the input with invalid values and after the form is submitted.

Now, if we submit the form with the default empty values, we should see a bunch of pink borders:

![Reactive form demo 5](assets/images/ch6/reactive_form_demo_5.jpg)

Next, let's focus on the `dateOfBirth` field. Suppose we want to display an error message below it, we can get the error message from the `form` object, and then display it in the template:

```html
<input formControlName="dateOfBirth" type="date" />
<span class="err-msg">
 {{form.get('personalInfo')?.get('dateOfBirth')?.getError('ageRequirement')}}
</span>
```

To get the error objects, we will use the getter methods `get` and `getError` from both the `FormGroup` and `FormControl` objects. In this example, we retrieved `personalInfo` from `form`, and `dateOfBirth` from `personalInfo`. Additionally, we used `getError` to get the error message with the key `ageRequirement`.

As a final touch, let's add some styling to the `err-msg` class:

```css
.err-msg {
  color: deeppink;
  font-size: 12px;
}
```

Now, the form will show the error message below the `dateOfBirth` field:

![Reactive form demo 6](assets/images/ch6/reactive_form_demo_6.jpg)

Great! Now you have learned the basics of building reactive forms with `FormGroup` and `FormControl`. Check out the demo on [Stackblitz](https://stackblitz.com/edit/ng4eb-reactive-form-demo).

### Type-Safe Reactive Form From Angular 14

The above demo also works in Angular 14 and 15. Here's the [Stackblitz demo](https://stackblitz.com/edit/ng4eb-reactive-form-demo-jcp7rr) which is the same codebase updated to Angular 15.

Originally, our reactive form demo in Angular 13 is not type-safe as it doesn't support generics:

![Angular 13 not type safe](assets/images/ch6/ng-13-not-type-safe.jpg)

Now, the reactive form demo in Angular 14 and 15 is type-safe as it supports generics. For simple forms, the generics are automatically inferred. 

![Angular 15 type safe](assets/images/ch6/ng-15-type-safe.jpg)

For more complex forms, we may need to specify the type of the form model.

## Using FormBuilder

Angular provides an even easier way to build a reactive form with the `FormBuilder` API. The `FormBuilder` provides syntactic sugar that shortens creating instances of a `FormControl`, `FormGroup`, or `FormArray`.

What is `FormBuilder`? Here's the definition from [the documentation](https://angular.io/api/forms/FormBuilder#description):

> The `FormBuilder` provides syntactic sugar that shortens creating instances of a `FormControl`, `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to build complex forms.

In this section, we will refactor the [previous demo](https://stackblitz.com/edit/ng4eb-reactive-form-demo)   to use `FormBuilder` instead of `FormControl` and `FormGroup`.

To use the `FormBuilder` API, we need to import the `FormBuilder` class from the `@angular/forms` package and inject it into the component using dependency injection. Here is the updated `survey.component.ts` code:

```typescript
import {Component, OnInit} from '@angular/core';
import {
 AbstractControl,
 FormBuilder,
 FormControl,
 FormGroup,
 ValidatorFn,
 Validators
} from '@angular/forms';

@Component({
 selector: 'app-survey',
 templateUrl: './survey.component.html',
 styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
   form = new FormGroup({...})

   countryList = [...]

   constructor(private fb: FormBuilder) {
   }

   onSubmit() {...}

   checkAtLeastAge(age = 18): ValidatorFn {...}

   ngOnInit() {
   }

}
```

We injected the `FormBuilder` class into a private local variable named `fb`. Let's use `fb` instead of `FormGroup` and `FormControl` inside the `form` object:

```typescript
form = this.fb.group({
  personalInfo: this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    sex: ['male'],
    dateOfBirth: ['1990-12-31', this.checkAtLeastAge()],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    })
  }),
  companyInfo: this.fb.group({
    companyName: ['', Validators.required],
    role: ['', Validators.required],
    monthlySalary: ['', Validators.required]
  })
})
```

Note that we replaced `FormGroup` with `this.fb.group` and removed `FormControl` completely. This makes our code more readable and less verbose.

Congratulations! You have learned how to use `FormBuilder` instead of `FormGroup` and `FormControl` for building a reactive form! You can also find the code for this section on [Stackblitz](https://stackblitz.com/edit/ng4eb-reactive-form-demo-formbuilder).
