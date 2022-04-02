import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TocRoutingModule} from './toc-routing.module';
import {TocComponent} from './toc.component';
import {
	FontAwesomeModule
} from '@fortawesome/angular-fontawesome';


@NgModule({
	declarations: [
		TocComponent
	],
	imports: [
		CommonModule,
		TocRoutingModule,
		FontAwesomeModule
	]
})
export class TocModule {
}
