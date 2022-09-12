import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './Wriststone/profile/profile.component';
import { ProductComponent } from './Wriststone/products/product/product.component';
import { ProductsComponent } from './Wriststone/products/products.component';
import { LoginComponent } from './Wriststone/login/login/login.component';
import { LogoutComponent } from './Wriststone/login/logout/logout.component';
import { SignupComponent } from './Wriststone/login/signup/signup.component';
import { FooterComponent } from './Wriststone/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ProductComponent,
    ProductsComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
