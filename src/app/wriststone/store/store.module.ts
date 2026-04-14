import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { StoreListComponent } from './store-list/store-list.component';

@NgModule({
  declarations: [
    StoreComponent,
    StoreListComponent,
  ],
  imports: [
    StoreRoutingModule,
  ],
})
export class StorePageModule { }
