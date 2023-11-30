// Angular/Ionic
import { Component } from '@angular/core';

// Servicios
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

// Modelos
import { Usuario } from 'src/app/models/usuario';

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
  ) { }


  async registrar() {
    this.servicioAutenticacion.registrarUsuario(
      this.nuevoUsuario.nombre,
      this.nuevoUsuario.apellido,
      this.nuevoUsuario.correo,
      this.contrasena,
      this.verificadorContrasena);
  }
}
