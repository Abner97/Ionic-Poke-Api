import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { Pokemon } from "src/app/models/Pokemon";
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-poke-info",
  templateUrl: "./poke-info.page.html",
  styleUrls: ["./poke-info.page.scss"],
})
export class PokeInfoPage implements OnInit {
  pokemon: Pokemon;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public pokemonService: PokemonService
  ) {
    this.router.events.subscribe((e: NavigationStart) => {
      try {
        this.pokemon = this.router.getCurrentNavigation().extras
          .state as Pokemon;
      } catch (err) {
        const pokemonName = this.route.snapshot.paramMap.get("pokemonName");
        this.pokemonService.getPokemonWithName(pokemonName).then((pokemon) => {
          this.pokemon = pokemon;
        });
      }

      console.log(this.pokemon);
    });
  }

  ngOnInit() {}
}
