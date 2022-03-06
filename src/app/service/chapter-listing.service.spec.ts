import { TestBed } from '@angular/core/testing';

import { ChapterListingService } from './chapter-listing.service';

describe('ChapterListingService', () => {
  let service: ChapterListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapterListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
