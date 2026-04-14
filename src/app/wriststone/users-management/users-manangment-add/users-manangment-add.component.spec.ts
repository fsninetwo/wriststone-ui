import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { UsersManagementService } from 'src/app/services/users-management.service';

import { UsersManangmentAddComponent } from './users-manangment-add.component';

class NavigationServiceMock {
  public goToFullRoute(route: string): void {}
}

class UserServiceMock {
  public getUser(id: number) {
    return of({});
  }
}

class UsersManagementServiceMock {
  public addUser(user: any) {
    return of({});
  }

  public getAllRoles() {
    return of([]);
  }
}

describe('UsersManangmentAddComponent', () => {
  let component: UsersManangmentAddComponent;
  let fixture: ComponentFixture<UsersManangmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ UsersManangmentAddComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } },
        { provide: NavigationService, useClass: NavigationServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        { provide: UsersManagementService, useClass: UsersManagementServiceMock }
      ]
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
