import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import {
	faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {SeoService} from '../service/seo.service';

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
				"The best way to support this project is to contribute to the <a href=\"https://github.com/ng4eb/ng4eb-revamp\" target=\"_blank\">Github project</a>. In addition, you can star it on Github and share it with your friends who are interested in learning Angular!"
			]
		},
		contribution: {
			title: "How may I contribute?",
			paragraphs: [
				"To contribute to <a href=\"https://github.com/ng4eb/ng4eb-revamp\" target=\"_blank\">this project</a>, you can raise Github issues for problems, bugs, and feature requests. You are also welcome to open pull requests for any issues you find!"
			]
		},
		resources: {
			title: "Resources",
			paragraphs: [
				"Here are some great and free resources that I recommend for learning more about Angular (in no particular order):",
				`<ul>
<li><a href="https://youtu.be/3dHNOWTI7H8" target="_blank">Angular Crash Course</a> - Youtube Video by <a href="https://www.traversymedia.com/" target="_blank">Traversy Media</a><br />(Great for picking up the practical side of Angular basics)</li>
<li><a href="https://testing-angular.com/" target="_blank">Testing Angular</a> - Ebook by <a href="https://molily.de/" target="_blank">molily</a><br />(Great for learning about testing in depth after mastering the basics of Angular)</li>
<li><a href="https://discord.com/invite/angular" target="_blank">Angular Community</a> - Discord</a><br />  (One of the best places to ask questions about Angular)</li>
<li><a href="https://youtu.be/Ata9cSC2WpM" target="_blank">Angular in 100 Seconds</a> - Youtube Video by <a href="https://fireship.io/" target="_blank">fireship</a><br />(A short video which sums up some great features of Angular)</li>
</ul>
				`
			]
		}
	}

	constructor(
		private _route: ActivatedRoute,
		private _seoService: SeoService
	) {
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
		switch(this.path) {
			case 'newToAngular':
				this._seoService.setSEO({
					title: 'New to Angular',
					description: 'New to Angular? Great to see you! This free eBook is for you to begin your wonderful journey in the Angular world!',
					keywords: 'Angular, eBook, free, online, faq, ng4eb, learning, journey, reference',
					path: this._route.snapshot.url[0].path
				});
				break;
			case 'whyThisBook':
				this._seoService.setSEO({
					title: 'Why This Book',
					description: 'Why this book? Because this book is written with simplicity in mind. It aims to cover the basic knowledge and skills you need to get started in Angular within a short time.',
					keywords: 'Angular, eBook, free, online, faq, ng4eb, concise, basics, core knowledge, core skills',
					path: this._route.snapshot.url[0].path
				});
				break;
			case 'howToSupport':
				this._seoService.setSEO({
					title: 'How to Support',
					description: 'To support this project, please star the Github repo and contribute anytime!',
					keywords: 'Angular, eBook, free, online, faq, ng4eb, Github, support, contribute',
					path: this._route.snapshot.url[0].path
				});
				break;
			case 'contribution':
				this._seoService.setSEO({
					title: 'Contribution',
					description: 'It is easy to contribute to this project. Raise any issues you find, or open pull requests.',
					keywords: 'Angular, eBook, free, online, faq, ng4eb, Github, contribution, issues, pull requests',
					path: this._route.snapshot.url[0].path
				});
				break;
			case 'resources':
				this._seoService.setSEO({
					title: 'Resources',
					description: 'Here is a list of free resources that are great for learning more about Angular.',
					keywords: 'Angular, resources, free, online, faq, ng4eb',
					path: this._route.snapshot.url[0].path
				});
				break;
		}
	}

}
