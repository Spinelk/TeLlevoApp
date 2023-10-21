// Angular/Ionic
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

// Servicios
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage {

  correo: string = "";

  constructor(
    private router: Router,
    private navController: NavController,
    private servicioAutenticacion: AutenticacionService,
  ) { }


  enviar() {
    this.servicioAutenticacion.enviarCorreoCambioContrasena(this.correo);
  }


  // Navegación. Puede ser reemplazada por un botón en el HTML
  irAInicio() {
    this.navController.back();
  }
  irARecuperar() {
    this.router.navigate(['recuperar-contrasena']);
  }
}
