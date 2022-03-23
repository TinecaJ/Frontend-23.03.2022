import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sup4Component } from './sup4.component';

describe('Sup4Component', () => {
  let component: Sup4Component;
  let fixture: ComponentFixture<Sup4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sup4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sup4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
