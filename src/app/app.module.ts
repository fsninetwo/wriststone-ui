import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserModule } from './wriststone/user/user.module';
import { FooterComponent } from './wriststone/footer/footer.component';
import { AuthModule } from './wriststone/auth/auth.module';
import { HeaderComponent } from './wriststone/header/header.component';
import { AuthGuard } from './services/auth/auth.guard';
import { UsersManagementModule } from './Wriststone/users-management/users-management.module';
import { InputTextComponent } from './shared/base-input-text/base-input-text.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './core/interceptors/auth-interceptor.service';
import { StorePageModule } from './wriststone/store/store.module';
import { AppStateModule } from './store/app.module';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    InputTextComponent,
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
      },
    }),
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AuthModule,
    StorePageModule,
    HttpClientModule,
    UsersManagementModule,
    AppStateModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
