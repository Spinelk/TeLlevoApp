import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarContrasenaPageRoutingModule } from './cambiar-contrasena-routing.module';

import { CambiarContrasenaPage } from './cambiar-contrasena.page';
import { CompartidosModule } from 'src/app/modules/compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompartidosModule,
    CambiarContrasenaPageRoutingModule
  ],
  declarations: [CambiarContrasenaPage]
})
export class CambiarContrasenaPageModule {}
