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
import {SeoService} from '../../service/seo.service';

@Component({
	selector: 'app-ch2-p2',
	template: `
        <markdown [data]="markdown"
                  (ready)="onLoad($event)"
                  #md>
        </markdown>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ch2P2Component implements OnInit {
	@ViewChildren('md') md: any;
	markdown = ch2P2Markdown;

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
			title: 'Ch2-P2 - CLI Commands',
			description: 'Angular CLI is extremely powerful. This part goes through the basics of the CLI to get you started.',
			keywords: 'Angular, resources, free, online, ng4eb, Angular CLI, basic commands',
			path: '/ch2/p2'
		})
	}

}
