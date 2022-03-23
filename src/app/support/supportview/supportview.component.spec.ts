import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportviewComponent } from './supportview.component';

describe('SupportviewComponent', () => {
  let component: SupportviewComponent;
  let fixture: ComponentFixture<SupportviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
