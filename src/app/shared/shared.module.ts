import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutofocusDirective} from './autofocus.directive';
import {
	NotFoundComponent
} from './not-found/not-found.component';
import {RouterModule} from '@angular/router';
import {WithoutHashPipe} from './without-hash.pipe';
import {
	ScrollTrackerDirective
} from './scroll-tracker.directive';


@NgModule({
	declarations: [
		AutofocusDirective,
		NotFoundComponent,
		WithoutHashPipe,
		ScrollTrackerDirective
	],
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [
		AutofocusDirective,
		NotFoundComponent,
		WithoutHashPipe,
		ScrollTrackerDirective
	]
})
export class SharedModule {
}
