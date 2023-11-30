// Angular/Ionic
import { Component } from '@angular/core';

// Servicios
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage {

  correo: string = "";
  contrasena: string = "";


  constructor(
    private servicioAutenticacion: AutenticacionService,
  ) { }

  iniciarSesion() {
    this.servicioAutenticacion.iniciarSesion(this.correo, this.contrasena)
  }
}
