import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";

import { LaunchdarklyService } from "../services/launchdarkly.service";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class PokemonInfoGuard implements CanActivate {
  constructor(
    public launchDarkly: LaunchdarklyService,
    public navCtrl: NavController
  ) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let val: boolean = true;
    const launchDarklyEnabled = true;
    if (launchDarklyEnabled) {
      val = this.launchDarkly.checkFlag("pokemon-info", true);
    } else {
      val = true;
    }

    if (!val) {
      this.navCtrl.navigateForward(["home"]);
    }
    return val;
  }
}
