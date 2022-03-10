import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren
} from '@angular/core';
import {
  OnLoadMdService
} from '../../service/on-load-md.service';
import { ch2P1Markdown } from './ch2-p1.markdown';
import {SeoService} from '../../service/seo.service';

@Component({
  selector: 'app-ch2-p1',
  template: `
    <markdown [data]="ch2P1Markdown"
              (ready)="onLoad($event)"
              #md>
    </markdown>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ch2P1Component implements OnInit {
  @ViewChildren('md') md: any;
  ch2P1Markdown = ch2P1Markdown;

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
      title: 'Ch2-P1 - Installation',
      description: 'This part walks through the installation process of Angular.',
      keywords: 'Angular, resources, free, online, ng4eb, installation, node.js, npm',
      path: '/ch2/p1'
    })
  }

}
