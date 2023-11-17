import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarVehiculoPageRoutingModule } from './registrar-vehiculo-routing.module';

import { RegistrarVehiculoPage } from './registrar-vehiculo.page';
import { CompartidosModule } from 'src/app/modules/compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompartidosModule,
    RegistrarVehiculoPageRoutingModule
  ],
  declarations: [RegistrarVehiculoPage]
})
export class RegistrarVehiculoPageModule {}
