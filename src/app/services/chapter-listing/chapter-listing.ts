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
					"Angular: A Comprehensive Front-end Framework for SPAs"
				]
			},
			{
				title: "Why Angular",
				sections: [
					"Advantages of Angular",
					"Angular Compared to Other Options"
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
					"Installing Angular"
				]
			},
			{
				title: "CLI Commands",
				sections: [
					"Creating an Angular Project",
					"Useful Commands"
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
					"How Components & Modules Work",
					"Creating a Counter Component",
					"Nested Components & Two-Way Binding"
				]
			},
			{
				title: "Using Directives",
				sections: [
					"How Directives Work",
					"Using ngIf, ngFor & ngStyle",
					"Creating a Random Color Directive"
				]
			},
			{
				title: "Lifecycles",
				sections: [
					"Overview of Lifecycles",
					"Change Detection",
					"Using Lifecycle Hooks"
				]
			},
			{
				title: "Using Pipes",
				sections: [
					"How Pipes Work",
					"Using the Percent Pipe",
					"Creating a Custom Pipe"
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
					"How Routing Works",
					"Using the Routing Module",
					"Creating Child Routes"
				]
			},
			{
				title: "Advanced Routing Techniques",
				sections: [
					"Lazy-Loading a Module",
					"Implementing an Authentication Router Guard",
					"Using Resolvers",
					"Using Url Matcher"
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
					"How Services Work",
					"Concept of Dependency Injection",
					"Creating a Counter Service"
				]
			},
			{
				title: "RxJS Basics",
				sections: [
					"What Is an Observable",
					"Creating a Counter Service Using Observables"
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
					"How Template-Driven Forms Work",
					"Using ngModel"
				]
			},
			{
				title: "Using Reactive Forms",
				sections: [
					"How Reactive Forms Work",
					"Using FormControl & FormGroup",
					"Using FormBuilder"
				]
			},
			{
				title: "HTTP Client",
				sections: [
					"What is HTTP Client",
					"HTTP Requests to External API"
				]
			}
		]
	}
]
