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
export class PokeInfoPage  {
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
      //Obtenemos la info de pokemon por ruta para ahorrar ancho de banda
      try {
        this.pokemon = this.router.getCurrentNavigation().extras
          .state as Pokemon;
      } catch (err) {
        //cuando se hace refresh se consulta la Api para no perder la info
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
        //Guardo el estado de mi feature
        this.pokemonInfoStatus = this.launchDarkly.checkFlag(
          "pokemon-info",
          true
        );
      } else {
        //Si launchDarkly no está disponible desactivo el componente
        this.pokemonInfoStatus = false;
      }

      //Se activa un alert si el feature está off
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
    //Si el servicio está ok empezamos a escuchar por cambios en nuestra flag al suscribirnos a un observable
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
    //Desuscripción al salir de la pantalla para ahorrar memoria
    this.pokemonInfoSubs.unsubscribe();
  }
 
}
