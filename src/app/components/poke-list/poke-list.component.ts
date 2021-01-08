import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";

import { Subscription } from "rxjs";
import { Pokemon } from "src/app/models/Pokemon";
import { PokemonList } from "src/app/models/PokemonList";
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-poke-list",
  templateUrl: "./poke-list.component.html",
  styleUrls: ["./poke-list.component.scss"],
})
export class PokeListComponent implements OnInit {
  subscription: Subscription;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public pokemonList: Array<Pokemon>;
  loading: boolean;
  constructor(public pokemonService: PokemonService) {
    this.loading = true;
    console.log(this.loading);

    this.pokemonList = [];

    this.pokemonService.getPokemons().then(() => {
      this.loading = false;
    });
  }

  async loadData(event: any) {
    await this.pokemonService.getPokemons();
    console.log(this.pokemonList);
    event.target.complete();
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async getPokeImage(url: string) {
    return this.pokemonService.getImage(url);
  }

  ngOnInit() {
    this.subscription = this.pokemonService.pokemonListObs.subscribe(
      (pokemons) => {
        pokemons.map((pokemon) => {
          this.pokemonList.push(pokemon);
          console.log(this.pokemonList);
        });
      }
    );
  }
}
