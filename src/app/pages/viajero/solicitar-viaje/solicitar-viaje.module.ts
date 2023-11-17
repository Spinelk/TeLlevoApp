import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarViajePageRoutingModule } from './solicitar-viaje-routing.module';

import { SolicitarViajePage } from './solicitar-viaje.page';
import { CompartidosModule } from 'src/app/modules/compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompartidosModule,
    SolicitarViajePageRoutingModule
  ],
  declarations: [SolicitarViajePage]
})
export class SolicitarViajePageModule {}
