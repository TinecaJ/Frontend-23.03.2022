import { TestBed } from '@angular/core/testing';

import { RiskcsService } from './riskcs.service';

describe('RiskcsService', () => {
  let service: RiskcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskcsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
