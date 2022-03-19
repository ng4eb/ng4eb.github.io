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
} from '../resolver/chapter.resolver';

const chapters = [
	'ch1p1', 'ch1p2',
	'ch2p1', 'ch2p2', 'ch2p3',
	'ch3p1', 'ch3p2', 'ch3p3', 'ch3p4',
	'ch4p1', 'ch4p2',
	'ch5p1', 'ch5p2',
	'ch6p1'
]
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
