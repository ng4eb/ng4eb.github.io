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
  private _h2Elements = new BehaviorSubject<Element[]>([]);

  constructor(
      private _isPlatformBrowserService: IsPlatformBrowserService
  ) { }

  onLoadMd(md: any) {
      (md as QueryList<MarkdownComponent>).forEach((el) => {
          const arr = Array.from(el.element.nativeElement.children);
          let i = 1;
          this._h2Elements.next([]);
          arr.forEach((child) => {
            if (child.tagName === 'H2') {
              this._h2Elements.next([...this._h2Elements.value, child]);
              child.setAttribute('id', `${i}`);
                child.innerHTML = child.innerHTML + `<a class="h2-anchor" name="${i}">✡</a>`;
                if (this._isPlatformBrowserService.getIsPlatformBrowser() && window.innerWidth < 768) {
                  child.setAttribute('style', 'scroll-margin-top: 65px');
              }
              i++;
            }
          });
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
      return this._h2Elements;
  }
}
