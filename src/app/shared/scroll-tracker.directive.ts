import {
	Directive,
	EventEmitter,
	HostListener,
	Input,
	OnDestroy,
	Output
} from '@angular/core';
import {
	ChapterListingService
} from '../service/chapter-listing.service';
import {
	IsPlatformBrowserService
} from '../service/is-platform-browser.service';

@Directive({
	selector: '[appScrollTracker]'
})
export class ScrollTrackerDirective implements OnDestroy {
	@Output() scrolledToIndex = new EventEmitter<number>()
	@Input('appScrollTracker') elements: Element[] = [];

	constructor(
		private _chapterListingService: ChapterListingService,
		private _isPlatformBrowserService: IsPlatformBrowserService
	) {
	}

	@HostListener("window:scroll")
	onScroll() {
		if (this._isPlatformBrowserService.getIsPlatformBrowser()) {
			for (let i = this.elements.length - 1; i >= 0; i--) {
				if (this.elements[i].getBoundingClientRect().top < 350) {
					// update the chapter listing current
					this._chapterListingService.setCurrentPosition(i);
					break;
				}
			}
		}
	}

	ngOnChanges() {
		setTimeout(() => {
			this.onScroll();
		}, 300);
	}

	ngOnDestroy() {
		// reset the chapter listing current
		this._chapterListingService.setCurrentPosition(0);
	}
}
