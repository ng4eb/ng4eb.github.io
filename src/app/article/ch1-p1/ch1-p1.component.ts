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
import {SeoService} from '../../service/seo.service';

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
			title: 'Ch1-P1 - What is Angular',
			description: 'What is Angular? This part explores the background of Angular as a modern front-end framework.',
			keywords: 'Angular, resources, free, online, ng4eb, framework, background',
			path: '/ch1/p1'
		})
	}

}
