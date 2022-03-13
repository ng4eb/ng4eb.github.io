import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleComponent} from './article.component';
import {Ch1P1Component} from './ch1-p1/ch1-p1.component';
import {
	NotFoundComponent
} from '../shared/not-found/not-found.component';
import {Ch1P2Component} from './ch1-p2/ch1-p2.component';
import {Ch2P1Component} from './ch2-p1/ch2-p1.component';
import {Ch2P2Component} from './ch2-p2/ch2-p2.component';
import {Ch2P3Component} from './ch2-p3/ch2-p3.component';
import {Ch3P1Component} from './ch3-p1/ch3-p1.component';
import {Ch3P2Component} from './ch3-p2/ch3-p2.component';
import {Ch3P3Component} from './ch3-p3/ch3-p3.component';
import {Ch3P4Component} from './ch3-p4/ch3-p4.component';
import {Ch4P1Component} from './ch4-p1/ch4-p1.component';

const routes: Routes = [
	{
		path: '',
		component: ArticleComponent,
		children: [
			{
				path: 'ch1/p1',
				component: Ch1P1Component
			},
			{
				path: 'ch1/p2',
				component: Ch1P2Component
			},
			{
				path: 'ch2/p1',
				component: Ch2P1Component
			},
			{
				path: 'ch2/p2',
				component: Ch2P2Component
			},
			{
				path: 'ch2/p3',
				component: Ch2P3Component
			},
			{
				path: 'ch3/p1',
				component: Ch3P1Component
			},
			{
				path: 'ch3/p2',
				component: Ch3P2Component
			},
			{
				path: 'ch3/p3',
				component: Ch3P3Component
			},
			{
				path: 'ch3/p4',
				component: Ch3P4Component
			},
			{
				path: 'ch4/p1',
				component: Ch4P1Component
			},
			{
				path: '**',
				redirectTo: 'ch1/p1'
			}
		]
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ArticleRoutingModule {
}
