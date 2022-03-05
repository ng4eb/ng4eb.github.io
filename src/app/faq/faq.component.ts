import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import {
	faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'app-faq',
	templateUrl: './faq.component.html',
	styleUrls: ['./faq.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent implements OnInit {
	path = '';
	faAngleLeft = faAngleLeft;

	faqContent: Record<string, { title: string, paragraphs: string[] }> = {
		newToAngular: {
			title: "I'm New to Angular",
			paragraphs: [
				"Welcome to the world of Angular!",
				"If you are already familiar with the background of Angular, you can skip chapter 1. Otherwise, it is best to start reading from chapter 1.",
				"Good luck!"
			]
		},
		whyThisBook: {
			title: "Why this book?",
			paragraphs: [
				"This book aims to introduce Angular to an audience who already know the basics of HTML, CSS and TypeScript. It is written in simple English. It does not attempt to cover everything, but it strives to explain the underlying concepts in Angular in a concise manner.",
				"If you would like to master the basics of Angular with a short and easy-to-understand book, then this book is for you."
			]
		},
		howToSupport: {
			title: "How to support this project?",
			paragraphs: [
				"The best way to support this project is to contribute to the Github project. Besides, you may star this project on Github and share it with friends who are interested in learning Angular!"
			]
		},
		contribution: {
			title: "How may I contribute?",
			paragraphs: [
				"To contribute to this project, you can raise Github issues for problems, bugs, and feature requests. You are also welcome to open pull requests for any issues you find!"
			]
		}
	}

	constructor(private _route: ActivatedRoute) {
	}

	mapPathToKey(path: string) {
		const words = path.split('-');
		for (let i = 1; i < words.length; i++) {
			words[i] = words[i][0].toUpperCase() + words[i].substring(1,words[i].length);
		}
		return words.join('');
	}

	ngOnInit(): void {
		this.path = this.mapPathToKey(this._route.snapshot.url[0].path);
	}

}
