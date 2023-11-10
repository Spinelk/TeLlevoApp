import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from 'src/app/components/compartidos/boton/boton.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BotonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    BotonComponent,
  ],
})
export class CompartidosModule { }
