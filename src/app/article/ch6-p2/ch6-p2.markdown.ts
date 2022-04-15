export const ch6P2Markdown = `
## How reactive forms work
A *reactive* form uses TypeScript for building the form logic. In terms of **view** (template) and **model** (component class), we say a reactive form is *model-driven*.

![Reactive Form Concept](assets/images/ch6/reactive_form_concept.jpg)

When should we use reactive forms over template-driven forms?  For simple forms such as a login form, template-driven forms are easier to set up. However, for complex forms like a survey, we should consider building reactive forms as they provide us with many efficient APIs to handle different scenarios and write custom logic.

As we will see, we can build complex reactive forms efficiently using \`FormControl\` with \`FormGroup\`, or \`FormBuilder\`.

## Using FormControl & FormGroup

We will start with using \`FormControl\` and \`FormGroup\`. Let's create a new project named \`reactive-form-demo\`:

\`\`\`
ng new reactive-form-demo --routing=false --style=css
\`\`\`

We are going to build a survey that contains two sections. The first section is "personal information" where the user will be asked to provider their name, sex, date of birth, and address. The second section is "company information". They will be asked to give the company name, role, and monthly salary:

![Survey Structure Overview](assets/images/ch6/reactive_form_demo_overview.jpg)

## Using FormControl & FormBuilder

### Project Setup

Let's create a new component named \`survey\`:

\`\`\`
ng g c survey
\`\`\`

Then, let's display the \`survey\` component inside \`app.component.html\`:

\`\`\`html
<app-survey></app-survey>
\`\`\`

We will start by editing the \`survey.component.ts\` file since we will construct the logic of our reactive form in TypeScript. Before we do that, we need to import two built-in modules from Angular - one is \`FormsModule\`, and the other is \`ReactiveFormsModule\` - inside \`app.module.ts\`.

\`\`\`typescript
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
   BrowserModule, FormsModule, ReactiveFormsModule  
 ],  
 providers: [],  
 bootstrap: [AppComponent]  
})  
export class AppModule {  
}
\`\`\`

In \`survey.component.ts\`, we will define two form groups for the two sections, i.e., for the "Personal Information" and "Company Information" sections. We can call them \`personalInfo\` and \`companyInfo\` respectively. Then, these two form groups can be grouped together into one bigger form group which will represent the entire form.

\`\`\`typescript
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
  
  ngOnInit(): void {  
  }  
  
}
\`\`\`

Inside \`personalInfo\` and \`companyInfo\`, we will use \`FormControl\` for controlling the individual input fields. Let's start with \`personalInfo\`. We will have \`FormControl\` for \`name\`,  \`sex\`, \`dateOfBirth\`  and \`email\`. For the \`address\`, we can use another \`FormGroup\` to contain three \`FormControl\` under the category: \`street\`, \`city\` and \`country\`:

\`\`\`typescript
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
  
  ngOnInit(): void {  
  }  
  
}
\`\`\`

Note that reactive forms are not strongly typed in Angular 13 (see [this Github issue](https://github.com/angular/angular/issues/13721)). That means we are unable to write generic types, e.g.,  \`name: new FormControl<string>()\`, to reinforce strong-typing in TypeScript.

Next, let's fill in \`companyInfo\`. We need to add \`companyName\`, \`role\` and \`monthlySalary\`:

\`\`\`typescript
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
  
  ngOnInit(): void {  
  }  
  
}
\`\`\`

Let's also add an \`onSubmit\` method which will simply console log the \`form\` object for now:

\`\`\`typescript
onSubmit() {  
  console.log(this.form);  
}
\`\`\`

Finally, let's construct the form in the template \`survey.component.html\`:

\`\`\`html
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
\`\`\`

As shown above, the template can access the \`form\` object via the \`formGroupName\` and \`formControlName\` directives. These directives come from the \`ReactiveFormsModule\` we imported in \`app.module.ts\`.

Let's also give the form some basic styling in \`survey.component.css\`:

\`\`\`css
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
\`\`\`

Now, our page should look like this:

![Reactive form demo 1](assets/images/ch6/reactive_form_demo_1.jpg)

### Adding Default Values & Options

Usually, we want to provide some default values to make a form easier to complete. For example, we can set the default value for \`sex\` to be \`male\`, and for \`dateOfBirth\`, \`1990-12-31\`. Doing so in a reactive form is a breeze. Simply add the default values in TypeScript:

\`\`\`typescript
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
\`\`\`

Now we should see the two fields of our form have default values:

![Reactive form demo 2](assets/images/ch6/reactive_form_demo_2.jpg)

Next, let's provide a list of options for the \`country\` field. Suppose our survey participants come from the below 20 countries:

\`\`\`typescript
[
\t'Australia', 'Austria', 'Belgium', 'Brazil',
\t'Canada', 'China', 'Egypt', 'Finland',
\t'France', 'Germany', 'Greece', 'India',
\t'Indonesia', 'Italy', 'Japan', 'Korea'
]
\`\`\`

First, we should add this array to the component class. After that, we will replace the original \`input\` tag with a \`select\` tag in the template. We will then use \`ngFor\` to produce \`option\` tags inside the \`select\` tag based on the array.

Let's now add the array to \`survey.component.ts\`:

\`\`\`typescript
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
  
  ngOnInit(): void {  
  }  
  
}
\`\`\`

Next, modify \`survey.component.html\`:

\`\`\`html
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
\`\`\`

Now we should be able to select a country from a dropdown:

![Reactive form demo 3](assets/images/ch6/reactive_form_demo_3.jpg)

### Adding Validation
Now that the basis of our form is ready, we should add some validation rules. In a reactive form, we put those rules in TypeScript. Specifically, we will put them as the second argument for \`FormControl\`.  This is reflected in the constructor's signature of \`FormControl\`:

\`\`\`typescript
constructor(formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null);
\`\`\`

As shown above, the second argument \`validatorOrOpts\` is the place where we can provide validation rules.

Let's add some rules to \`survey.component.ts\`. We will start with the built-in rules first:

\`\`\`typescript
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
\`\`\`

We made use of the \`Validators\` object, which comes from the \`@angular/forms\` library. This object provides a few validation rules as its properties, such as \`required\`, \`email\`, \`minLength\`, etc.

We pass those rules as the second argument for the \`FormControl\` objects. If there is more than one rule for a single \`FormControl\`, we would group them inside an array as we did above.

Let's also add some custom validation. For a reactive form, all we need to do is write our own validator function and use it as the second argument as we did for the built-in rules.

For example, suppose we want our survey participants to be at least 18 years old. We can write a validator function to check whether their date of birth is at least 18 years from the current date. Let's write that function just below the \`onSubmit\` method in \`survey.component.ts\`:

\`\`\`typescript
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
    return yearsOld < age ? { ageRequirement: \`Age limit is \\\${age}. You are \\\${yearsOld} years old.\` } : null;
 }  
}
\`\`\`

We typically write the custom validator as a factory of \`ValidatorFn\` (from the \`@angular/forms\` package). That's because it allows us to pass in custom parameters such as the \`age\` variable in our case.

The \`ValidatorFn\` is a function that takes in an argument of \`AbstractControl\`  (from the \`@angular/forms\` package), from which we can get the field value. We had some logic to check if the date value from the field is below the \`age\` we specified (i.e., 18). If so, we would return an error object, where the key is the error name, and the value is the message.

Otherwise, we would return \`null\`, meaning no error.

To use the validator, simply add it as the second argument for the \`dateOfBirth\` field:

\`\`\`typescript
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
\`\`\`

If we submit the form with an age below 18, we could see the error message in the \`form\` object:

![Reactive form demo 4](assets/images/ch6/reactive_form_demo_4.jpg)

### Error Handling

At this point, we can add some error handling to the form.

First, let's add a thick pink border to the invalid fields with the following styles in \`survey.component.css\`:

\`\`\`css
form.ng-submitted input.ng-invalid,  
form.ng-submitted select.ng-invalid,  
input.ng-touched.ng-invalid.ng-dirty {  
   border: 4px solid deeppink;  
}
\`\`\`

This border styling will be triggered when the user has edited the input with invalid values and after the form is submitted.

If we try to submit the form with the default empty values, we should see a bunch of pink borders:

![Reactive form demo 5](assets/images/ch6/reactive_form_demo_5.jpg)

Let's focus on the \`dateOfBirth\` field. Suppose we also want to display an error message below it. What we can do is get the error message from the \`form\` object, and display it in the template:

\`\`\`html
<input formControlName="dateOfBirth" type="date" />  
<span class="err-msg">  
 {{form.get('personalInfo')?.get('dateOfBirth')?.getError('ageRequirement')}}  
</span>
\`\`\`

For getting the error objects, we can use the getter methods \`get\` and \`getError\` available on both the \`FormGroup\` and \`FormControl\` objects. In our case, we retrieved the \`personalInfo\` form group from \`form\`, and then the \`dateOfBirth\` form control from \`personalInfo\`. Lastly, we used \`getError\` to get the error message with the key \`ageRequirement\`.

Let's also add some styling to the \`err-msg\` class:

\`\`\`css
.err-msg {  
  color: deeppink;  
  font-size: 12px;  
}
\`\`\`

Now, if a user's age is below 18, the form will show the error message below the \`dateOfBirth\` field:

![Reactive form demo 6](assets/images/ch6/reactive_form_demo_6.jpg)

Great! Now you have learned the basics of building reactive forms with \`FormGroup\` and \`FormControl\`. You can check out the demo on [Stackblitz](https://stackblitz.com/edit/ng4eb-reactive-form-demo).

## Using FormBuilder

While \`FormGroup\` and \`FormControl\` work, Angular provides us with an even easier way to build a reactive form with the \`FormBuilder\` API. 

What is \`FormBuilder\`? Here's the definition from [the documentation](https://angular.io/api/forms/FormBuilder#description):

> The \`FormBuilder\` provides syntactic sugar that shortens creating instances of a \`FormControl\`, \`FormGroup\`, or \`FormArray\`. It reduces the amount of boilerplate needed to build complex forms.

In this section, let's refactor the [previous demo](https://stackblitz.com/edit/ng4eb-reactive-form-demo)   to use \`FormBuilder\` instead of \`FormControl\` and \`FormGroup\`.

To use the \`FormBuilder\` API, we will need to import the \`FormBuilder\` class from the \`@angular/forms\` package, and inject it into the component using *dependency injection*. Let's edit \`survey.component.ts\`:

\`\`\`typescript
import {Component, OnInit} from '@angular/core';  
import {  
 AbstractControl, FormBuilder,  
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
  
   ngOnInit(): void {  
   }  
  
}
\`\`\`

Above, we injected the \`FormBuilder\` class into a private local variable named \`fb\`. Let's now use \`fb\` instead of \`FormGroup\` and \`FormControl\` inside the \`form\` object:

\`\`\`typescript
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
\`\`\`

Note that this is essentially the same structure as with \`FormGroup\` and \`FormControl\`. The difference is that we replaced \`FormGroup\` with \`this.fb.group\` and removed \`FormControl\` completely. Therefore, \`FormBuilder\` reduces boilerplate code and makes our code more readable.

Congratulations! You have learned how to use \`FormBuilder\` instead of \`FormGroup\` and \`FormControl\` for building a reactive form! You can also find the code for this section on [Stackblitz](https://stackblitz.com/edit/ng4eb-reactive-form-demo-formbuilder).
`
