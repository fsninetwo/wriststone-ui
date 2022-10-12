import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';

@NgModule({
  declarations: [
    StoreComponent,
  ],
  imports: [
    StoreRoutingModule,
  ],
})
export class StoreModule { }
