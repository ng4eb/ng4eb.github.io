import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import {seoConfigs, articleKey} from './seo';

import {
  OnLoadMdService
} from '../services/on-load-md.service';
import {SeoService} from '../services/seo.service';
import {ActivatedRoute} from '@angular/router';
import {
  RoutingService
} from '../services/routing.service';
import {Subject, Subscription, takeUntil} from 'rxjs';
import {
  IsPlatformBrowserService
} from '../services/is-platform-browser.service';

@Component({
  selector: 'app-chapter',
  template: `
    <markdown
            [src]="markdownPath"
            (ready)="onLoad($event)"
            #md>
    </markdown>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChapterComponent implements OnInit, OnDestroy {
  @ViewChildren('md') md: any;
  markdownPath = `assets/markdowns/${this._route.snapshot.data['chapter']}.md`;
  private _destroy$ = new Subject<boolean>();
  private _routeDataSubscription?: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _onLoadMdService: OnLoadMdService,
    private _seoService: SeoService,
    private _routingService: RoutingService,
    private _isPlatformBrowserService: IsPlatformBrowserService,
    private _cdr: ChangeDetectorRef
  ) {
  }

  onLoad(_e: any) {
    setTimeout(() => {
      this._onLoadMdService.onLoadMd(this.md);
      this._route.queryParamMap
        .pipe(
          takeUntil(this._destroy$)
        )
        .subscribe((paramMap) => {
          const query = paramMap.get('query') || '';
          this._onLoadMdService.onLoadQuery(this.md, query);
        })
    })
  }

  ngOnInit(): void {
    const seoKeyPath: articleKey = this._route.snapshot.data['chapter'];
    this._seoService.setSEO(seoConfigs[seoKeyPath]);
    this._routeDataSubscription = this._route.data.subscribe(data => {
      this.markdownPath = `assets/markdowns/${data['chapter']}.md`;
    });
    if (this._isPlatformBrowserService.getIsPlatformBrowser()) {
      this._routingService.getPath$()
        .pipe(takeUntil(this._destroy$))
        .subscribe((url: string) => {
          const latterHalf = url.split('ch')[1]; // remove /book/ch
          const latterHalfInSegments = latterHalf.split('/') // get [{chNum}, {rest}]
          const chapterNum = latterHalfInSegments[0];
          const partNum = latterHalfInSegments[1]
            .replace('p', '')
            .split('?')[0]
            .split('#')[0];
          this._seoService.setSEO(seoConfigs[`ch${chapterNum}p${partNum}` as articleKey]);
          this._cdr.detectChanges();
        })
    }
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
    if (this._routeDataSubscription) {
      this._routeDataSubscription.unsubscribe();
    }
  }

}
