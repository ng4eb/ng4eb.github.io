import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren
} from '@angular/core';
import {
  OnLoadMdService
} from '../../service/on-load-md.service';
import {ch3P2Markdown} from './ch3-p2.markdown';
import {SeoService} from '../../service/seo.service';

@Component({
  selector: 'app-ch3-p2',
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
export class Ch3P2Component implements OnInit {
  @ViewChildren('md') md: any;
  markdown = ch3P2Markdown;

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
      title: 'Ch3-P2 - Using Directives',
      description: 'This part focuses on the basics of directives in Angular.',
      keywords: 'Angular, resources, free, online, ng4eb, directives, components, structural, attribute',
      path: '/ch3/p2'
    })
  }

}
