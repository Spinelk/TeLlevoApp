import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
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
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
  }

  registrar() {
    if (this.nombre == "") {
      alert("Debe ingresar un nombre.");
      return;
    }
    if (this.apellido == "") {
      alert("Debe ingresar un apellido.")
      return;
    }
    if (this.correo == "") {
      alert("Debe ingresar un correo.");
      return;
    }
    if (this.contrasena == "") {
      alert("Debe ingresar una contraseña.")
      return;
    }

    let usuario: Usuario = {
      id: this.usuarioService.getNuevoId(),
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena
    };

    // console.log("Nuevo Usuario");
    // console.table(usuario);


    console.log("Usuarios");
    console.table(this.usuarioService.usuarios);

    if (!this.usuarioService.getUsuarioPorCorreo(this.correo)) {
      this.usuarioService.usuarios.push(usuario);

      console.log("Nuevos Usuarios");
      console.table(this.usuarioService.usuarios);

      alert("Usuario registrado con éxito.");
      this.inicio();
    }
    else {
      alert("El correo ingresado ya existe.");
      return;
    }
  }

  inicio() {
    this.router.navigateByUrl("inicio-sesion");
  }
}
