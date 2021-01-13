import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { LaunchdarklyService } from "../services/launchdarkly.service";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class PokemonInfoGuard implements CanActivate {
  private canAccess: boolean;
  constructor(
    public launchDarkly: LaunchdarklyService,
    public navCtrl: NavController
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let service = await this.launchDarkly.checkServiceStatus();
    if (service) {
      this.canAccess = this.launchDarkly.checkFlag("pokemon-info", true);
      console.log(this.canAccess);
      if (!this.canAccess) {
        this.navCtrl.navigateBack(["home"]);
      }
      return this.canAccess;
    } else {
      return false;
    }
  }
}
