import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserModule } from './wriststone/user/user.module';
import { FooterComponent } from './wriststone/footer/footer.component';
import { AuthModule } from './wriststone/auth/auth.module';
import { HeaderComponent } from './wriststone/header/header.component';
import { StoreModule } from './wriststone/store/store.module';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { UsersManagementModule } from './Wriststone/users-management/users-management.module';
import { InputTextComponent } from './shared/base-input-text/base-input-text.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    InputTextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AuthModule,
    StoreModule,
    HttpClientModule,
    UsersManagementModule
  ],
  providers: [AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
