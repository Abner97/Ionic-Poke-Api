import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Pokemon } from "../../models/Pokemon";

@Component({
  selector: "app-full-info",
  templateUrl: "./full-info.component.html",
  styleUrls: ["./full-info.component.scss"],
})
export class FullInfoComponent implements OnInit {
  @Input() pokemon: Pokemon;
  img: string;
  constructor() {}

  getColor(stat: string) {
    let color = "";

    switch (stat) {
      case "hp":
        color = "success";
        break;
      case "attack":
        color = "danger";
        break;
      case "defense":
        color = "warning";
        break;
      case "special-attack":
        color = "secondary";
        break;
      case "special-defense":
        color = "medium";
        break;
      case "speed":
        color = "dark";
        break;
      default:
        color = "primary";
        break;
    }

    return color;
  }
  ngOnInit() {}
}
