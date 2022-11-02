import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth/auth.guard';
import { AuthConstant } from 'src/app/shared/models/constatnts/page-constands';
import { UsersManagementComponent } from './users-management.component';

const routes: Routes = [
  { path: '',
    component: UsersManagementComponent,
    canActivate: [AuthGuard],
    data: {
      pageName: AuthConstant.user_PageName,
      availableFor: AuthConstant.readAccess,
      permissionName: AuthConstant.usersManagement_PermissionName,
    }
    //children: [
    //  { path: ':id/detail', component: UserDetailComponent,},
    //  { path: ':id/edit', component: UserEditComponent },
    //]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersManagementRoutingModule { }
