import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren
} from '@angular/core';
import {
  OnLoadMdService
} from '../../service/on-load-md.service';
import {SeoService} from '../../service/seo.service';
import { ch4P1Markdown } from './ch4-p1.markdown';

@Component({
  selector: 'app-ch4-p1',
  template: `
    <markdown [data]="ch4P1Markdown"
              (ready)="onLoad($event)"
              #md>
    </markdown>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ch4P1Component implements OnInit {
  @ViewChildren('md') md: any;
  ch4P1Markdown = ch4P1Markdown;

  constructor(
      private _onLoadMdService: OnLoadMdService,
      private _seoService: SeoService,
  ) {
  }

  onLoad(_e: any) {
    setTimeout(() => {
      this._onLoadMdService.onLoadMd(this.md);
    })
  }

  ngOnInit(): void {
    this._seoService.setSEO({
      title: 'Ch4-P1 - Using Routing',
      description: 'This part focuses on the basics of routing in Angular - using app-routing module, creating basic routes, redirects, fallback and child routes.',
      keywords: 'Angular, resources, free, online, ng4eb, routing, router, routermodule, spa, redirect, not-found page, child routes',
      path: '/ch4/p1'
    })
  }

}
