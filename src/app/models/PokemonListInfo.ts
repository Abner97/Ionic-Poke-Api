import { PokemonList } from "./PokemonList";

export class PokemonListInfo {
  public constructor(
    readonly count: number,
    readonly next: "string",
    readonly previous: "string",
    readonly results: Array<PokemonList>
  ) {}

  static fromJson = (json: any): PokemonListInfo => {
    const castResponseModel: PokemonListInfo = new PokemonListInfo(
      json.count,
      json.next,
      json.previous,
      json.results
    );
    return castResponseModel;
  };
}
