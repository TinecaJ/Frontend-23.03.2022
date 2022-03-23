import { TestBed } from '@angular/core/testing';

import { LCsService } from './lcs.service';

describe('LCsService', () => {
  let service: LCsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LCsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
