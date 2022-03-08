import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	ViewChildren
} from '@angular/core';
import {ch1P1Markdown} from './ch1-p1.markdown';
import {
	OnLoadMdService
} from '../../service/on-load-md.service';

@Component({
	selector: 'app-ch1-p1',
	template: `
        <markdown [data]="ch1P1Markdown"
                  (ready)="onLoad($event)"
                  #md>
        </markdown>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ch1P1Component implements OnInit {
	@ViewChildren('md') md: any;
	ch1P1Markdown = ch1P1Markdown

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
