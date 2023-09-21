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
    private alertService: AlertService,
    private navController: NavController,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {
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
    if (!this.usuarioService.getUsuarioPorCorreo(this.nuevoUsuario.correo)) {
      // Registrar usuario en firebase
      try {
        await this.auth.createUserWithEmailAndPassword(this.nuevoUsuario.correo, this.nuevoUsuario.contrasena);

        // Si el registro de firebase fue exitoso, registrar usuario en el array de usuarios
        this.nuevoUsuario.id = this.usuarioService.getNuevoId();
        console.log("Nuevo Usuario");
        console.table(this.nuevoUsuario);
        this.usuarioService.registrarUsuario(this.nuevoUsuario);
        //////////////////////////////////////////////////////////////
      }
      catch (error) {
        // Manejar errores de firebase
        this.alertService.showAlert("Ocurrió un problema en el registro", "ERROR");
        return;
      }

      // Si el registro fue exitoso, enviar a la pagina principal
      setTimeout(() => {
        this.alertService.showAlert("Bienvenido a TeLlevoAPP.", "Registro exitoso");
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
