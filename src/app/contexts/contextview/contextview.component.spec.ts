import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextviewComponent } from './contextview.component';

describe('ContextviewComponent', () => {
  let component: ContextviewComponent;
  let fixture: ComponentFixture<ContextviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
