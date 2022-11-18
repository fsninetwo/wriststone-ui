import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersManagementComponent } from './users-management.component';
import { SortDirective } from 'src/app/shared/directives/sort.directive';
import { UsersManangmentListComponent } from './users-manangment-list/users-manangment-list.component';
import { UsersManangmentEditComponent } from './users-manangment-edit/users-manangment-edit.component';
import { UsersManangmentAddComponent } from './users-manangment-add/users-manangment-add.component';

@NgModule({
  declarations: [
    UsersManagementComponent,
    SortDirective,
    UsersManangmentListComponent,
    UsersManangmentEditComponent,
    UsersManangmentAddComponent
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
