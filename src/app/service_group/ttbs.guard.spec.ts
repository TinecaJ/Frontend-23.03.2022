import { TestBed } from '@angular/core/testing';

import { TTBSGuard } from './ttbs.guard';

describe('TTBSGuard', () => {
  let guard: TTBSGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TTBSGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
