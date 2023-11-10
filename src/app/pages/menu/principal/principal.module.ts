import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';
import { MenuLateralComponent } from 'src/app/components/menu-lateral/menu-lateral.component';
import { CompartidosModule } from 'src/app/modules/compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPageRoutingModule,
    CompartidosModule,
  ],
  declarations: [
    PrincipalPage,
    MenuLateralComponent
  ]
})
export class PrincipalPageModule {}
