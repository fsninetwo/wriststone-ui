import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './Wriststone/products/product/product.component';
import { ProductsComponent } from './Wriststone/products/products.component';
import { FooterComponent } from './Wriststone/footer/footer.component';
import { UserModule } from './Wriststone/user/user.module';
import { UserDetailComponent } from './Wriststone/user/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsComponent,
    FooterComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
