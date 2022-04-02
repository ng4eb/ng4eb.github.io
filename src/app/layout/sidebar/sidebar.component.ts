import {
	AfterViewChecked,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild
} from '@angular/core';
import {LayoutService} from '../../service/layout.service';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {
	ChapterListingService
} from '../../service/chapter-listing/chapter-listing.service';
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	fromEvent,
	Observable,
	Subscription,
	tap
} from 'rxjs';
import {
	RoutingService
} from '../../service/routing.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, AfterViewChecked, OnDestroy {
	faSearch = faSearch;
	isSidebarOpen$ = this._layoutService.getIsSidebarOpen$();
	currentPosition$ = this._chapterListingService.getCurrentPosition$();
	url = this._router.url;
	chapterListing = this._chapterListingService.getListing();
	toExpand$ = this._chapterListingService.getToExpand$();
	private _hasRegisteredTitleSearch = false;
	private _filterQuery = '';
	private _titleSearchSubscription?: Subscription;
	private _path$ = this._routingService.getPath$();
	private _subscription!: Subscription;

	constructor(
		private _layoutService: LayoutService,
		private _chapterListingService: ChapterListingService,
		private _routingService: RoutingService,
		private _router: Router,
		private _cdr: ChangeDetectorRef
	) {
	}

	private _titleSearch!: ElementRef;

	@ViewChild('titleSearch', {static: false}) set titleSearch(titleSearch: ElementRef) {
		if (titleSearch) {
			this._titleSearch = titleSearch;
		}
	};

	toggleSidebar() {
		this._layoutService.toggleSidebarOpen();
	}

	openAdvancedSearch() {
		this._layoutService.setIsAdvancedSearchOpen(true);
	}

	titleMatched(title: string) {
		return this._filterQuery && title.toLowerCase().includes(
			this._filterQuery
		);
	}

	onClickHashTagLink(hash: string) {
		this._layoutService.onClickHashTagLink(hash);
	}

	scrollToTop() {
		this._layoutService.scrollToTop();
	}

	ngOnInit(): void {
		this._subscription = this._path$.subscribe((path) => {
			this.url = path || this.url;
			this._cdr.detectChanges();
		});
	}

	ngAfterViewChecked() {
		if (!this._hasRegisteredTitleSearch && this._titleSearch) {
			this._titleSearchSubscription = (fromEvent(this._titleSearch.nativeElement, 'keyup') as Observable<KeyboardEvent>)
				.pipe(
					filter(Boolean),
					debounceTime(500),
					distinctUntilChanged(),
					tap((_event: KeyboardEvent) => {
						this._filterQuery = this._titleSearch.nativeElement.value.toLowerCase();
						this.chapterListing = this._chapterListingService.getFilteredListing(this._titleSearch.nativeElement.value);
						this._cdr.detectChanges();
					})
				)
				.subscribe();
		}
	}

	ngOnDestroy() {
		if (this._titleSearchSubscription) {
			this._titleSearchSubscription.unsubscribe();
			this._titleSearchSubscription = undefined;
		}
		this._subscription.unsubscribe();
	}

}
