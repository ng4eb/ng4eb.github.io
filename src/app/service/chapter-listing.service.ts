import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ChapterListingService {
	private _chapterListing = [
		// chapter 1
		{
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
}
