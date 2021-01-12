import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationExtras } from "@angular/router";
import {
  AlertController,
  IonInfiniteScroll,
  NavController,
} from "@ionic/angular";

import { Subscription } from "rxjs";
import { Pokemon } from "src/app/models/Pokemon";
import { PokemonService } from "../../services/pokemon.service";
import { LaunchdarklyService } from "src/app/services/launchdarkly.service";

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
  constructor(
    public pokemonService: PokemonService,
    public navCtrl: NavController,
    public luanchDarkly: LaunchdarklyService,
    public alertController: AlertController
  ) {
    this.loading = true;
    console.log(this.loading);

    this.pokemonList = [];

    this.pokemonService.getPokemons().then(() => {
      this.loading = false;
    });
  }

  async loadData(event: any) {
    await this.pokemonService.getPokemons();
    event.target.complete();
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  showAlert(message: string) {
    this.alertController
      .create({
        header: "Anuncio",
        subHeader: "",
        message: message,
        buttons: [
          {
            text: "Ok",
            role: "ok",
            handler: (data) => {
              this.navCtrl.navigateRoot(["/home"], {
                state: {},
                animated: true,
              });
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  goToInfo(pokemon: Pokemon): void {
    this.luanchDarkly.checkServiceStatus().then(() => {
      let canGo = this.luanchDarkly.checkFlag("pokemon-info", true);
      canGo
        ? this.navCtrl.navigateForward(["poke-info", pokemon.name], {
            state: pokemon,
          })
        : this.showAlert("Servicio no disponible");
    });
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
  ionViewDidEnter() {}
  ionViewDidLeave(): void {
    this.subscription.unsubscribe();
  }
}
