import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokeInfoPageRoutingModule } from './poke-info-routing.module';

import { PokeInfoPage } from './poke-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokeInfoPageRoutingModule
  ],
  declarations: [PokeInfoPage]
})
export class PokeInfoPageModule {}
