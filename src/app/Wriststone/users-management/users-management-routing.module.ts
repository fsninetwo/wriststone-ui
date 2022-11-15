import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth/auth.guard';
import { AuthConstant } from 'src/app/shared/models/constatnts/page-constands';
import { UsersManagementComponent } from './users-management.component';
import { UsersManangmentEditComponent } from './users-manangment-edit/users-manangment-edit.component';
import { UsersManangmentListComponent } from './users-manangment-list/users-manangment-list.component';

const routes: Routes = [
  { path: '',
    component: UsersManagementComponent,
    canActivate: [AuthGuard],
    data: {
      pageName: AuthConstant.user_PageName,
      availableFor: AuthConstant.readAccess,
      permissionName: AuthConstant.usersManagement_PermissionName,
    },
    children: [
      { path: 'list', component: UsersManangmentListComponent},
      { path: ':id/edit', component: UsersManangmentEditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersManagementRoutingModule { }
