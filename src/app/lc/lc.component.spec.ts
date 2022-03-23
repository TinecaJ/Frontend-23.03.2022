import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCComponent } from './lc.component';

describe('LCComponent', () => {
  let component: LCComponent;
  let fixture: ComponentFixture<LCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
