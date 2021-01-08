import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PokeListComponent } from "./poke-list/poke-list.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [PokeListComponent],
  exports: [PokeListComponent],
  imports: [CommonModule, IonicModule],
})
export class ComponentModule {}
