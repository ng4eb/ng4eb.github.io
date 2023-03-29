import {NgModule} from '@angular/core';
import {
	RouterModule,
	Routes,
	UrlSegment
} from '@angular/router';
import {ArticleComponent} from './article.component';
import {
	NotFoundComponent
} from '../shared/not-found/not-found.component';
import {
	ChapterComponent
} from './chapter.component';
import {
	ChapterResolver
} from './chapter.resolver';
import {chapters} from "./chapters";

const chapterRouteMatcher = (url: UrlSegment[]) => {
	if (url.length === 2) {
		const path = url[0].path + url[1].path;
		if (chapters.includes(path)) {
			return {consumed: url};
		}
	}
	return null;
}

const routes: Routes = [
	{
		path: '',
		component: ArticleComponent,
		children: [
			{
				matcher: chapterRouteMatcher,
				component: ChapterComponent,
				resolve: {chapter: ChapterResolver}
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
