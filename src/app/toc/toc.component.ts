import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import {
	faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import {
	chapterListing
} from '../services/chapter-listing/chapter-listing';
import {LayoutService} from '../services/layout.service';

@Component({
	selector: 'app-toc',
	templateUrl: './toc.component.html',
	styleUrls: ['./toc.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TocComponent implements OnInit {
	faAngleLeft = faAngleLeft;
	chapterListing = chapterListing;
	chapterDesc: Record<string, string> = {
		ch1: "This chapter talks about the background of Angular and discusses why it is worth learning.",
		ch2: "This chapter walks through the installation process, teaches the basics of Angular CLI and workspace configuration.",
		ch3: "This chapter demonstrates the whats and hows of the fundmental building blocks in Angular.",
		ch4: "This chapter focuses on routing basics and techniques in Angular for building single-page applications.",
		ch5: "This chapter introduces the service layer, RxJS and how to use them in Angular.",
		ch6: "This chapter showcases the two types of forms available in Angular, and the Http Client for communicating with a server using the Http protocol."
	}

	constructor(private _layoutService: LayoutService) {
	}

	scrollToTop() {
		this._layoutService.scrollToTop(false);
	}

	onClickHashTagLink(hash: string) {
		this._layoutService.onClickHashTagLink(hash);
	}

	ngOnInit(): void {
	}

}
