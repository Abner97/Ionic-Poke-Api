import { Injectable } from "@angular/core";
import * as LDClient from "launchdarkly-js-client-sdk";
import { LDClientBase, LDUser } from "launchdarkly-js-client-sdk";
import { Observable, Subject } from "rxjs";
import { PlatformService } from "./platform.service";

@Injectable({
  providedIn: "root",
})
export class LaunchdarklyService {
  private ldClient: LDClientBase; //cliente de LaunchDarkly
  private user: LDUser; //objeto user

  constructor(public platformService: PlatformService) {
    this.initialize(); //Se inicializa el cliente
    this.ldClient.on("initialized", () => {
      //Activamos la escucha de cambios en la configuración de las flags para que sean actualizadas.
      this.ldClient.on("change", () => {
        console.log("something change");
      });
    });
  }

  //Devuelve un observable para escuchar cambios en una flag específica
  getBooleanFlagObservable(flagName: string) {
    let booleanFlag: Subject<boolean> = new Subject<boolean>();
    let booleanFlagObs: Observable<boolean> = booleanFlag.asObservable();
    this.listenChangesOnServer(flagName, true, booleanFlag);
    return booleanFlagObs;
  }

  //Verifica que el servicio de LaunchDarkly este funcionando correctamente
  async checkServiceStatus(): Promise<boolean> {
    try {
      await this.ldClient.waitForInitialization();
      return true;
    } catch (err) {
      return false;
    }
  }

  //Obtiene de memoria o cache el estado de nuestra flag
  checkFlag(flagName: string, defaultValue: any) {
    return this.ldClient.variation(flagName, defaultValue);
  }

  //Activa la escucha de cambios para una determinada flag
  private listenChangesOnServer(
    flagName: string,
    defaultValue: any,
    subject: Subject<any>
  ) {
    this.ldClient.on(`change:${flagName}`, () => {
      console.log("pokemon-info changed");
      var featureStatus = this.checkFlag(flagName, defaultValue);
      subject.next(featureStatus);
    });
  }

  //Inicializa el cliente de LaunchDarkly
  initialize() {
    //Objeto user
    this.user = {
      key: "uhdj56",
      email: "abraham.497@hotmail.com",
      country: "USA",
      custom: {
        platform: this.platformService.getPlatformName(),
        company: "BG",
        department: "QA",
      },
    };
    //Inicializacion del cliente y seteo del storage que queremos que use el cliente
    this.ldClient = LDClient.initialize("5ff5da42a793ec0abb9f7267", this.user, {
      bootstrap: "localStorage",
    });
  }
}
