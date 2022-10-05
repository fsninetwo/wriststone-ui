import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserModule } from './wriststone/user/user.module';
import { FooterComponent } from './wriststone/footer/footer.component';
import { AuthModule } from './wriststone/auth/auth.module';
import { HeaderComponent } from './wriststone/header/header.component';
import { StoreModule } from './wriststone/store/store.module';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    UserModule, AuthModule,
    StoreModule, HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
