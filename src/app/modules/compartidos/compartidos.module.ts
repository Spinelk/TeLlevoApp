import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from 'src/app/components/compartidos/boton/boton.component';
import { RouterModule } from '@angular/router';
import { BannerComponent } from 'src/app/components/compartidos/banner/banner.component';
import { TituloComponent } from 'src/app/components/compartidos/titulo/titulo.component';
import { CampoTextoComponent } from 'src/app/components/compartidos/campo-texto/campo-texto.component';
import { FormsModule } from '@angular/forms';
import { BotonMdComponent } from 'src/app/components/compartidos/boton-md/boton-md.component';



@NgModule({
  declarations: [
    BotonComponent,
    BotonMdComponent,
    BannerComponent,
    TituloComponent,
    CampoTextoComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    BotonComponent,
    BotonMdComponent,
    BannerComponent,
    TituloComponent,
    CampoTextoComponent,
  ],
})
export class CompartidosModule { }
