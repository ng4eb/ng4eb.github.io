import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	OnInit,
} from '@angular/core';
import {LayoutService} from '../../service/layout.service';
import {
	IsPlatformBrowserService
} from '../../service/is-platform-browser.service';
import {
	filter,
	fromEvent,
	Observable,
	Subscription,
	switchMap,
	takeUntil
} from 'rxjs';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
	isSidebarOpen$ = this._layoutService.getIsSidebarOpen$();
	isOverlayOpen$ = this._layoutService.getIsOverlayOpen$();
	isAdvancedSearchOpen$ = this._layoutService.getIsAdvacnedSearchOpen$();
	isMenuOpen$ = this._layoutService.getIsMenuOpen$();
	touchend$!: Observable<any>;
	touchstart$!: Observable<any>;
	touchmove$!: Observable<any>;
	mousehold$!: Observable<any>;
	isFirstMove!: boolean;
	isSliding$ = this._layoutService.getIsSliding$();
	smoothScore = 0;
	x!: number;
	y!: number;
	_sub!: Subscription;

	constructor(
		private _layoutService: LayoutService,
		private _isPlatformBrowserService: IsPlatformBrowserService,
		private _el: ElementRef
	) {
	}

	closeOverlay() {
		this._layoutService.setIsAdvancedSearchOpen(false);
	}

	closeMenu() {
		this._layoutService.setMenuOpen(false);
	}

	detectXMovement(x: number) {
		const diff = x - this.x;
		// if there is a difference between the two points
		if (diff !== 0) {
			this._layoutService.detectSliding(diff);
		}
	}

	unsub() {
		if (this._sub) {
			this._sub.unsubscribe();
		}
	}

	register() {
		this.mousehold$ = this.touchstart$
			.pipe(
				switchMap(() => this.touchmove$),
				takeUntil(this.touchend$)
			);

		this._sub = this.mousehold$
			.pipe(filter((e) =>
				e.touches[0].target.tagName !== 'PRE' &&
				e.touches[0].target.tagName !== 'CODE'
			))
			.subscribe((e) => {
				if (
					this.isFirstMove &&
					window.getSelection()?.toString() === '' &&
					Math.abs(this.y - e.touches[0].clientY) < 2.5
				) {
					this._layoutService.setSliding(true);
					this.detectXMovement(e.touches[0].clientX);
				} else if (
					!this.isFirstMove && this._layoutService.getIsSliding()
					&& window.getSelection()?.toString() === ''
				) {
					if (Math.abs(this.y - e.touches[0].clientY) < 5) {
						this.smoothScore+=1.5;
						this.detectXMovement(e.touches[0].clientX);
					} else if (this.smoothScore >= 1) {
						this.smoothScore--;
						this.detectXMovement(e.touches[0].clientX);
					} else {
						this._layoutService.setSliding(false);
						this.smoothScore = 0;
					}
				}
				this.x = e.touches[0].clientX;
				this.y = e.touches[0].clientY;
				this.isFirstMove = false;
			})
	}

	ngOnInit(): void {
		if (this._isPlatformBrowserService.getIsPlatformBrowser() && window.innerWidth < 768) {
			this.touchstart$ = fromEvent(this._el.nativeElement, 'touchstart');
			this.touchstart$.subscribe((e) => {
				this.x = e.touches[0].clientX;
				this.y = e.touches[0].clientY;
				this.isFirstMove = true;
				this._layoutService.resetSlidingDistance();
			})
			this.touchmove$ = fromEvent(this._el.nativeElement, 'touchmove');
			this.touchend$ = fromEvent(this._el.nativeElement, 'touchend');

			this.touchend$.subscribe(() => {
				this.unsub();
				this.register();
				this._layoutService.setSliding(false);
				this._layoutService.resetSlidingDistance();
				this.smoothScore = 0;
			});

			this.register();
		}
	}

}
