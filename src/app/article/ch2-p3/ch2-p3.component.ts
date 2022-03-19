import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren
} from '@angular/core';
import { ch2P3Markdown } from './ch2-p3.markdown';
import {
  OnLoadMdService
} from '../../service/on-load-md.service';
import {SeoService} from '../../service/seo.service';

@Component({
  selector: 'app-ch2-p3',
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
export class Ch2P3Component implements OnInit {
  @ViewChildren('md') md: any;
  markdown = ch2P3Markdown;

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
      title: 'Ch2-P3 - Using angular.json',
      description: 'In this part, we will talk about and use angular.json. It is a very useful file for workspace configuration.',
      keywords: 'Angular, resources, free, online, ng4eb, workspace, angular.json, configuration, Angular CLI',
      path: '/ch2/p3'
    })
  }

}
