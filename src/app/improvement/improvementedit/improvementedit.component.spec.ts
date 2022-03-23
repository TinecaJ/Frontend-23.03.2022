import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovementeditComponent } from './improvementedit.component';

describe('ImprovementeditComponent', () => {
  let component: ImprovementeditComponent;
  let fixture: ComponentFixture<ImprovementeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprovementeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprovementeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
