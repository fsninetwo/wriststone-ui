import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManangmentEditComponent } from './users-manangment-edit.component';

describe('UsersManangmentEditComponent', () => {
  let component: UsersManangmentEditComponent;
  let fixture: ComponentFixture<UsersManangmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersManangmentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManangmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
