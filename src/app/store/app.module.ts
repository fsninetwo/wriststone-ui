import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { effects } from "./app.effects";
import * as fromAuth from "./app.reducer";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(fromAuth.appState),
    EffectsModule.forRoot(effects)
  ],
  declarations: []
})
export class AppStateModule { }
