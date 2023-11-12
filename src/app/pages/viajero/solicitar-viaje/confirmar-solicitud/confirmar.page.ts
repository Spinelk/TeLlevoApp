import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/global/helper.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.page.html',
  styleUrls: ['./confirmar.page.scss'],
})
export class ConfirmarPage {

  constructor(
    private router: Router,
    private navController: NavController,
    private alertService: HelperService,
  ) { }

  confirmar() {
    this.alertService.showAlert("Espera la respuesta del conductor", "Viaje Solicitado.");

    setTimeout(() => {
      this.navController.setDirection('back');
      this.router.navigate(['/principal']);
    }, 1);
  }
}
