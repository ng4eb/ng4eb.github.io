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

@Component({
  selector: 'app-ch3-p2',
  template: `
    <markdown [data]="ch3P2Markdown"
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
  ch3P2Markdown = ch3P2Markdown;

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
