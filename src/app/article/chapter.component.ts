import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren, ChangeDetectorRef, OnDestroy
} from '@angular/core';
import {markdowns, mdKey} from './markdowns';
import {seos} from './seos';

import {
  OnLoadMdService
} from '../service/on-load-md.service';
import {SeoService} from '../service/seo.service';
import {ActivatedRoute} from '@angular/router';
import {
  RoutingService
} from '../service/routing.service';
import {Subscription} from 'rxjs';
import {
  IsPlatformBrowserService
} from '../service/is-platform-browser.service';

@Component({
  selector: 'app-chapter',
  template: `
    <markdown [data]="markdown"
              (ready)="onLoad($event)"
              #md>
    </markdown>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChapterComponent implements OnInit, OnDestroy {
  @ViewChildren('md') md: any;
  markdown = markdowns[this._route.snapshot.data['chapter'] as mdKey];
  private _subscription!: Subscription;
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
    })
  }

  ngOnInit(): void {
    this._seoService.setSEO(seos[this._route.snapshot.data['chapter'] as mdKey]);
    if (this._isPlatformBrowserService.getIsPlatformBrowser()) {
      this._subscription = this._routingService.getPath$().subscribe((url: string) => {
        const latterHalf = url.split('ch')[1]; // remove /book/ch
        const latterHalfInSegments = latterHalf.split('/') // get [{chNum}, {rest}]
        const chapterNum = latterHalfInSegments[0];
        const partNum = latterHalfInSegments[1]
            .replace('p', '')
            .split('#')[0];
        this.markdown = markdowns[`ch${chapterNum}p${partNum}` as mdKey];
        this._seoService.setSEO(seos[`ch${chapterNum}p${partNum}` as mdKey]);
        this._cdr.detectChanges();
      })
    }
  }

  ngOnDestroy() {
    if (this._isPlatformBrowserService.getIsPlatformBrowser()) {
      this._subscription.unsubscribe();
    }
  }

}
