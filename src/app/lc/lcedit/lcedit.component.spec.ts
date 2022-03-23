import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LceditComponent } from './lcedit.component';

describe('LceditComponent', () => {
  let component: LceditComponent;
  let fixture: ComponentFixture<LceditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LceditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LceditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
