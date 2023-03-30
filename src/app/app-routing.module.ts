import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
	NotFoundComponent
} from './shared/not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
	},
	{
		path: 'faq',
		loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule)
	},
	{
		path: 'toc',
		loadChildren: () => import('./toc/toc.module').then(m => m.TocModule)
	},
	{
		path: 'book',
		loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
	},
	{
		path: 'search',
		pathMatch: 'full',
		loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
	},
	{
		path: '**',
		component: NotFoundComponent
	},
	{
		path: '404',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		initialNavigation: 'enabledBlocking',
		anchorScrolling: 'enabled'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
