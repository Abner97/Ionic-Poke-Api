import { Injectable } from "@angular/core";
import * as LDClient from "launchdarkly-js-client-sdk";
import {
  createConsoleLogger,
  LDClientBase,
  LDUser,
} from "launchdarkly-js-client-sdk";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class LaunchdarklyService {
  private ldClient: LDClientBase;
  private user: LDUser;

  constructor() {
    this.initialize();
    this.ldClient.on("ready", () => {
      console.log("It's now safe to request feature flags");
      var showFeature = this.ldClient.variation("pokemon-info", true);
      if (showFeature) {
        console.log("is on");
      } else {
        console.log("is of");
      }
    });
    this.ldClient.on("change", () => {
      var showFeature = this.ldClient.variation("pokemon-info", true);
      if (showFeature) {
        console.log("is on");
      } else {
        console.log("is of");
      }
    });
  }

  initialize() {
    this.user = {
      key: "aa0ceb",
    };
    this.ldClient = LDClient.initialize("5ff5da42a793ec0abb9f7267", this.user);
  }

  ngOnInit(): void {}
}
