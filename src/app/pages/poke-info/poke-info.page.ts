import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
import { Pokemon } from "src/app/models/Pokemon";
import { PokemonService } from "../../services/pokemon.service";
import { LaunchdarklyService } from "src/app/services/launchdarkly.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-poke-info",
  templateUrl: "./poke-info.page.html",
  styleUrls: ["./poke-info.page.scss"],
})
export class PokeInfoPage implements OnInit {
  pokemon: Pokemon;

  private pokemonInfoSubs: Subscription;
  public pokemonInfoStatus: boolean;
  private launcDarklyStatus: boolean;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public pokemonService: PokemonService,
    public launchDarkly: LaunchdarklyService,
    public alertController: AlertController
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

    //Verifico que el servicio esté ok
    this.launchDarkly.checkServiceStatus().then((status) => {
      if (status) {
        console.log("launchdarkly is ok");
        this.launcDarklyStatus = status;
        this.pokemonInfoStatus = this.launchDarkly.checkFlag(
          "pokemon-info",
          true
        );
      } else {
        //Si launchDarkly no está disponible desactivo el componente
        this.pokemonInfoStatus = false;
      }

      if (!this.pokemonInfoStatus) {
        this.showAlert();
      } else {
        console.log("entre");
      }
    });
  }

  showAlert() {
    this.alertController
      .create({
        header: "Anuncio",
        subHeader: "",
        message:
          "Este servicio a sido inhabilitado temporalmente, lamentamos las molestias",
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

  ionViewDidEnter(): void {
    if (this.launcDarklyStatus) {
      this.pokemonInfoSubs = this.launchDarkly
        .getBooleanFlagObservable("pokemon-info")
        .subscribe((enabled) => {
          console.log(enabled);
          this.pokemonInfoStatus = enabled;
          if (!enabled) {
            this.showAlert();
          }
        });
    }
  }

  ionViewDidLeave(): void {
    this.pokemonInfoSubs.unsubscribe();
  }
  ngOnInit() {}
}
