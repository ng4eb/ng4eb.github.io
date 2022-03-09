import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	ViewChildren
} from '@angular/core';
import {
	OnLoadMdService
} from '../../service/on-load-md.service';
import {ch3P1Markdown} from './ch3-p1.markdown';

@Component({
	selector: 'app-ch3-p1',
	template: `
        <markdown [data]="ch3P1Markdown"
                  (ready)="onLoad($event)"
                  #md>
        </markdown>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ch3P1Component implements OnInit {
	@ViewChildren('md') md: any;
	ch3P1Markdown = ch3P1Markdown;

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
