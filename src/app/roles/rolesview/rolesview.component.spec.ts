import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesviewComponent } from './rolesview.component';

describe('RolesviewComponent', () => {
  let component: RolesviewComponent;
  let fixture: ComponentFixture<RolesviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
