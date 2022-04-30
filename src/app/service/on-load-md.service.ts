import {Injectable, QueryList} from '@angular/core';
import {MarkdownComponent} from 'ngx-markdown';
import {
    IsPlatformBrowserService
} from './is-platform-browser.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnLoadMdService {
  private _h2Elements$ = new BehaviorSubject<Element[]>([]);
  private _queryElements$ = new BehaviorSubject<Element[]>([]);

  constructor(
      private _isPlatformBrowserService: IsPlatformBrowserService
  ) { }

  onLoadMd(md: any, query?: string) {
      (md as QueryList<MarkdownComponent>).forEach((el) => {
          const arr = Array.from(el.element.nativeElement.children);
          let i = 1;
          this._h2Elements$.next([]);
          let queryEls: Element[] = [];
          arr.forEach((child) => {
            if (child.tagName === 'H2') {
              this._h2Elements$.next([...this._h2Elements$.value, child]);
              child.setAttribute('id', `${i}`);
                child.innerHTML = child.innerHTML + `<a class="h2-anchor" name="${i}">✡</a>`;
                if (this._isPlatformBrowserService.getIsPlatformBrowser() && window.innerWidth < 768) {
                  child.setAttribute('style', 'scroll-margin-top: 65px');
              }
              i++;
            }
            if (query) {
              const capQuery = query.charAt(0).toUpperCase() + query.toLowerCase().slice(1);
              const lowerCaseQuery = query.toLowerCase();

              if (child.innerHTML.includes(query)) {
                child.innerHTML = child.innerHTML.split(query).join(`<span class='query'>${query}</span>`);
              }
              if (query !== capQuery && child.innerHTML.includes(capQuery)) {
                child.innerHTML = child.innerHTML.split(capQuery).join(`<span class='query'>${capQuery}</span>`);
              }
              if (query !== lowerCaseQuery && child.innerHTML.includes(lowerCaseQuery)) {
                child.innerHTML = child.innerHTML.split(lowerCaseQuery).join(`<span class='query'>${lowerCaseQuery}</span>`);
              }
              const _queryEls = child.querySelectorAll('span.query');
              if (_queryEls.length > 0) {
                queryEls = [...queryEls, ...Array.prototype.slice.call(_queryEls)]
              }
            }
          });
          this._queryElements$.next(queryEls);
        }
    );
    if (this._isPlatformBrowserService.getIsPlatformBrowser() && window.location.hash) {
      const hash = window.location.hash.split('#')[1];
      setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ block: 'start' });
      });
    }
  }

  getH2Elements(): Observable<Element[]> {
      return this._h2Elements$.asObservable();
  }

  getQueryElements(): Observable<Element[]> {
    return this._queryElements$.asObservable();
  }
}
