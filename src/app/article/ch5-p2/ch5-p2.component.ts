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
import { ch5P2Markdown } from './ch5-p2.markdown';

@Component({
  selector: 'app-ch5-p2',
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
export class Ch5P2Component implements OnInit {
  @ViewChildren('md') md: any;
  markdown = ch5P2Markdown;

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
      title: 'Ch5-P2 - RxJS Basics',
      description: 'This part focuses on the basics of observables in Angular - including how to use observables in services',
      keywords: 'Angular, resources, free, online, ng4eb, rxjs, observables, behaviorsubject, promises, asynchronous programming, services, the service layer',
      path: '/ch5/p2'
    })
  }
}
