import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sup1Component } from './sup1.component';

describe('Sup1Component', () => {
  let component: Sup1Component;
  let fixture: ComponentFixture<Sup1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sup1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sup1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
