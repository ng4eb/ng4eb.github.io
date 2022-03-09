import {
	ChangeDetectionStrategy, ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewChildren
} from '@angular/core';
import {RoutingService} from '../service/routing.service';
import {
	ChapterListingService
} from '../service/chapter-listing.service';
import {filter, Subscription} from 'rxjs';
import {
	faAngleLeft,
	faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {
	IsPlatformBrowserService
} from '../service/is-platform-browser.service';
import {
	OnLoadMdService
} from '../service/on-load-md.service';

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
	url = this._router.url;
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
	h2Elements: Element[] = [];
	private _path$ = this._routingService.getPath$();
	private _subscription!: Subscription;

	constructor(
		private _router: Router,
		private _routingService: RoutingService,
		private _chapterListingService: ChapterListingService,
		private _isPlatformBrowserService: IsPlatformBrowserService,
		private _onLoadMdService: OnLoadMdService,
		private _cdr: ChangeDetectorRef
	) {
	}

	ngOnInit(): void {
		this._subscription = this._path$.subscribe((path) => {
			this.url = path || this.url;
			this.navigation = this._chapterListingService.getNavigation(this.url);
		});
	}

	ngAfterViewInit(): void {
		this._onLoadMdService.getH2Elements()
			.pipe(filter(Boolean))
			.subscribe((elements) => {
				this.h2Elements = elements;
				this._cdr.detectChanges();
			});
	}

	ngOnDestroy() {
		this._subscription.unsubscribe();
	}

}
