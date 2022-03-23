import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContexteditComponent } from './contextedit.component';

describe('ContexteditComponent', () => {
  let component: ContexteditComponent;
  let fixture: ComponentFixture<ContexteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContexteditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContexteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
