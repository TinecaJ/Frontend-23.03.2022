import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sup3Component } from './sup3.component';

describe('Sup3Component', () => {
  let component: Sup3Component;
  let fixture: ComponentFixture<Sup3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sup3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sup3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
