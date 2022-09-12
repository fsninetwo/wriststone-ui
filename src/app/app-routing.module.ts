import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Wriststone/login/login/login.component';
import { LogoutComponent } from './Wriststone/login/logout/logout.component';
import { SignupComponent } from './Wriststone/login/signup/signup.component';
import { ProductsComponent } from './Wriststone/products/products.component';
import { ProfileComponent } from './Wriststone/profile/profile.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
