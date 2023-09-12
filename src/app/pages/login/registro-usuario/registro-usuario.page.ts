import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/global/alert.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {

  nuevoUsuario: Usuario = {
    id: 0,
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    esConductor: false
  }

  verificadorContrasena: string = "";

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private alertService:AlertService,
    private navController: NavController,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {
  }

  // registrar() {
  //   if (this.nuevoUsuario.nombre == "") {
  //     this.alertService.showAlert("Debe ingresar un nombre.", "Ingrese un nombre");
  //     return;
  //   }
  //   if (this.nuevoUsuario.apellido == "") {
  //     this.alertService.showAlert("Debe ingresar un apellido.", "Ingrese un apellido")
  //     return;
  //   }
  //   if (this.nuevoUsuario.correo == "") {
  //     this.alertService.showAlert("Debe ingresar un correo.", "Ingrese un correo");
  //     return;
  //   }
  //   if (this.nuevoUsuario.contrasena == "") {
  //     this.alertService.showAlert("Debe ingresar una contraseña.", "Ingrese una contraseña")
  //     return;
  //   }
  //   if (this.verificadorContrasena == "") {
  //     this.alertService.showAlert("Debe ingresar la contraseña nuevamente.", "Verifique la contraseña")
  //     return;
  //   }

  //   this.nuevoUsuario.id = this.usuarioService.getNuevoId();


  //   console.log("Nuevo Usuario");
  //   console.table(this.nuevoUsuario);


  //   if (!this.usuarioService.getUsuarioPorCorreo(this.nuevoUsuario.correo)) {
  //     this.usuarioService.registrarUsuario(this.nuevoUsuario);

  //     this.alertService.showAlert("Usuario registrado con éxito.", "Registro exitoso");
  //     this.irAInicio();
  //   }
  //   else {
  //     this.alertService.showAlert("El correo ingresado ya existe.", "Error al registrar");
  //     return;
  //   }
  // }

  async registrar(){
    if (this.nuevoUsuario.correo === "" || this.nuevoUsuario.contrasena === "") {
      this.alertService.showAlert("Debe ingresar un email y una contraseña.", "ERROR");
      return;
    }

    if (this.nuevoUsuario.contrasena !== this.verificadorContrasena) {
      this.alertService.showAlert("Las contraseñas no son iguales.", "ERROR");
      return;
    }

    try {
      await this.auth.createUserWithEmailAndPassword(this.nuevoUsuario.correo, this.nuevoUsuario.contrasena);
      this.alertService.showAlert("Ha sido registrado exitosamente.", "REGISTRADO");
      this.navController.back();
    } catch (error) {
      this.alertService.showAlert("Ocurrió un problema en el registro", "ERROR");
    }

  }

  irAInicio() {
    this.navController.back();
  }
}
