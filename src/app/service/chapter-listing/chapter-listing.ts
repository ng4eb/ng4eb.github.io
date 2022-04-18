export interface IChapter {
	ch: number;
	title: string;
	parts: {
		title: string;
		sections?: string[];
	}[]
}

export const chapterListing: IChapter[] = [
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
					"Using resolvers",
					"Using url matcher"
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
					"Using FormControl & FormGroup",
					"Using FormBuilder"
				]
			},
			{
				title: "HTTP Client",
				sections: [
					"What is HTTP Client",
					"HTTP requests to external API"
				]
			}
		]
	}
]
