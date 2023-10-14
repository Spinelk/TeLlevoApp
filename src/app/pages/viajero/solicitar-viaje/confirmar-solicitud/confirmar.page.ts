import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/global/helper.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.page.html',
  styleUrls: ['./confirmar.page.scss'],
})
export class ConfirmarPage implements OnInit {

  constructor(
    private router: Router,
    private navController: NavController,
    private alertService: HelperService,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {
    // Redirigir a inicio de sesion si no hay usuario
    // this.auth.onAuthStateChanged(user => {
    //   if (!user) {
    //     this.router.navigate(['/inicio-sesion']);
    //     return;
    //   }
    // });
  }

  irASolicitar() {
    this.navController.setDirection('back');
    this.router.navigate(['/solicitar-viaje']);
  }


  irAInicio() {
    this.alertService.showAlert("Espera la respuesta del conductor", "Viaje Solicitado.");

    setTimeout(() => {
      this.irASolicitar();
    }, 1);
  }
}
