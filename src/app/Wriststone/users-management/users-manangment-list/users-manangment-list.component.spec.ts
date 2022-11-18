import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManangmentListComponent } from './users-manangment-list.component';

describe('UsersManangmentListComponent', () => {
  let component: UsersManangmentListComponent;
  let fixture: ComponentFixture<UsersManangmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersManangmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManangmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
