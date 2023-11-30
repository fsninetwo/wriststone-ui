import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationExtras, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { UsersManagementService } from 'src/app/services/users-management.service';
import { SortDirective } from 'src/app/shared/directives/sort.directive';
import {
  UserRole,
  UsersManagementDto,
} from 'src/app/shared/models/user-models';

import { UsersManangmentListComponent } from './users-manangment-list.component';

const users: UsersManagementDto[] = [
  {
    id: 1,
    login: 'admin',
    email: 'uber',
    userRole: UserRole.Administrator,
  },
  {
    id: 2,
    login: 'test',
    email: 'test',
    userRole: UserRole.User,
  },
];

export class NavigationServiceMock {
  public goToFullRoute(route: string, options?: NavigationExtras): void {}
}

export class UsersManagementMock {
  public removeUser(id: number) {}

  public getAllUsers(): Observable<UsersManagementDto[]> {
    return of(users);
  }
}

describe('UsersManangmentListComponent', () => {
  let component: UsersManangmentListComponent;
  let fixture: ComponentFixture<UsersManangmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersManangmentListComponent, SortDirective],
      providers: [
        { provide: NavigationService, useClass: NavigationServiceMock },
        { provide: UsersManagementService, useClass: UsersManagementMock}
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(UsersManangmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort data by user id', () => {
    const sortByIdDirectiveElement = fixture.debugElement.query(
      By.css('#id')
    ).nativeElement;
    expect(sortByIdDirectiveElement).toBeTruthy();
    sortByIdDirectiveElement.click();

    const dataOrderElement = fixture.debugElement.query(
      By.css('#id')
    ).nativeElement;

    expect(dataOrderElement.getAttribute('data-order')).toEqual('asc');
    expect(component.filteredUsers[0].id).toEqual(2);
    expect(component.filteredUsers[1].id).toEqual(1);
  });

  it('should sort data by user login', () => {
    const sortByIdDirectiveElement = fixture.debugElement.query(
      By.css('#login')
    ).nativeElement;

    expect(sortByIdDirectiveElement).toBeTruthy();
    sortByIdDirectiveElement.click();

    const dataOrderElement = fixture.debugElement.query(
      By.css('#login')
    ).nativeElement;

    expect(dataOrderElement.getAttribute('data-order')).toEqual('asc');
    expect(component.filteredUsers[0].login).toEqual('test');
    expect(component.filteredUsers[1].login).toEqual('admin');
  });

  it('should sort data by user email', () => {
    const sortByIdDirectiveElement = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;

    expect(sortByIdDirectiveElement).toBeTruthy();
    sortByIdDirectiveElement.click();

    const dataOrderElement = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;

    expect(dataOrderElement.getAttribute('data-order')).toEqual('asc');
    expect(component.filteredUsers[0].email).toEqual('uber');
    expect(component.filteredUsers[1].email).toEqual('test');
  });

  it('should sort data by user role', () => {
    const sortByIdDirectiveElement = fixture.debugElement.query(
      By.css('#userRole')
    ).nativeElement;
    expect(sortByIdDirectiveElement).toBeTruthy();
    sortByIdDirectiveElement.click();

    const dataOrderElement = fixture.debugElement.query(
      By.css('#userRole')
    ).nativeElement;

    expect(dataOrderElement.getAttribute('data-order')).toEqual('asc');
    expect(component.filteredUsers[0].userRole).toEqual('User');
    expect(component.filteredUsers[1].userRole).toEqual('Administrator');
  });

  it('should sort data by user id desc', () => {
    const sortByIdDirectiveElement = fixture.debugElement.query(
      By.css('#id')
    ).nativeElement;
    expect(sortByIdDirectiveElement).toBeTruthy();
    sortByIdDirectiveElement.click();
    sortByIdDirectiveElement.click();

    const dataOrderElement = fixture.debugElement.query(
      By.css('#id')
    ).nativeElement;

    expect(dataOrderElement.getAttribute('data-order')).toEqual('desc');
    expect(component.filteredUsers[0].id).toEqual(1);
    expect(component.filteredUsers[1].id).toEqual(2);
  });

  it('should sort data by user login desc', () => {
    const sortByIdDirectiveElement = fixture.debugElement.query(
      By.css('#login')
    ).nativeElement;
    expect(sortByIdDirectiveElement).toBeTruthy();
    sortByIdDirectiveElement.click();
    sortByIdDirectiveElement.click();

    const dataOrderElement = fixture.debugElement.query(
      By.css('#login')
    ).nativeElement;

    expect(dataOrderElement.getAttribute('data-order')).toEqual('desc');
    expect(component.filteredUsers[0].login).toEqual('admin');
    expect(component.filteredUsers[1].login).toEqual('test');
  });

  it('should sort data by user email desc', () => {
    const sortByIdDirectiveElement = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;
    expect(sortByIdDirectiveElement).toBeTruthy();
    sortByIdDirectiveElement.click();
    sortByIdDirectiveElement.click();

    const dataOrderElement = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;

    expect(dataOrderElement.getAttribute('data-order')).toEqual('desc');
    expect(component.filteredUsers[0].email).toEqual('test');
    expect(component.filteredUsers[1].email).toEqual('uber');
  });

  it('should sort data by user role desc', () => {
    const sortByIdDirectiveElement = fixture.debugElement.query(
      By.css('#userRole')
    ).nativeElement;
    expect(sortByIdDirectiveElement).toBeTruthy();
    sortByIdDirectiveElement.click();
    sortByIdDirectiveElement.click();

    const dataOrderElement = fixture.debugElement.query(
      By.css('#userRole')
    ).nativeElement;

    expect(dataOrderElement.getAttribute('data-order')).toEqual('desc');
    expect(component.filteredUsers[0].userRole).toEqual('Administrator');
    expect(component.filteredUsers[1].userRole).toEqual('User');
  });

  it("should call goToAddUser when clicked", () => {
    spyOn(component["navigationService"], "goToFullRoute");
    fixture.detectChanges();

    component.goToAddUser();
    expect(component["navigationService"].goToFullRoute).toHaveBeenCalledWith("users/add");
  });

  it("should call goToAddUser when clicked", () => {
    spyOn(component["navigationService"], "goToFullRoute");
    fixture.detectChanges();

    component.goToEditUser(1);
    expect(component["navigationService"].goToFullRoute).toHaveBeenCalledWith(`users/${1}/edit`);
  });

  it("should call goToAddUser when clicked", () => {
    spyOn(component["navigationService"], "goToFullRoute");
    fixture.detectChanges();

    component.goToEditUser(1);
    expect(component["navigationService"].goToFullRoute).toHaveBeenCalledWith(`users/${1}/edit`);
  });

  it("remove user and return valid response", () => {
    const usersManagementDelete = spyOn(component["usersManagementService"], "removeUser").and.returnValue(of());
    spyOn(component["navigationService"], "goToFullRoute");
    component.removeUser(3);

    expect(usersManagementDelete).toHaveBeenCalledWith(3);
    expect(component.users).toEqual(users);
    expect(component.filteredUsers).toEqual(users);
  });
});
