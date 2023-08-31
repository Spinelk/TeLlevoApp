import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/global/alert.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = "";
  apellido: string = "";
  correo: string = "";
  contrasena: string = "";

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private alertService:AlertService
  ) { }

  ngOnInit() {
  }

  registrar() {
    if (this.nombre == "") {
      this.alertService.showAlert("Debe ingresar un nombre.", "Ingrese nombre");
      return;
    }
    if (this.apellido == "") {
      this.alertService.showAlert("Debe ingresar un apellido.", "Ingrese apellido")
      return;
    }
    if (this.correo == "") {
      this.alertService.showAlert("Debe ingresar un correo.", "Ingrese correo");
      return;
    }
    if (this.contrasena == "") {
      this.alertService.showAlert("Debe ingresar una contraseña.", "Ingrese contraseña")
      return;
    }

    let nuevoUsuario: Usuario = {
      id: this.usuarioService.getNuevoId(),
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena
    };

    // console.log("Nuevo Usuario");
    // console.table(usuario);


    if (!this.usuarioService.getUsuarioPorCorreo(this.correo)) {
      this.usuarioService.ingresarUsuario(nuevoUsuario);


      this.alertService.showAlert("Usuario registrado con éxito.", "Registro exitoso");
      this.inicio();
    }
    else {
      this.alertService.showAlert("El correo ingresado ya existe.", "Error de registro");
      return;
    }
  }

  inicio() {
    this.router.navigateByUrl("inicio-sesion");
  }
}
