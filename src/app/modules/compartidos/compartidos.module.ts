import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from 'src/app/components/compartidos/boton/boton.component';
import { RouterModule } from '@angular/router';
import { BannerComponent } from 'src/app/components/compartidos/banner/banner.component';
import { TituloComponent } from 'src/app/components/compartidos/titulo/titulo.component';
import { CampoTextoComponent } from 'src/app/components/compartidos/campo-texto/campo-texto.component';
import { FormsModule } from '@angular/forms';
import { BotonMdComponent } from 'src/app/components/compartidos/boton-md/boton-md.component';
import { BotonLgComponent } from 'src/app/components/compartidos/boton-lg/boton-lg.component';
import { AutoSvgComponent } from 'src/app/components/compartidos/auto-svg/auto-svg.component';



@NgModule({
  declarations: [
    BotonComponent,
    BotonMdComponent,
    BotonLgComponent,
    BannerComponent,
    TituloComponent,
    CampoTextoComponent,
    AutoSvgComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    BotonComponent,
    BotonMdComponent,
    BotonLgComponent,
    BannerComponent,
    TituloComponent,
    CampoTextoComponent,
    AutoSvgComponent,
  ],
})
export class CompartidosModule { }
