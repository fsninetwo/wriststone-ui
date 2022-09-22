import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AuthComponent, LoginComponent, SignupComponent
  ],
  imports: [
     AuthRoutingModule, ReactiveFormsModule, CommonModule
  ],
})
export class AuthModule { }
