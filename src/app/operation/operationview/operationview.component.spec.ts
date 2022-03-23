import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationviewComponent } from './operationview.component';

describe('OperationviewComponent', () => {
  let component: OperationviewComponent;
  let fixture: ComponentFixture<OperationviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
