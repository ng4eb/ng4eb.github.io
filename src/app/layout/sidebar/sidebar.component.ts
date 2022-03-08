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
} from '../../service/chapter-listing.service';
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	fromEvent,
	Observable,
	Subscription,
	tap
} from 'rxjs';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, AfterViewChecked, OnDestroy {
	faSearch = faSearch;
	isSidebarOpen$ = this._layoutService.getIsSidebarOpen$();
	chapterListing = this._chapterListingService.getListing();
	private _hasRegisteredTitleSearch = false;
	private _filterQuery = '';
	private _titleSearchSubscription?: Subscription;

	constructor(
		private _layoutService: LayoutService,
		private _chapterListingService: ChapterListingService,
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
		this._chapterListingService.onClickHashTagLink(hash);
	}

	scrollToTop() {
		this._layoutService.scrollToTop();
	}

	ngOnInit(): void {
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
	}

}
