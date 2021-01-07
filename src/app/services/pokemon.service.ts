import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Pokemon } from "../models/Pokemon";
import { PokemonListInfo } from "../models/PokemonListInfo";
@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private pokemonListInfo: PokemonListInfo;
  private pokemon: Pokemon;
  constructor(private http: HttpClient) {
    //this.getPokemon();
  }

  async getPokemon() {
    let response = this.http
      .get("https://pokeapi.co/api/v2/pokemon/")
      .subscribe((data) => {
        console.log(data);
        this.pokemonListInfo = PokemonListInfo.fromJson(data);
        console.log(this.pokemonListInfo);
      });

    return this.pokemonListInfo;
  }

  getPokemonTest() {
    let response = this.http
      .get("https://pokeapi.co/api/v2/pokemon/20")
      .subscribe((data) => {
        console.log(data);
        this.pokemon = Pokemon.fromJson(data);
        console.log(this.pokemon);
      });

    return this.pokemonListInfo;
  }
}
