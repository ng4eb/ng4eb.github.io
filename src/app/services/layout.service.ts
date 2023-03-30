import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {
	IsPlatformBrowserService
} from './is-platform-browser.service';

@Injectable({
	providedIn: 'root'
})
export class LayoutService {
	private _isPlatformBrowser = this._isPlatformBrowserService.getIsPlatformBrowser();
	private _isOverlayOpen$ = new BehaviorSubject(false);
	private _isAdvancedSearchOpen$ = new BehaviorSubject(false);
	private _isSidebarOpen$ = new BehaviorSubject(true);
	private _isMenuOpen$ = new BehaviorSubject(false);
	private _isSliding$ = new BehaviorSubject(false);
	private _darkTheme$ = new BehaviorSubject(this._isPlatformBrowser && localStorage.getItem('darkTheme') === 'true');
	private slidedDistance$ = new BehaviorSubject(0);


	constructor(private _isPlatformBrowserService: IsPlatformBrowserService) {
	}

	detectSliding(movement: number) {
		const currDist = this.slidedDistance$.getValue();
		if (currDist < 315 && currDist > -315) {
			this.slidedDistance$.next(currDist + movement);
		}
	}

	getSlidingDistance$(): Observable<number> {
		return this.slidedDistance$;
	}

	resetSlidingDistance() {
		this.slidedDistance$.next(0);
	}

	getIsSidebarOpen$(): Observable<boolean> {
		return this._isSidebarOpen$;
	}

	toggleSidebarOpen() {
		this._isSidebarOpen$.next(!this._isSidebarOpen$.value);
	}

	getIsOverlayOpen$(): Observable<boolean> {
		return this._isOverlayOpen$;
	}

	setOverlayOpen(value: boolean) {
		this._isOverlayOpen$.next(value);
	}

	getIsMenuOpen(): boolean {
		return this._isMenuOpen$.getValue();
	}

	getIsMenuOpen$(): Observable<boolean> {
		return this._isMenuOpen$;
	}

	setMenuOpen(value: boolean) {
		this._isMenuOpen$.next(value);
	}

	toggleMenuOpen() {
		this.setMenuOpen(!this._isMenuOpen$.value);
	}

	getIsSliding$(): Observable<boolean> {
		return this._isSliding$;
	}

	setSliding(value: boolean) {
		this._isSliding$.next(value);
	}

	getIsSliding(): boolean {
		return this._isSliding$.getValue();
	}

	getIsAdvacnedSearchOpen$(): Observable<boolean> {
		return this._isAdvancedSearchOpen$;
	}

	setIsAdvancedSearchOpen(value: boolean) {
		this._isAdvancedSearchOpen$.next(value);
		this.setOverlayOpen(value);
	}

	getIsDarkTheme$(): Observable<boolean> {
		return this._darkTheme$;
	}

	toggleTheme() {
		if (this._isPlatformBrowser) {
			localStorage.setItem('darkTheme', !this._darkTheme$.value ? 'true' : 'false');
			this._darkTheme$.next(!this._darkTheme$.value);
		}
	}

	scrollToTop(isSmooth = true) {
		if (this._isPlatformBrowser) {
			window.scrollTo({
				top: 0,
				behavior: isSmooth ? 'smooth' : 'auto'
			});
		}
	}

	onClickHashTagLink(hash: string) {
		setTimeout(() => {
			if (this._isPlatformBrowserService.getIsPlatformBrowser()) {
				document.getElementById(hash)?.scrollIntoView();
			}
		}, 100)
	}
}
