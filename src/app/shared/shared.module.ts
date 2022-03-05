import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutofocusDirective} from './autofocus.directive';
import {
	NotFoundComponent
} from './not-found/not-found.component';
import {RouterModule} from '@angular/router';


@NgModule({
	declarations: [
		AutofocusDirective,
		NotFoundComponent
	],
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [
		AutofocusDirective,
		NotFoundComponent
	]
})
export class SharedModule {
}
