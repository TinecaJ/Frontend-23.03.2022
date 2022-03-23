import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationeditComponent } from './operationedit.component';

describe('OperationeditComponent', () => {
  let component: OperationeditComponent;
  let fixture: ComponentFixture<OperationeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
