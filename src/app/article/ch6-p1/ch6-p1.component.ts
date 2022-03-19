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
import { ch6P1Markdown } from './ch6-p1.markdown';

@Component({
  selector: 'app-ch6-p1',
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
export class Ch6P1Component implements OnInit {
  @ViewChildren('md') md: any;
  markdown = ch6P1Markdown;

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
      title: 'Ch6-P1 - Using Template-driven Forms',
      description: 'This part focuses on the basics of template-driven forms in Angular - including ngModel and two-way bindings',
      keywords: 'Angular, resources, free, online, ng4eb, template-driven forms, ngModel, two-way bindings, ngForm, validation',
      path: '/ch6/p1'
    })
  }
}
