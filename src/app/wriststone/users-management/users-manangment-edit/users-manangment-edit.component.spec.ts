import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { UsersManagementService } from 'src/app/services/users-management.service';

import { UsersManangmentEditComponent } from './users-manangment-edit.component';

class NavigationServiceMock {
  public goToFullRoute(route: string): void {}
}

class UserServiceMock {
  public getUser(id: number) {
    return of({ login: '', email: '', fullname: '', userRole: '', id });
  }
}

class UsersManagementServiceMock {
  public getAllRoles() {
    return of([]);
  }

  public getUser(id: number) {
    return of({ login: '', email: '', fullname: '', userRole: '', id });
  }

  public updateUser(user: any) {
    return of({});
  }
}

describe('UsersManangmentEditComponent', () => {
  let component: UsersManangmentEditComponent;
  let fixture: ComponentFixture<UsersManangmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ UsersManangmentEditComponent ],
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
    fixture = TestBed.createComponent(UsersManangmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
