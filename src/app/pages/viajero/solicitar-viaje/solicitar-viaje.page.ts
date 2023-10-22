import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-solicitar-viaje',
  templateUrl: './solicitar-viaje.page.html',
  styleUrls: ['./solicitar-viaje.page.scss'],
})
export class SolicitarViajePage {

  constructor(
    private router: Router,
    private navController: NavController,
  ) { }


  irAConfirmar(id: number) {
    this.router.navigate(['/confirmar-solicitud/' + id]);
  }

  irAInicio() {
    this.navController.setDirection('back');
    this.router.navigate(['/inicio']);
  }
}
