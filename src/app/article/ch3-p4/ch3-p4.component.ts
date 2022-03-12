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
import { ch3P4Markdown } from './ch3-p4.markdown';

@Component({
  selector: 'app-ch3-p4',
  template: `
    <markdown [data]="ch3P4Markdown"
              (ready)="onLoad($event)"
              #md>
    </markdown>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ch3P4Component implements OnInit {
  @ViewChildren('md') md: any;
  ch3P4Markdown = ch3P4Markdown;

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
      title: 'Ch3-P4 - Using Pipes',
      description: 'This part focuses on the basics of pipes in Angular, including using built-in pipes and creating our own custom ones.',
      keywords: 'Angular, resources, free, online, ng4eb, pipes, built-in pipes, custom pipes, percent pipe',
      path: '/ch3/p4'
    })
  }


}
