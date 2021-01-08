import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PokeInfoPageRoutingModule } from "./poke-info-routing.module";

import { PokeInfoPage } from "./poke-info.page";
import { ComponentModule } from "src/app/components/component.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokeInfoPageRoutingModule,
    ComponentModule,
  ],
  declarations: [PokeInfoPage],
})
export class PokeInfoPageModule {}
