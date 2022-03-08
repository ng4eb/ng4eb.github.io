import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	ViewChildren
} from '@angular/core';
import {
	OnLoadMdService
} from '../../service/on-load-md.service';
import {ch2P2Markdown} from './ch2-p2.markdown';

@Component({
	selector: 'app-ch2-p2',
	template: `
        <markdown [data]="ch2P2Markdown"
                  (ready)="onLoad($event)"
                  #md>
        </markdown>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ch2P2Component implements OnInit {
	@ViewChildren('md') md: any;
	ch2P2Markdown = ch2P2Markdown;

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
