import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovementviewComponent } from './improvementview.component';

describe('ImprovementviewComponent', () => {
  let component: ImprovementviewComponent;
  let fixture: ComponentFixture<ImprovementviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprovementviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprovementviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
