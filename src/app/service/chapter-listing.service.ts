import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ChapterListingService {
	private _chapterListing = [
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
						"Nested components & communication"
					]
				},
				{
					title: "Using Directives",
					sections: [
						"How directives work",
						"Using ngIf and ngFor",
						"Creating a random color directive"
					]
				},
				{
					title: "Using Pipes",
					sections: [
						"How pipes work",
						"Using percent pipe",
						"Creating our own percent pipe"
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
						"Using routing modules",
						"Creating nested pages"
					]
				},
				{
					title: "Advanced Routing Techniques",
					sections: [
						"Lazy-loading a module",
						"Implementing an authentication router guard"
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
						"Concept of Dependency Injection",
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

	constructor() {
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
		const pathArray = path.replace('/ch', '')
			.replace('/p', '')
			.split('#')[0]
			.split('')
			.map(s => parseInt(s));
		const currChapter = this._chapterListing[pathArray[0] - 1];
		const currPart = currChapter.parts[pathArray[1] - 1];
		console.log('currChapter', currChapter);
		console.log('currPart', currPart);
		const prev = {
			title: '',
			path: '',
		};
		const next = {
			title: '',
			path: '',
		};
		// parsing next
		if (currChapter.parts.length > pathArray[1]) {
			next.title = `Ch${pathArray[0]} - P${pathArray[1] + 1} - ${currChapter.parts[pathArray[1]].title}`;
			next.path = `/ch${pathArray[0]}/p${pathArray[1] + 1}`
		} else if (this._chapterListing.length > pathArray[0]) {
			next.title = `Ch${pathArray[0] + 1} - P1 - ${this._chapterListing[pathArray[0] + 1].parts[0].title}`;
			next.path = `/ch${pathArray[0] + 1}/p1`
		}
		// parsing prev
		if (1 < pathArray[1]) {
			prev.title = `Ch${pathArray[0]} - P${pathArray[1] - 1} - ${currChapter.parts[pathArray[1] - 2].title}`;
			prev.path = `/ch${pathArray[0]}/p${pathArray[1] - 1}`
		} else if (1 < pathArray[0]) {
			next.title = `Ch${pathArray[0] - 1} - P1 - ${this._chapterListing[pathArray[0] - 2].parts[0].title}`;
			next.path = `/ch${pathArray[0] - 1}/p1`
		}

		return {
			title: `Ch${pathArray[0]}-P${pathArray[1]} - ${currPart.title}`,
			prev,
			next
		}
	}

	onClickHashTagLink(hash: string) {
		setTimeout(() => {
			window.location.hash = hash + '#';
			setTimeout(() => {
				window.location.hash = hash;
			});
		}, 100)
	}
}
