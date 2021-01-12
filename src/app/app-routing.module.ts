import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { PokemonInfoGuard } from "./guards/pokemon-info.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },

  {
    path: "poke-info/:pokemonName",
    loadChildren: () =>
      import("./pages/poke-info/poke-info.module").then(
        (m) => m.PokeInfoPageModule
      ),
    canActivate: [PokemonInfoGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
