import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationExtras, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { UsersManagementService } from 'src/app/services/users-management.service';
import { SortDirective } from 'src/app/shared/directives/sort.directive';
import { UserRole, UsersManagementDto } from 'src/app/shared/models/user-models';

import { UsersManangmentListComponent } from './users-manangment-list.component';

const users: UsersManagementDto[] = [{
  id: 1,
  login: "test",
  email: "test",
  userRole: UserRole.Administrator,
}];

export class NavigationServiceMock {
  public goToFullRoute(route: string, options?: NavigationExtras): void {
  }
}

export class UsersManagementMock {
  public removeUser(id: number) {

  }

  public getAllUsers(): Observable<UsersManagementDto[]> {
    return of(users);
  }
}


describe('UsersManangmentListComponent', () => {
  let component: UsersManangmentListComponent;
  let fixture: ComponentFixture<UsersManangmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersManangmentListComponent, SortDirective ],
      providers: [
        { provide: NavigationService, useClass: NavigationServiceMock },
        { provide: UsersManagementService, useClass: UsersManagementMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(UsersManangmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
