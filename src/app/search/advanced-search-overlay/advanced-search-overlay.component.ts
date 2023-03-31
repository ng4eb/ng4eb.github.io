import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { LayoutService } from '../../layout/layout.service';
import { debounceTime, distinctUntilChanged, filter, fromEvent, Observable, Subscription, tap } from 'rxjs';
import { AdvancedSearchService } from '../advanced-search.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-advanced-search-overlay',
    templateUrl: './advanced-search-overlay.component.html',
    styleUrls: ['./advanced-search-overlay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedSearchOverlayComponent implements OnInit, AfterViewChecked, OnDestroy {
    queryString = '';
    faSearch = faSearch;
    faSpinner = faSpinner;
    searchResults: { title: string; content: string; url: string; query?: string }[] = [];
    isSearching = false;
    private _hasRegisteredQuery = false;
    private _markdownSubscription?: Subscription;
    private _querySubscription?: Subscription;

    constructor(private _layoutService: LayoutService, private _advancedSearchService: AdvancedSearchService, private _router: Router, private _cdr: ChangeDetectorRef) {}

    private _query!: ElementRef;

    @ViewChild('query', { static: false }) set query(query: ElementRef) {
        if (query) {
            this._query = query;
        }
    }

    clickUrl() {
        this.closeSearch();
        this._layoutService.scrollToTop();
    }

    closeSearch() {
        this._layoutService.setIsAdvancedSearchOpen(false);
    }

    goFullSearch() {
        if (this.queryString) {
            this._router.navigate(['/search'], { queryParams: { query: this.queryString } });
            this.closeSearch();
            this._layoutService.scrollToTop();
        }
    }

    ngOnInit() {
        this._markdownSubscription = this._advancedSearchService.loadMarkdownFiles().subscribe((markdowns) => {
            this._advancedSearchService.markdowns = markdowns;
        });
    }

    ngAfterViewChecked() {
        if (!this._hasRegisteredQuery && this._query) {
            this._querySubscription = (fromEvent(this._query.nativeElement, 'keyup') as Observable<KeyboardEvent>)
                .pipe(
                    filter(
                        (event: KeyboardEvent) =>
                            event.keyCode != 38 && // arrow up
                            event.keyCode != 40 && // arrow down
                            event.keyCode != 37 && // arrow left
                            event.keyCode != 39 // arrow right
                    ),
                    tap((event: KeyboardEvent) => {
                        // if esc is pressed
                        if (event.keyCode == 27) {
                            this.closeSearch();
                        }
                        // if enter is pressed
                        if (event.keyCode == 13) {
                            this.goFullSearch();
                        }
                    }),
                    filter(Boolean),
                    debounceTime(200),
                    distinctUntilChanged(),
                    tap((_event: KeyboardEvent) => {
                        this.queryString = this._query.nativeElement.value;
                        if (this.queryString) {
                            this.isSearching = true;
                            this._cdr.detectChanges();
                            this.searchResults = this._advancedSearchService.quickSearch(this.queryString);
                            setTimeout(() => {
                                this.isSearching = false;
                                this._cdr.detectChanges();
                            }, 300);
                        }
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
        if (this._markdownSubscription) {
            this._markdownSubscription.unsubscribe();
            this._markdownSubscription = undefined;
        }
    }
}
