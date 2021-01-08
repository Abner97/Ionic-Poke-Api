import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Pokemon } from "../models/Pokemon";
import { PokemonList } from "../models/PokemonList";
import { PokemonListInfo } from "../models/PokemonListInfo";
@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private pokemonList: Subject<Array<Pokemon>>;
  private pokemonListUrl: string;
  private tempPokemonList: Array<Pokemon>;
  public pokemonListObs: Observable<Array<Pokemon>>;
  private pokemonListInfo: PokemonListInfo;
  private pokemon: Pokemon;
  constructor(private http: HttpClient) {
    this.tempPokemonList = [];
    this.pokemonList = new Subject();
    this.pokemonListObs = this.pokemonList.asObservable();

    this.pokemonListUrl =
      " https://pokeapi.co/api/v2/pokemon/?offset=0&limit=60";
  }

  async getPokemons() {
    let response = await this.http.get(this.pokemonListUrl).toPromise();

    let pokemonList: Array<Pokemon> = [];

    this.pokemonListInfo = PokemonListInfo.fromJson(response);
    this.pokemonListUrl = this.pokemonListInfo.next;

    await Promise.all(
      this.pokemonListInfo.results.map(async (pokemonInfo) => {
        let pokemon = await this.getPokemon(pokemonInfo.url);
        pokemonList.push(pokemon);
      })
    ).then(() => {
      this.pokemonList.next(pokemonList);
    });
  }

  async getPokemon(url: string) {
    let response = await this.http.get(url).toPromise();
    let pokemon: Pokemon = Pokemon.fromJson(response);
    return pokemon;
  }
  async getImage(url: string) {
    let response = await this.http.get(url).toPromise();
    this.pokemon = Pokemon.fromJson(response);
    return this.pokemon.sprites.front_default;
  }
}
