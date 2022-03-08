import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren
} from '@angular/core';
import {
  OnLoadMdService
} from '../../service/on-load-md.service';
import {ch1P2Markdown} from './ch1-p2.markdown';

@Component({
  selector: 'app-ch1-p2',
  template: `
    <markdown [data]="ch1P2Markdown"
              (ready)="onLoad($event)"
              #md>
    </markdown>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ch1P2Component implements OnInit {
  @ViewChildren('md') md: any;
  ch1P2Markdown = ch1P2Markdown;

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