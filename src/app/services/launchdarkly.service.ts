import { Injectable } from "@angular/core";
import * as LDClient from "launchdarkly-js-client-sdk";
import {
  createConsoleLogger,
  LDClientBase,
  LDUser,
} from "launchdarkly-js-client-sdk";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LaunchdarklyService {
  private ldClient: LDClientBase;
  public serviceReady: boolean;
  private user: LDUser;

  constructor() {
    this.initialize();
    this.ldClient.on("initialized", () => {
      this.ldClient.variation("pokemon-info", true);
    });
  }

  getBooleanFlagObservable(flagName: string) {
    let booleanFlag: Subject<boolean> = new Subject<boolean>();
    let booleanFlagObs: Observable<boolean> = booleanFlag.asObservable();
    this.listenChangesOnServer(flagName, true, booleanFlag);
    return booleanFlagObs;
  }

  async checkServiceStatus(): Promise<boolean> {
    try {
      await this.ldClient.waitForInitialization();
      return true;
    } catch (err) {
      return false;
    }
  }

  checkFlag(flagName: string, defaultValue: any) {
    return this.ldClient.variation(flagName, defaultValue);
  }

  private listenChangesOnServer(
    flagName: string,
    defaultValue: any,
    subject: Subject<any>
  ) {
    this.ldClient.on(`change:${flagName}`, () => {
      console.log("pokemon-info changed");
      var featureStatus = this.checkFlag(flagName, defaultValue);
      console.log(featureStatus);
      subject.next(featureStatus);
    });
  }

  initialize() {
    this.user = {
      key: "aa0ceb",
      email: "abrahamvega987@gmail.com",
      country: "Panamá",
    };
    this.ldClient = LDClient.initialize("5ff5da42a793ec0abb9f7267", this.user, {
      bootstrap: "localStorage",
    });

    this.ldClient.on("change", () => {
      console.log("something change");
    });
  }
}
