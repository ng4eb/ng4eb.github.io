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
import { ch4P2Markdown } from './ch4-p2.markdown';

@Component({
  selector: 'app-ch4-p2',
  template: `
    <markdown [data]="ch4P2Markdown"
              (ready)="onLoad($event)"
              #md>
    </markdown>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ch4P2Component implements OnInit {
  @ViewChildren('md') md: any;
  ch4P2Markdown = ch4P2Markdown;

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
      title: 'Ch4-P2 - Advacned Routing Techniques',
      description: 'This part focuses on the more advanced techniques of routing in Angular - including the use of lazy-loading modules, router guards, and resolvers',
      keywords: 'Angular, resources, free, online, ng4eb, routing, router, routermodule, spa, lazy-loading, router guards, resolvers',
      path: '/ch4/p2'
    })
  }
}
