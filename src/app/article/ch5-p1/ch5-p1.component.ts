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
import { ch5P1Markdown } from './ch5-p1.markdown';

@Component({
  selector: 'app-ch5-p1',
  template: `
    <markdown [data]="ch5P1Markdown"
              (ready)="onLoad($event)"
              #md>
    </markdown>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ch5P1Component implements OnInit {
  @ViewChildren('md') md: any;
  ch5P1Markdown = ch5P1Markdown;

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
      title: 'Ch5-P1 - Using Services',
      description: 'This part focuses on the basics of services in Angular - including how services work and dependency injection',
      keywords: 'Angular, resources, free, online, ng4eb, services, the service layer, dependency injection',
      path: '/ch5/p1'
    })
  }
}
