import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FaqRoutingModule} from './faq-routing.module';
import {FaqComponent} from './faq.component';
import {
	FontAwesomeModule
} from '@fortawesome/angular-fontawesome';


@NgModule({
	declarations: [
		FaqComponent
	],
	imports: [
		CommonModule,
		FaqRoutingModule,
		FontAwesomeModule
	]
})
export class FaqModule {
}
