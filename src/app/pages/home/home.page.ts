import { Component } from "@angular/core";
import { LaunchdarklyService } from "src/app/services/launchdarkly.service";
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(
    public pokemonService: PokemonService,
    public launchDarkly: LaunchdarklyService
  ) {}
}
