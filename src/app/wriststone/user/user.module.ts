import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserRoutingModule } from './user-routing.module';

import { UserHeaderComponent } from './user-header/user-header.component';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserComponent,
    UserHeaderComponent,
    UserEditComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
})
export class UserModule { }
