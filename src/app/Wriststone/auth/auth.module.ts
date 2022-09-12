import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
     AuthRoutingModule,
  ],
})
export class AuthModule { }
