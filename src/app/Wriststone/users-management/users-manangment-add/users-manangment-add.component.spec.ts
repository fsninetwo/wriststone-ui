import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManangmentAddComponent } from './users-manangment-add.component';

describe('UsersManangmentAddComponent', () => {
  let component: UsersManangmentAddComponent;
  let fixture: ComponentFixture<UsersManangmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersManangmentAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManangmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
