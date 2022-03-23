import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sup2Component } from './sup2.component';

describe('Sup2Component', () => {
  let component: Sup2Component;
  let fixture: ComponentFixture<Sup2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sup2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
