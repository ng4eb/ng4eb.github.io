import {
	AdvancedSearchService
} from './advanced-search.service';
import {TestBed} from '@angular/core/testing';
import {
	ChapterListingService
} from '../chapter-listing/chapter-listing.service';
import {
	chapterListing
} from '../chapter-listing/chapter-listing';
import {markdowns} from './markdowns';


describe('advanced search', () => {
	let advancedSearchService: AdvancedSearchService,
		chapterListingSpy: any;
	beforeEach(() => {
		chapterListingSpy = jasmine.createSpyObj('ChapterListingService', ['getListing']);
		chapterListingSpy.getListing.and.returnValue(chapterListing);
		TestBed.configureTestingModule({
			providers: [
				AdvancedSearchService,
				{
					provide: ChapterListingService,
					useValue: chapterListingSpy
				}
			]
		})
		advancedSearchService = TestBed.get(AdvancedSearchService);
	});
	it('should return all chapters', () => {
		const result = advancedSearchService.fullSearch('');
		expect(result.length).toBe(Object.keys(markdowns).length);
	});
})
