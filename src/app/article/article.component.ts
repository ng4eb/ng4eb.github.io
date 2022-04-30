import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChildren
} from '@angular/core';
import {RoutingService} from '../service/routing.service';
import {
  ChapterListingService,
  navigationPart
} from '../service/chapter-listing/chapter-listing.service';
import {BehaviorSubject, filter, Subject, takeUntil} from 'rxjs';
import {
  faAngleLeft,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {
  IsPlatformBrowserService
} from '../service/is-platform-browser.service';
import {
  OnLoadMdService
} from '../service/on-load-md.service';
import mediumZoom from 'medium-zoom';
import {LayoutService} from '../service/layout.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('md') md: any;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  url = this._router.url;
  navigation: {
    title: string;
    prev: navigationPart;
    next: navigationPart;
  } = {
    title: '',
    prev: {
      title: '',
      path: '',
      index: null
    },
    next: {
      title: '',
      path: '',
      index: null
    }
  }
  h2Elements: Element[] = [];
  queryElements: Element[] = [];
  query?: string;
  currQueryIndex$ = new BehaviorSubject(0);
  private _zoom: any;
  private _path$ = this._routingService.getPath$();
  private _destroy$ = new Subject<boolean>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _routingService: RoutingService,
    private _chapterListingService: ChapterListingService,
    private _isPlatformBrowserService: IsPlatformBrowserService,
    private _onLoadMdService: OnLoadMdService,
    private _layoutService: LayoutService,
    private _cdr: ChangeDetectorRef,
  ) {
  }

  @HostListener('document:click', ['$event'])
  public handleClickH2Anchor(event: Event) {
    if (event.target instanceof HTMLAnchorElement) {
      const element = event.target as HTMLAnchorElement;
      if (element.className === 'h2-anchor') {
        event.preventDefault();
        const hash = element?.getAttribute('name');
        if (hash) {
          window.location.hash = hash;
          element.scrollIntoView();
        }
      }
    }
  }

  prevQuery() {
    const currIdx = this.currQueryIndex$.getValue();
    if (currIdx <= 0) return;
    this.queryElements[currIdx].classList.remove('active');
    this.currQueryIndex$.next(currIdx - 1);
  }

  nextQuery() {
    const currIdx = this.currQueryIndex$.getValue();
    if (currIdx >= this.queryElements.length - 1) return;
    this.queryElements[currIdx].classList.remove('active');
    this.currQueryIndex$.next(currIdx + 1);
  }

  clickNavigationLink(index: number | null) {
    this._layoutService.scrollToTop(false);
    this.setToExpand(index);
  }

  setToExpand(index: number | null) {
    if (index !== null) {
      this._chapterListingService.setToExpand(index);
    }
  }

  ngOnInit(): void {
    this._path$
      .pipe(takeUntil(this._destroy$))
      .subscribe((path) => {
        this.url = path || this.url;
        this.navigation = this._chapterListingService.getNavigation(this.url);
      });

    this._route.queryParamMap
      .pipe(
        filter(Boolean),
        takeUntil(this._destroy$)
      )
      .subscribe((paramMap) => {
        this.query = paramMap.get('query') || '';
      })
  }

  ngAfterViewInit() {
    this._onLoadMdService.getH2Elements()
      .pipe(
        filter(Boolean),
        takeUntil(this._destroy$)
      )
      .subscribe((elements) => {
        this.h2Elements = elements;
        this._cdr.detectChanges();
      });
    this._onLoadMdService.getQueryElements()
      .pipe(
        filter(Boolean),
        takeUntil(this._destroy$)
      )
      .subscribe((elements) => {
        this.queryElements = elements;
        this.queryElements[0]?.scrollIntoView();
        this.queryElements[0]?.classList.add('active');
        this.currQueryIndex$.next(0);
        this._cdr.detectChanges();
      });
    this.currQueryIndex$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((idx) => {
        this.queryElements[idx]?.scrollIntoView();
        this.queryElements[idx]?.classList.add('active');
        this._cdr.detectChanges();
      })
    this._routingService.getPath$()
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        if (this._isPlatformBrowserService.getIsPlatformBrowser()) {
          if (!this._zoom) {
            this._zoom = mediumZoom('.md-img', {background: '#222222'});
          } else {
            this._zoom.detach();
            setTimeout(() => {
              this._zoom = mediumZoom('.md-img', {background: '#222222'});
            })
          }
        }
      })
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

}
