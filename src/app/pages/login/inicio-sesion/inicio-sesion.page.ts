// Angular/Ionic
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { ClipboardService } from 'src/app/services/global/clipboard.service';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage {

  correo: string = "";
  contrasena: string = "";


  constructor(
    private router: Router,
    private clipboardService: ClipboardService,
    private servicioAutenticacion: AutenticacionService,
    private navController: NavController,
  ) { }


  async copiarPortapapeles() {
    await this.clipboardService.copiarPortapapeles(this.correo);
  }


  iniciar() {
    this.servicioAutenticacion.iniciarSesion(this.correo, this.contrasena)
  }


  // Navegación. Puede ser reemplazada por un botón en el HTML
  irARegistro() {
    // this.navController.setDirection('root');
    this.router.navigate(['registro-usuario']);
  }
  irACambiarContrasena() {
    this.router.navigate(['cambiar-contrasena']);
  }
}
