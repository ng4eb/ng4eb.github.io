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

@Component({
  selector: 'app-ch2-p3',
  template: `
    <markdown [data]="ch2P3Markdown"
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
  ch2P3Markdown = ch2P3Markdown;

  constructor(private _onLoadMdService: OnLoadMdService) {
  }

  onLoad(_e: any) {
    setTimeout(() => {
      this._onLoadMdService.onLoadMd(this.md);
    })
  }

  ngOnInit(): void {
  }

}
