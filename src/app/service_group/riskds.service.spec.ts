import { TestBed } from '@angular/core/testing';

import { RiskdsService } from './riskds.service';

describe('RiskdsService', () => {
  let service: RiskdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
