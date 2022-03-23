import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicieseditComponent } from './policiesedit.component';

describe('PolicieseditComponent', () => {
  let component: PolicieseditComponent;
  let fixture: ComponentFixture<PolicieseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicieseditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicieseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
