import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesviewComponent } from './policiesview.component';

describe('PoliciesviewComponent', () => {
  let component: PoliciesviewComponent;
  let fixture: ComponentFixture<PoliciesviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliciesviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
