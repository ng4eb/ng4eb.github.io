import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class IsPlatformBrowserService {
    constructor(@Inject(PLATFORM_ID) private platformId: any) {}

    getIsPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }
}
