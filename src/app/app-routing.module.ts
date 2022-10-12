import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./wriststone/auth/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./wriststone/user/user.module').then(m => m.UserModule) },
  { path: 'store', loadChildren: () => import('./wriststone/store/store.module').then(m => m.StoreModule) },
  { path: '', redirectTo: '/store', pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
