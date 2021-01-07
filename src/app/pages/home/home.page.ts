import { Component } from "@angular/core";
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(public pokemonService: PokemonService) {
    this.pokemonService.getPokemon();
    this.pokemonService.getPokemonTest();
  }
}
