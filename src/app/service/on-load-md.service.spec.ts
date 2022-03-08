import { TestBed } from '@angular/core/testing';

import { OnLoadMdService } from './on-load-md.service';

describe('OnLoadMdService', () => {
  let service: OnLoadMdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnLoadMdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
