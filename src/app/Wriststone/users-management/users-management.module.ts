import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersManagementComponent } from './users-management.component';
import { SortDirective } from 'src/app/shared/directives/sort.directive';

@NgModule({
  declarations: [
    UsersManagementComponent,
    SortDirective
  ],
  imports: [
    UsersManagementRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SortDirective,
  ]
})
export class UsersManagementModule { }
