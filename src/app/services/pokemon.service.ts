import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Pokemon } from "../models/Pokemon";
import { PokemonListInfo } from "../models/PokemonListInfo";
@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private pokemonList: Subject<Array<Pokemon>>;
  private pokemonListUrl: string;

  public pokemonListObs: Observable<Array<Pokemon>>;
  private pokemonListInfo: PokemonListInfo;

  constructor(private http: HttpClient) {
    this.pokemonList = new Subject();
    this.pokemonListObs = this.pokemonList.asObservable();

    this.pokemonListUrl = " https://pokeapi.co/api/v2/pokemon/";
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

  async getPokemonWithName(name: string) {
    let response = await this.http
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .toPromise();
    let pokemon: Pokemon = Pokemon.fromJson(response);
    return pokemon;
  }
}
