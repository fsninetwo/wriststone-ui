import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import * as fromAuth from "./app.reducer";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(fromAuth.appState)
  ],
  declarations: []
})
export class AppStateModule { }
