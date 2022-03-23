import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcviewComponent } from './lcview.component';

describe('LcviewComponent', () => {
  let component: LcviewComponent;
  let fixture: ComponentFixture<LcviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LcviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
