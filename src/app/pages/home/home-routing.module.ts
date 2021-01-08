import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePage } from "./home.page";

const routes: Routes = [
  {
    path: "",
    component: HomePage,
  },
  {
    path: "poke-info/:pokemonName",
    loadChildren: () =>
      import("../../pages/poke-info/poke-info.module").then(
        (m) => m.PokeInfoPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
