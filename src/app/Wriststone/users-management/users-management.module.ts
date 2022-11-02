import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersManagementComponent } from './users-management.component';

@NgModule({
  declarations: [
    UsersManagementComponent
  ],
  imports: [
    UsersManagementRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
})
export class UsersManagementModule { }
