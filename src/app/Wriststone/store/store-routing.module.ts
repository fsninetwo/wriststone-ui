import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreComponent } from './store.component';

const routes: Routes = [
  { path: '', component: StoreComponent, children: [
    { path: 'list', component: StoreListComponent },
    { path: ':id', component: CategoryComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
