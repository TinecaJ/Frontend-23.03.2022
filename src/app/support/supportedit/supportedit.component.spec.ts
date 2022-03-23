import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupporteditComponent } from './supportedit.component';

describe('SupporteditComponent', () => {
  let component: SupporteditComponent;
  let fixture: ComponentFixture<SupporteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupporteditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupporteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
