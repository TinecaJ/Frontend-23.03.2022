import { TestBed } from '@angular/core/testing';

import { RiskasService } from './riskas.service';

describe('RiskasService', () => {
  let service: RiskasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
