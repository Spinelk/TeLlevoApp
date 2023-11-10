import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from 'src/app/components/compartidos/boton/boton.component';
import { RouterModule } from '@angular/router';
import { BannerComponent } from 'src/app/components/compartidos/banner/banner.component';
import { TituloComponent } from 'src/app/components/compartidos/titulo/titulo.component';



@NgModule({
  declarations: [
    BotonComponent,
    BannerComponent,
    TituloComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    BotonComponent,
    BannerComponent,
    TituloComponent,
  ],
})
export class CompartidosModule { }
