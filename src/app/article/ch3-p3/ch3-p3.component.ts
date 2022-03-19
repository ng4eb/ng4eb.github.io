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
import { ch3P3Markdown } from './ch3-p3.markdown';

@Component({
  selector: 'app-ch3-p3',
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
export class Ch3P3Component implements OnInit {
  @ViewChildren('md') md: any;
  markdown = ch3P3Markdown;

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
      title: 'Ch3-P3 - Lifecycle',
      description: 'This part focuses on the basics of lifecycle in Angular.',
      keywords: 'Angular, resources, free, online, ng4eb, lifecycle, lifecycle hooks, change detection',
      path: '/ch3/p3'
    })
  }

}
