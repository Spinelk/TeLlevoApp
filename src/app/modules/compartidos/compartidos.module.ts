import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from 'src/app/components/compartidos/boton/boton.component';
import { RouterModule } from '@angular/router';
import { BannerComponent } from 'src/app/components/compartidos/banner/banner.component';



@NgModule({
  declarations: [
    BotonComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    BotonComponent,
    BannerComponent,
  ],
})
export class CompartidosModule { }
