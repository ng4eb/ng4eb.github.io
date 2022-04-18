import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnInit,
	ViewChild,
} from '@angular/core';
import {
	ChapterListingService
} from '../../../service/chapter-listing/chapter-listing.service';
import {
	LayoutService
} from '../../../service/layout.service';
import {
	IChapter
} from '../../../service/chapter-listing/chapter-listing';

class AccordionEl {
	private summary: HTMLElement | null;
	private content: HTMLOListElement | null;
	private animation: any = null;
	private isClosing = false;
	private isExpanding = false;

	constructor(private el: HTMLDetailsElement) {
		this.summary = el.querySelector('summary');
		this.content = el.querySelector('.chapter-listing__parts');
		this.summary?.addEventListener('click', (e) => this.onClick(e));
	}

	onClick(e: Event) {
		e.preventDefault();
		this.el.style.overflow = 'hidden';
		if (this.isClosing || !this.el.open) {
			this.open();
		} else if (this.isExpanding || this.el.open) {
			this.shrink();
		}
	}

	shrink() {
		this.isClosing = true;
		const startHeight = `${this.el.offsetHeight}px`;
		let endHeightNum = this.summary?.offsetHeight || 0;
		endHeightNum += 8;
		const endHeight = `${endHeightNum}px`;

		if (this.animation) this.animation.cancel();

		this.animation = this.el.animate({
			height: [startHeight, endHeight]
		}, {
			duration: 300,
			easing: 'ease-in-out'
		});

		this.animation.onfinish = () => this.onAnimationFinish(false);
		this.animation.oncancel = () => this.isClosing = false;
	}

	open() {
		this.el.style.height = `${this.el.offsetHeight}px`;
		this.el.open = true;
		window.requestAnimationFrame(() => this.expand());
	}

	expand() {
		this.isExpanding = true;
		const startHeight = `${this.el.offsetHeight}px`;
		let endHeightNum = this.summary?.offsetHeight || 0;
		if (this.content?.offsetHeight) endHeightNum += this.content?.offsetHeight;
		const endHeight = `${endHeightNum}px`;

		if (this.animation) this.animation.cancel();

		this.animation = this.el.animate({
			height: [startHeight, endHeight]
		}, {
			duration: 400,
			easing: 'ease-out'
		});

		this.animation.onfinish = () => this.onAnimationFinish(true);
		this.animation.oncancel = () => this.isExpanding = false;
	}

	onAnimationFinish(open: boolean) {
		this.el.open = open;
		this.animation = null;
		this.isClosing = false;
		this.isExpanding = false;
		this.el.style.height = this.el.style.overflow = '';
	}
}

@Component({
	selector: 'app-accordion',
	templateUrl: './accordion.component.html',
	styleUrls: ['./accordion.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent implements OnInit, AfterViewInit {
	@ViewChild('details') details!: ElementRef;
	@Input() titleMatched!: (title: string) => boolean;
	@Input() chapter!: IChapter;
	@Input() i!: number;
	@Input() url!: string;
	chapterListing = this._chapterListingService.getListing();
	toExpand$ = this._chapterListingService.getToExpand$();
	currentPosition$ = this._chapterListingService.getCurrentPosition$();

	constructor(
		private _chapterListingService: ChapterListingService,
		private _layoutService: LayoutService,
	) {
	}

	onClickHashTagLink(hash: string) {
		this._layoutService.onClickHashTagLink(hash);
	}

	scrollToTop() {
		this._layoutService.scrollToTop();
	}

	ngOnInit(): void {
	}

	ngAfterViewInit() {
		new AccordionEl(this.details.nativeElement);
	}

}
