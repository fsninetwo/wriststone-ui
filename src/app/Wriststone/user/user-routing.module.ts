import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth/auth.guard';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent , children: [
    { path: ':id', component: UserDetailComponent },
    { path: ':id/edit', component: UserEditComponent, canActivate: [AuthGuard] },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
