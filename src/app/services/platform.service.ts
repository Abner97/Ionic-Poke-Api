import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class PlatformService {
  private platformName: string;

  constructor(public platform: Platform) {
    this.platformName = this.platform
      .platforms()
      .find((platform) => platform === "mobileweb" || platform === "desktop");
    this.platformName =
      this.platformName === undefined
        ? this.platform
            .platforms()
            .find((platform) => platform === "android" || platform === "ios")
        : this.platformName;

    console.log(this.platform.platforms());
  }

  public getPlatformName(): string {
    return this.platformName;
  }
}