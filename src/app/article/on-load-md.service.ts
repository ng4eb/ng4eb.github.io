import { Injectable, QueryList } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { IsPlatformBrowserService } from '../shared/is-platform-browser.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OnLoadMdService {
    private _h2Elements$ = new BehaviorSubject<Element[]>([]);
    private _queryElements$ = new BehaviorSubject<Element[]>([]);

    constructor(private _isPlatformBrowserService: IsPlatformBrowserService) {}

    onLoadMd(md: any) {
        (md as QueryList<MarkdownComponent>).forEach((el) => {
            const arr = Array.from(el.element.nativeElement.children);
            let i = 1;
            this._h2Elements$.next([]);
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
            });
        });
        if (this._isPlatformBrowserService.getIsPlatformBrowser() && window.location.hash) {
            const hash = window.location.hash.split('#')[1];
            setTimeout(() => {
                document.getElementById(hash)?.scrollIntoView({ block: 'start' });
            });
        }
    }

    onLoadQuery(md: any, query?: string) {
        let queryEls: Element[] = [];
        (md as QueryList<MarkdownComponent>).forEach((el) => {
            const arr = Array.from(el.element.nativeElement.children);
            arr.forEach((child) => {
                const oldQueryEls: Element[] = Array.prototype.slice.call(child.querySelectorAll('span.query'));
                oldQueryEls.forEach((el) => {
                    el.outerHTML = el.innerHTML;
                });
                if (query) {
                    const capQuery = query.charAt(0).toUpperCase() + query.toLowerCase().slice(1);
                    const lowerCaseQuery = query.toLowerCase();

                    if (child.textContent?.includes(query)) {
                        child.innerHTML = child.innerHTML.split(query).join(`<span class='query'>${query}</span>`);
                    }
                    if (query !== capQuery && child.textContent?.includes(capQuery)) {
                        child.innerHTML = child.innerHTML.split(capQuery).join(`<span class='query'>${capQuery}</span>`);
                    }
                    if (query !== lowerCaseQuery && child.textContent?.includes(lowerCaseQuery)) {
                        child.innerHTML = child.innerHTML.split(lowerCaseQuery).join(`<span class='query'>${lowerCaseQuery}</span>`);
                    }
                }
                const _queryEls = child.querySelectorAll('span.query');
                queryEls = [...queryEls, ...Array.prototype.slice.call(_queryEls)];
            });
        });
        this._queryElements$.next(queryEls);
    }

    getH2Elements(): Observable<Element[]> {
        return this._h2Elements$.asObservable();
    }

    getQueryElements(): Observable<Element[]> {
        return this._queryElements$.asObservable();
    }
}
