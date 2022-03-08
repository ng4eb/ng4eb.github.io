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
				"If you are already familiar with the background of Angular, you can skip chapter one. Otherwise, it is best to start from there!",
				"Good luck!"
			]
		},
		whyThisBook: {
			title: "Why this book?",
			paragraphs: [
				"This book aims to introduce Angular to an audience who already know the basics of HTML, CSS and TypeScript. It is written in simple English. It does not attempt to cover everything as it strives to explain the underlying concepts in Angular in a concise manner.",
				"If you would like to master the basics of Angular with a short and easy-to-understand book, then you are in the right place."
			]
		},
		howToSupport: {
			title: "How to support this project?",
			paragraphs: [
				"The best way to support this project is to contribute to the <a href=\"https://github.com\" target=\"_blank\">Github project</a>. In addition, you can star it on Github and share it with your friends who are interested in learning Angular!"
			]
		},
		contribution: {
			title: "How may I contribute?",
			paragraphs: [
				"To contribute to <a href=\"https://github.com\" target=\"_blank\">this project</a>, you can raise Github issues for problems, bugs, and feature requests. You are also welcome to open pull requests for any issues you find!"
			]
		},
		resources: {
			title: "Resources",
			paragraphs: [
				"Here are some great and free resources that I recommend for learning more about Angular (in no particular order):",
				`<ul>
<li><a href="https://youtu.be/3dHNOWTI7H8" target="_blank">Angular Crash Course</a> - Youtube Video by <a href="https://www.traversymedia.com/" target="_blank">Traversy Media</a><br />(Great for picking up the practical side of Angular basics)</li>
<li><a href="https://testing-angular.com/" target="_blank">Testing Angular</a> - Ebook by <a href="https://molily.de/" target="_blank">molily</a><br />(Great for learning about testing in depth after mastering the Angular basics)</li>
<li><a href="https://discord.com/invite/angular" target="_blank">Angular Community</a> - Discord</a><br />  (One of the best places to ask questions about Angular)</li>
<li><a href="https://youtu.be/Ata9cSC2WpM" target="_blank">Angular in 100 Seconds</a> - Youtube Video by <a href="https://fireship.io/" target="_blank">fireship</a><br />(A short video which sums up some great features of Angular)</li>
</ul>
				`
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
