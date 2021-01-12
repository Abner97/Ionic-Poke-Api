import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PokeInfoPage } from "./poke-info.page";

const routes: Routes = [
  {
    path: "",
    component: PokeInfoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokeInfoPageRoutingModule {}
