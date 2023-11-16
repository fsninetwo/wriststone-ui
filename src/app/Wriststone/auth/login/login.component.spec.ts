import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { AuthInfoService } from 'src/app/services/auth/auth-info.service';
import { NavigationService } from 'src/app/services/navigation.service';

import { LoginComponent } from './login.component';

export class NavigationServiceMock {

}

export class AuthInfoServiceMock {

}

export class AuthServiceMock {

}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [],
      providers: [
        { provide: NavigationService, useClass: NavigationServiceMock },
        { provide: AuthInfoService, useClass: AuthInfoServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
