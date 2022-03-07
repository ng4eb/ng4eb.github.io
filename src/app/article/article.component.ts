import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChildren
} from '@angular/core';
import {RoutingService} from '../service/routing.service';
import {
	ChapterListingService
} from '../service/chapter-listing.service';
import {Subscription} from 'rxjs';
import {
	faAngleLeft,
	faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit, OnDestroy {
	@ViewChildren('md') md: any;
	faAngleLeft = faAngleLeft;
	faAngleRight = faAngleRight;
	path = this._routingService.getPath();
	navigation = {
		title: '',
		prev: {
			title: '',
			path: ''
		},
		next: {
			title: '',
			path: ''
		}
	}
	subscription!: Subscription;

	constructor(
		private _routingService: RoutingService,
		private _chapterListingService: ChapterListingService
	) {
	}

	onLoad(_e: any) {
		(this.md as QueryList<MarkdownComponent>).forEach((el) => {
				const arr = Array.from(el.element.nativeElement.children);
				let i = 1;
				arr.forEach(child => {
					if (child.tagName === 'H2') {
						console.log('found')
						child.setAttribute('id', `${i}`);
						i++;
					}
				});
			}
		);
		if (window.location.hash) {
			const hash = window.location.hash.split('#')[1];
			window.location.hash = hash + '#';
			setTimeout(() => {
				window.location.hash = hash;
			});
		}
	}


	ngOnInit(): void {
		this.subscription = this.path.subscribe((path) =>
			this.navigation = this._chapterListingService.getNavigation(path)
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
