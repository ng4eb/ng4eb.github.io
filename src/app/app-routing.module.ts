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
		path: 'sitemap',
		pathMatch: 'full',
		loadChildren: () => import('./sitemap/sitemap.module').then(m => m.SitemapModule)
	},
	{
		path: 'roadmap',
		pathMatch: 'full',
		loadChildren: () => import('./roadmap/roadmap.module').then(m => m.RoadmapModule)
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
