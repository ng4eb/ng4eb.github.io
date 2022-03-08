import {
	AfterViewChecked,
	ChangeDetectionStrategy,
	Component, ElementRef, OnDestroy,
	OnInit, ViewChild
} from '@angular/core';
import {
	BehaviorSubject,
	debounceTime,
	distinctUntilChanged,
	filter,
	fromEvent,
	Observable,
	Subscription,
	tap
} from 'rxjs';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {
	ChapterListingService
} from '../../service/chapter-listing.service';
import {LayoutService} from '../../service/layout.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, AfterViewChecked, OnDestroy {
	queryString = '';
	faSearch = faSearch;
	isMenuOpen$ = new BehaviorSubject(false);
	chapterListing = this._chapterListingService.getListing();
	private _hasRegisteredQuery = false;
	private _querySubscription?: Subscription;

	constructor(
		private _chapterListingService: ChapterListingService,
		private _layoutService: LayoutService,
		private _router: Router,
	) {
	}

	private _query!: ElementRef;

	@ViewChild('query', {static: false}) set query(query: ElementRef) {
		if (query) {
			this._query = query;
		}
	};

	toggleMenuOpen() {
		this.isMenuOpen$.next(!this.isMenuOpen$.value);
	}

	goFullSearch() {
		if (this.queryString) {
			this._router.navigate(
				['/search'],
				{ queryParams: { query: this.queryString } }
			);
			this.toggleMenuOpen();
			this._layoutService.scrollToTop();
		}
	}


	onClickNormalLink() {
		this._layoutService.scrollToTop();
		this.toggleMenuOpen();
	}

	onClickHashTagLink(hash: string) {
		this._chapterListingService.onClickHashTagLink(hash);
		this.toggleMenuOpen();
	}

	ngOnInit(): void {
	}

	ngAfterViewChecked() {
		if (!this._hasRegisteredQuery && this._query) {
			this._querySubscription = (fromEvent(this._query.nativeElement, 'keyup') as Observable<KeyboardEvent>)
				.pipe(
					tap((event: KeyboardEvent) => {
						// if enter is pressed
						if (event.keyCode == 13) {
							this.goFullSearch();
						}
					}),
					filter(Boolean),
					debounceTime(500),
					distinctUntilChanged(),
					tap((_event: KeyboardEvent) => {
						this.queryString = this._query.nativeElement.value.toLowerCase();
					})
				)
				.subscribe();
		}
	}

	ngOnDestroy() {
		if (this._querySubscription) {
			this._querySubscription.unsubscribe();
			this._querySubscription = undefined;
		}
	}

}
