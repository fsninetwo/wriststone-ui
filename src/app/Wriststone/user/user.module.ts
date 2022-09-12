import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { UserHeaderComponent } from './user-header/user-header.component';

@NgModule({
  declarations: [
    UserComponent,
    UserHeaderComponent
  ],
  imports: [
     UserRoutingModule,
  ],
})
export class UserModule { }
