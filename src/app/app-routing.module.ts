import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./wriststone/auth/auth.module').then(m => m.AuthModule)  },
  { path: 'user', loadChildren: () => import('./wriststone/user/user.module').then(m => m.UserModule)  },
  { path: '', redirectTo: '/store', pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
