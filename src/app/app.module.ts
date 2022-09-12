import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './wriststone/user/user.module';
import { FooterComponent } from './wriststone/footer/footer.component';
import { AuthModule } from './wriststone/auth/auth.module';
import { StoreComponent } from './Wriststone/store/store.component';
import { CategoryComponent } from './Wriststone/store/category/category.component';
import { ItemComponent } from './Wriststone/store/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    StoreComponent,
    CategoryComponent,
    ItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
