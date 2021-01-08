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

  constructor() {}

  ngOnInit() {}
}
