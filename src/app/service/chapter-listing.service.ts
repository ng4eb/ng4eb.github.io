import {Injectable} from '@angular/core';
import {
	IsPlatformBrowserService
} from './is-platform-browser.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

export type navigationPart = {
	title: string;
	path: string;
	index: number | null
}

@Injectable({
	providedIn: 'root'
})
export class ChapterListingService {
	private readonly _chapterListing = [
		// chapter 1
		{
			ch: 1,
			title: "Introduction to Angular",
			parts: [
				{
					title: "What is Angular",
					sections: [
						"Angular as a front-end framework"
					]
				},
				{
					title: "Why Angular",
					sections: [
						"Strengths of Angular",
						"Angular compared to other options"
					]
				}
			]
		},
		// chapter 2
		{
			ch: 2,
			title: "CLI & Workspace",
			parts: [
				{
					title: "Installation",
					sections: [
						"Prerequisites",
						"Installation walkthrough"
					]
				},
				{
					title: "CLI Commands",
					sections: [
						"Project creation walkthrough",
						"Useful commands"
					]
				},
				{
					title: "Using angular.json"
				}
			]
		},
		// chapter 3
		{
			ch: 3,
			title: "Components & Modules",
			parts: [
				{
					title: "Using Components & Modules",
					sections: [
						"How components & modules work",
						"Creating a counter component",
						"Nested components & two-way binding"
					]
				},
				{
					title: "Using Directives",
					sections: [
						"How directives work",
						"Using ngIf, ngFor & ngStyle",
						"Creating a random color directive"
					]
				},
				{
					title: "Lifecycles",
					sections: [
						"Overview of lifecycles",
						"Change Detection",
						"Using lifecycle hooks"
					]
				},
				{
					title: "Using Pipes",
					sections: [
						"How pipes work",
						"Using percent pipe",
						"Creating a custom pipe"
					]
				}
			]
		},
		// chapter 4
		{
			ch: 4,
			title: "Routing",
			parts: [
				{
					title: "Using Routing",
					sections: [
						"How routing works",
						"Using routing module",
						"Creating child routes"
					]
				},
				{
					title: "Advanced Routing Techniques",
					sections: [
						"Lazy-loading a module",
						"Implementing an authentication router guard",
						"Using resolvers"
					]
				}
			]
		},
		// chapter 5
		{
			ch: 5,
			title: "Services & RxJS",
			parts: [
				{
					title: "Using Services",
					sections: [
						"How services work",
						"Concept of dependency injection",
						"Creating a counter service"
					]
				},
				{
					title: "RxJS Basics",
					sections: [
						"What is an observable",
						"Creating a counter service using observables"
					]
				}
			]
		},
		// chapter 6
		{
			ch: 6,
			title: "Forms & HTTP Client",
			parts: [
				{
					title: "Using Template-driven Forms",
					sections: [
						"How template-driven forms work",
						"Using ngModel"
					]
				},
				{
					title: "Using Reactive Forms",
					sections: [
						"How reactive forms work",
						"Using FormControl & FormBuilder"
					]
				},
				{
					title: "HTTP Client",
					sections: [
						"Configuring HTTP Client",
						"Fetching random activities from external api"
					]
				}
			]
		}
	]

	private _currentPosition$ = new BehaviorSubject(0);
	private _toExpand$ = new Subject<number>();

	constructor(private _isPlatformBrowserService: IsPlatformBrowserService) {
	}

	getListing() {
		return this._chapterListing;
	}

	getFilteredListing(filterQuery: string) {
		filterQuery = filterQuery.toLowerCase();
		return this._chapterListing.filter(chapter => (
			chapter.title.toLowerCase().includes(filterQuery)
			||
			chapter.parts.some(part => (
				part.title.toLowerCase().includes(filterQuery)
				||
				part.sections?.some(section => (
					section.toLowerCase().includes(filterQuery)
				))
			))
		))
	}

	getNavigation(path: string) {
		const pathArray = path.replace('/book/ch', '')
			.replace('/p', '')
			.split('#')[0]
			.split('')
			.map(s => parseInt(s));
		const currChapter = this._chapterListing[pathArray[0] - 1];
		const currPart = currChapter.parts[pathArray[1] - 1];

		const prev: navigationPart = {
			title: '',
			path: '',
			index: null
		};
		const next: navigationPart = {
			title: '',
			path: '',
			index: null
		};
		// parsing next
		if (currChapter.parts.length > pathArray[1]) {
			next.title = `Ch${pathArray[0]} - P${pathArray[1] + 1} - ${currChapter.parts[pathArray[1]].title}`;
			next.path = `/book/ch${pathArray[0]}/p${pathArray[1] + 1}`
		} else if (this._chapterListing.length > pathArray[0]) {
			next.title = `Ch${pathArray[0] + 1} - P1 - ${this._chapterListing[pathArray[0]].parts[0].title}`;
			next.path = `/book/ch${pathArray[0] + 1}/p1`
			next.index = pathArray[0];
		}
		// parsing prev
		if (1 < pathArray[1]) {
			prev.title = `Ch${pathArray[0]} - P${pathArray[1] - 1} - ${currChapter.parts[pathArray[1] - 2].title}`;
			prev.path = `/book/ch${pathArray[0]}/p${pathArray[1] - 1}`
		} else if (1 < pathArray[0]) {
			const prevChapter = this._chapterListing[pathArray[0] - 2];
			prev.title = `Ch${pathArray[0] - 1} - P${prevChapter.parts.length} - ${this._chapterListing[pathArray[0] - 2].parts[prevChapter.parts.length - 1].title}`;
			prev.path = `/book/ch${pathArray[0] - 1}/p${prevChapter.parts.length}`
			prev.index = pathArray[0] - 2;
		}
		return {
			title: `Ch${pathArray[0]}-P${pathArray[1]} - ${currPart.title}`,
			prev,
			next
		}
	}

	onClickHashTagLink(hash: string) {
		setTimeout(() => {
			if (this._isPlatformBrowserService.getIsPlatformBrowser()) {
				document.getElementById(hash)?.scrollIntoView();
			}
		}, 100)
	}

	getCurrentPosition$(): Observable<number> {
		return this._currentPosition$;
	}

	setCurrentPosition(index: number) {
		this._currentPosition$.next(index);
	}

	getToExpand$(): Observable<number> {
		return this._toExpand$;
	}

	setToExpand(index: number): void {
		this._toExpand$.next(index);
	}
}
