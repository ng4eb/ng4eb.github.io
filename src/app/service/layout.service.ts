import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {
	IsPlatformBrowserService
} from './is-platform-browser.service';

@Injectable({
	providedIn: 'root'
})
export class LayoutService {
	private _isPlatformBrowser = this._isPlateFormBrowserService.getIsPlatformBrowser();
	private _isOverlayOpen$ = new BehaviorSubject(false);
	private _isAdvancedSearchOpen$ = new BehaviorSubject(false);
	private _isSidebarOpen$ = new BehaviorSubject(true);
	private _darkTheme$ = new BehaviorSubject(this._isPlatformBrowser && localStorage.getItem('darkTheme') === 'true' ? true : false);


	constructor(private _isPlateFormBrowserService: IsPlatformBrowserService) {
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

	scrollToTop() {
		if (this._isPlatformBrowser) {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}
	}
}
