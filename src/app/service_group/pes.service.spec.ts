import { TestBed } from '@angular/core/testing';

import { PEsService } from './pes.service';

describe('PEsService', () => {
  let service: PEsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PEsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
