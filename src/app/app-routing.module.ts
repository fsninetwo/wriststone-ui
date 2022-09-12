import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './Wriststone/products/products.component';

const routes: Routes = [
  { path: 'user', loadChildren: () => import('./Wriststone/user/user.module').then(m => m.UserModule)  },
  { path: 'store', component: ProductsComponent },
  { path: '', redirectTo: '/store', pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
