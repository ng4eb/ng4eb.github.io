import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FaqComponent} from './faq.component';

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
		path: 'how-to-support',
		pathMatch: 'full',
		component: FaqComponent
	},
	{
		path: 'contribution',
		pathMatch: 'full',
		component: FaqComponent
	},
	{path: '**', redirectTo: '/'}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FaqRoutingModule {
}
