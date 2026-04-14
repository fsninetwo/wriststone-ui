import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AuthInfoService } from 'src/app/services/auth/auth-info.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

import { UserEditComponent } from './user-edit.component';

class NavigationServiceMock {
  public goToFullRoute(route: string): void {}
}

class AuthInfoServiceMock {
  public currentUser = of({ id: '1', email: 'test@example.com' });
}

class UserServiceMock {
  public editUser(data: any) {
    return of({});
  }
}

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [ UserEditComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } },
        { provide: AuthInfoService, useClass: AuthInfoServiceMock },
        { provide: NavigationService, useClass: NavigationServiceMock },
        { provide: UserService, useClass: UserServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
