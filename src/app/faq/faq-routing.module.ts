import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FaqComponent} from './faq.component';
import {
	NotFoundComponent
} from '../shared/not-found/not-found.component';

const routes: Routes = [
	{
		path: 'new-to-angular',
		pathMatch: 'full',
		component: FaqComponent
	},
	{
		path: 'why-this-book',
		pathMatch: 'full',
		component: FaqComponent
	},
	{
		path: 'resources',
		pathMatch: 'full',
		component: FaqComponent
	},
	{path: '**', component: NotFoundComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FaqRoutingModule {
}
