import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _isOverlayOpen$ = new BehaviorSubject(false);
  private _isAdvancedSearchOpen$ = new BehaviorSubject(false);
  private _isSidebarOpen$ = new BehaviorSubject(true);
  private _darkTheme$ = new BehaviorSubject(localStorage.getItem('darkTheme') === 'true' ? true : false);


  constructor() { }

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
    localStorage.setItem('darkTheme', !this._darkTheme$.value ? 'true' : 'false');
    this._darkTheme$.next(!this._darkTheme$.value);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
