import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PokeListComponent } from "./poke-list/poke-list.component";
import { IonicModule } from "@ionic/angular";
import { FullInfoComponent } from "./full-info/full-info.component";

@NgModule({
  declarations: [PokeListComponent, FullInfoComponent],
  exports: [PokeListComponent, FullInfoComponent],
  imports: [CommonModule, IonicModule],
})
export class ComponentModule {}
