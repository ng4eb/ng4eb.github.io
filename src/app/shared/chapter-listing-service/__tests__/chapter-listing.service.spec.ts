import { ChapterListingService } from '../chapter-listing.service';
import { TestBed } from '@angular/core/testing';
import { IsPlatformBrowserService } from '../../is-platform-browser.service';
import { chapterListing } from '../chapter-listing';

describe('chapter listing service', () => {
    let chapterListingService: ChapterListingService;
    let isPlatformBrowserSpy: any;
    beforeEach(() => {
        isPlatformBrowserSpy = jasmine.createSpyObj('IsPlatformBrowserService', ['getIsPlatformBrowser']);
        TestBed.configureTestingModule({
            providers: [
                ChapterListingService,
                {
                    provide: IsPlatformBrowserService,
                    useValue: isPlatformBrowserSpy
                }
            ]
        });
        chapterListingService = TestBed.get(ChapterListingService);
    });

    it('should return chapter listing', () => {
        const listing = chapterListingService.getListing();
        expect(listing).toBe(chapterListing);
    });

    it('should return chapter listing with empty filter', () => {
        const listing = chapterListingService.getFilteredListing('');
        expect(listing).toEqual(chapterListing);
    });

    it('should return no previous link and a next link at ch1p1', () => {
        const navigation = chapterListingService.getNavigation('/book/ch1/p1');
        expect(navigation.prev.path).toBe('');
        expect(navigation.next.path).toBe('/book/ch1/p2');
    });
});
