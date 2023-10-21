// Angular/Ionic
import { Component } from '@angular/core';

// Servicios
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

// Modelos
import { Usuario } from 'src/app/models/usuario';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage {
  nuevoUsuario: Usuario = {
    id: 0,
    nombre: "",
    apellido: "",
    correo: "",
    esConductor: false,
    urlImagenPerfil: ""
  }

  contrasena: string = "";
  verificadorContrasena: string = "";

  constructor(
    private servicioAutenticacion: AutenticacionService,
    private navController: NavController,
    private router: Router,
  ) { }


  async registrar() {
    this.servicioAutenticacion.registrarUsuario(
      this.nuevoUsuario.nombre,
      this.nuevoUsuario.apellido,
      this.nuevoUsuario.correo,
      this.contrasena,
      this.verificadorContrasena);
  }

  irAInicio() {
    this.navController.setDirection('back');
    this.router.navigate(['/inicio']);
  }
}