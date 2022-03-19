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
import {SeoService} from '../../service/seo.service';

@Component({
	selector: 'app-ch3-p1',
	template: `
        <markdown [data]="markdown"
                  (ready)="onLoad($event)"
                  #md>
        </markdown>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ch3P1Component implements OnInit {
	@ViewChildren('md') md: any;
	markdown = ch3P1Markdown;

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
			title: 'Ch3-P1 - Using Components & Modules',
			description: 'This part focuses on the basics of components and modules in Angular.',
			keywords: 'Angular, resources, free, online, ng4eb, components, modules',
			path: '/ch3/p1'
		})
	}

}
