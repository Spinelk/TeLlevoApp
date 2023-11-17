import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarConductorPageRoutingModule } from './registrar-conductor-routing.module';

import { RegistrarConductorPage } from './registrar-conductor.page';
import { CompartidosModule } from 'src/app/modules/compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompartidosModule,
    RegistrarConductorPageRoutingModule
  ],
  declarations: [RegistrarConductorPage]
})
export class RegistrarConductorPageModule {}
