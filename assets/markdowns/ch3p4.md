## How Pipes Work
A **pipe** is a special function used in the template that outputs a transformed input value. Below is a self-explanatory example of the `uppercase` pipe:

```html
<p>{{'hello world!' | uppercase}}</p>
```

This is the same as writing:

```html
<p>{{'hello world!'.toUpperCase()}}</p>
```

So, why do we prefer using pipes instead of regular functions in the template? One main benefit of using pipes is readability. f we need to transform a value with a function like `transformXtoY`, using another pipe allows us to chain them into a nice format:

```html
<p>{{'hello world!' | uppercase | transformXToY}}</p>
```

Another benefit is clearer separation of concerns. Extracting the transformation logic from a component to a pipe helps keep the component code clean and light.

Finally, a pipe is more performant than using a method in the template. That's because a pipe will only rerun when the input value has changed. In contrast, a method in the template runs on every change detection, regardless of whether the input value has actually changed.

## Using the Percent Pipe

We will explore the built-in percent pipe in this section. Once we have learned how to use a pipe, we can look up other [built-in pipes](https://angular.io/guide/pipes) if we need them.

The `percent` pipe transforms a number or string (e.g. `0.35`) to a percentage string (e.g. `35%`). Its syntax is shown below:

```html
{{ value | percent [ : digitsInfo [ : locale]] }}
```

In the above, `|` is the pipe symbol, `percent` is the pipe, and `[ : digitsInfo]` and `[ : locale]` are both options that we can pass to the pipe.

Let's create a new project named `percent-pipe-demo`:

```
ng new percent-pipe-demo --routing=false --style=css
```

Let's apply the `percent` pipe inside `app.component.html`:

```html
<h1>percent pipe</h1>
<p>{{0.35 | percent}}</p>
```

We will see `35%` on the webpage:

![35% percent pipe](/assets/images/ch3/percent_pipe_1.jpg)

Now, the `digitsInfo` option for the `percent` pipe has the below format:

```html
{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
```

For `percent`, the default value of `minIntegerDigits` is 1, and both `minFractionDigits` and `maxFractionDigits` are default to 0.

As `minFractionDigits` and `maxFractionDigits` are both 0, we will not see any decimal point in the output. So, if we want to display one digit after the decimal point in the output, we can specify the `digitsInfo` option as below:

```html
<h1>percent pipe</h1>
<p>{{0.35 | percent:'1.1-1'}}</p>
```

![35.0% percent pipe](/assets/images/ch3/percent_pipe_2.jpg)

Let's also try to provide a locale option. For example, if we want to use the French way to express the percentage, we can provide the  `fr` option:

```html
<h1>percent pipe</h1>
<p>{{0.35 | percent:'1.1-1':'fr'}}</p>
```

If we save and go to the page, we will not see the percentage. Instead, we will see an error in the console telling us that the locale data for `fr` is missing:

![missing data for locale fr](/assets/images/ch3/missing_fr_locale.jpg)

To fix this, we need to add the below three lines inside `app.module.ts`:

```typescript
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
```

The above provides the locale data for the locale `fr`. Now, we should see the French expression of the percentage:

![35,0% percent pipe](/assets/images/ch3/percent_pipe_3.jpg)

Great! You now have learned how to use a built-in pipe.

You can check out the code for this demo on [Stackblitz](https://stackblitz.com/edit/ng4eb-percent-pipe-demo).

## Creating a Custom Pipe

### Project Setup

In this section, we will create a custom pipe to convert numbers to English words. Let's start by creating a new project named `custom-pipe-demo`:

```bash
ng new custom-pipe-demo --routing=false --style=css
```

Next, we will create a pipe named `num-to-eng` using the below command:

```bash
ng generate pipe num-to-eng --skip-tests
```

The above creates a single file called `num-to-eng.pipe.ts` which will contain our custom pipe code:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'numToEng'
})
export class NumToEngPipe implements PipeTransform {

 transform(value: unknown, ...args: unknown[]): unknown {
 return null;
 }
}
```

As we can see, Angular uses the `@Pipe` decorator to transform a class into a pipe. We must specify the `name` property, which has to be in **lowerCamelCase**. We can use `numToEng`, but not `num-to-eng`.

The pipe class implements the `PipeTransform` interface. Here's the source code of the interface:

```typescript
export declare interface PipeTransform {
 transform(value: any, ...args: any[]): any;
}
```

The `PipeTransform` interface enforces a class to implement a method named `transform`, which takes in an input value of `any` type, along with other optional arguments. This method corresponds to the pipe syntax which we have seen before:

```html
{{ value | pipe[:...args] }}
```

The `transform` method is where the transformation occurs.

### Adding the Transformation Logic

Let's add the transformation logic to `num-to-eng.pipe.ts`:

```typescript
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
   name: 'numToEng'
})
export class NumToEngPipe implements PipeTransform {
  private readonly _ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  private readonly _tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  private readonly _teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

  transform(value: number, ...args: unknown[]): string {
    return this._convert(value);
  }

  private _convert_millions(num: number): string {
    if (num >= 1000000) {
      return this._convert_millions(Math.floor(num / 1000000)) + " million " + this._convert_thousands(num % 1000000);
    } else {
       return this._convert_thousands(num);
   }
 }

   private _convert_thousands(num: number): string {
     if (num >= 1000) {
       return this._convert_hundreds(Math.floor(num / 1000)) + " thousand " + this._convert_hundreds(num % 1000);
     } else {
       return this._convert_hundreds(num);
     }
   }

   private _convert_hundreds(num: number): string {
     if (num > 99) {
       return this._ones[Math.floor(num / 100)] + " hundred " + this._convert_tens(num % 100);
     } else {
       return this._convert_tens(num);
     }
   }

   private _convert_tens(num: number): string {
     if (num < 10) return this._ones[num];
     else if (num >= 10 && num < 20) return this._teens[num - 10];
     else {
       return this._tens[Math.floor(num / 10)] + " " + this._ones[num % 10];
     }
   }

   private _convert(num: number): string {
     if (num === 0) return "zero";
     else return this._convert_millions(num);
   }

}
```

We added three private arrays containing English number words.

We also added the conversion algorithm, which is divided into several private methods. We will not dive into the details of the algorithm. However, it is recommended that you pause and examine the code yourself.

Besides, we altered the `transform` method. We specified the `number` type for the input `value` argument, and that the method will return a string. Additionally, inside the `transform` method, we called the `_convert` method on `value`, which returns a string of English numerals.

Now, we can use this pipe. Let's modify `app.component.html`:

```html
<h1>num-to-eng pipe</h1>
<p>{{9999999 | numToEng }}</p>
```

We will see the number displayed as English numerals on the page:

![custom English to number pipe](/assets/images/ch3/custom_pipe.jpg)

What if we change the input value from a `number`  to `string`? In that case, the application will not compile because it does not match the type specified in the pipe:

![custom pipe wrong type error](/assets/images/ch3/pipe_wrong_type_error.jpg)

Congratulations! Now you have learned how to implement a custom pipe in Angular!

You can check out the code of this demo on [Stackblitz](https://stackblitz.com/edit/ng4eb-custom-pipe-demo).
