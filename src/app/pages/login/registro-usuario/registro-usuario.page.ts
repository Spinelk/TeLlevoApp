import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { HelperService } from 'src/app/services/global/helper.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/services/global/storage.service';
import { AvatarService } from 'src/app/services/global/avatar.service';
import { Avatar } from 'src/app/models/avatar';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  avatares:Avatar[]=[];

  nuevoUsuario: Usuario = {
    id: 0,
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    esConductor: false,
    urlImagenPerfil: ""
  }

  verificadorContrasena: string = "";

  constructor(
    private router: Router,
    private alertService: HelperService,
    private navController: NavController,
    private auth: AngularFireAuth,
    private storageService: StorageService,
    private avatarService: AvatarService
  ) { }

  ngOnInit() {
    this.cargarAvatar();
  }

  async viewUser(){
    console.log("USUARIOS REGISTRADOS",await this.storageService.obtenerUsuarios());
  }

  async cargarAvatar() {
    try {
      const response = await this.avatarService.getAvatar();
      this.avatares = response.results;
    } catch (error) {
      console.error("Error al cargar avatares", error);
    }
  }


  async registrar() {
      // Validar que los campos no esten vacios
    if (this.nuevoUsuario.nombre == "") {
      this.alertService.showAlert("Debe ingresar un nombre.", "Ingrese un nombre");
      return;
    }
    if (this.nuevoUsuario.apellido == "") {
      this.alertService.showAlert("Debe ingresar un apellido.", "Ingrese un apellido")
      return;
    }
    if (this.nuevoUsuario.correo == "") {
      this.alertService.showAlert("Debe ingresar un correo.", "Ingrese un correo");
      return;
    }
    if (this.nuevoUsuario.contrasena == "") {
      this.alertService.showAlert("Debe ingresar una contraseña.", "Ingrese una contraseña")
      return;
    }
    if (this.nuevoUsuario.contrasena && this.nuevoUsuario.contrasena.length < 6) {
      this.alertService.showAlert("La contraseña debe tener al menos 6 caracteres.", "Ingrese una contraseña")
      return;
    }
    if (this.verificadorContrasena == "") {
      this.alertService.showAlert("Debe ingresar la contraseña nuevamente.", "Verifique la contraseña")
      return;
    }
    if (this.nuevoUsuario.contrasena !== this.verificadorContrasena) {
      this.alertService.showAlert("Las contraseñas no coinciden.", "Error al verificar contraseña");
      return;
    }

    // POR ALGUN MOTIVO TE REDIRECCIONA A LA PAGINA PRINCIPAL SIN REGISTRARTE EN EL ARRAY DE USUARIOS PERO SI EN FIREBASE
    // Validar que el correo no exista en el array de usuarios
    const usuario = await this.storageService.obtenerUsuarioPorCorreo(this.nuevoUsuario.correo);
    const nroUsuarios = (await this.storageService.obtenerUsuarios()).length;
    if (!usuario) {

      try {
        var user =
        [
          {
            id: nroUsuarios + 1,
            nombre: this.nuevoUsuario.nombre,
            apellido: this.nuevoUsuario.apellido,
            correo: this.nuevoUsuario.correo,
            esConductor: this.nuevoUsuario.esConductor,
            urlImagenPerfil: this.avatares[Math.floor(Math.random() * this.avatares.length)].image
          }
        ]
        // Registrar usuario en firebase
        await this.auth.createUserWithEmailAndPassword(this.nuevoUsuario.correo, this.nuevoUsuario.contrasena);
        this.storageService.agregarUsuario(user);

        this.alertService.showAlert("Bienvenido a TeLlevoAPP.", "Registro exitoso");
        //////////////////////////////////////////////////////////////
      }
      catch (error) {
        // Manejar errores de firebase
        this.alertService.showAlert("Ocurrió un problema en el registro", "ERROR");
        return;
      }

      // Si el registro fue exitoso, enviar a la pagina principal
      setTimeout(() => {
        this.router.navigate(['/principal']);
      }, 5000);
    }
    else {
      this.alertService.showAlert("El correo ingresado ya existe.", "Error al registrar");
      return;
    }

  }

  irAInicio() {
    this.navController.back();
  }
}
