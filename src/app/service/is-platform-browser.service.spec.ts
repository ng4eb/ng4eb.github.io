import { TestBed } from '@angular/core/testing';

import { IsPlatformBrowserService } from './is-platform-browser.service';

describe('IsPlatformBrowserService', () => {
  let service: IsPlatformBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsPlatformBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
