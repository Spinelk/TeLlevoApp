import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/global/alert.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  correo: string = "";
  contrasena: string = "";

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private alertService: AlertService,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {
    // Redirigir a principal si ya hay un usuario logeado
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.router.navigate(['/principal']);
        return;
      }
    });
  }


  async iniciar() {
    // Validar que el correo y la contraseña no esten vacios
    if (this.correo == "") {
      this.alertService.showAlert("Debe ingresar un correo para iniciar sesión.", "Ingrese un correo");
      return;
    }
    if (this.contrasena == "") {
      this.alertService.showAlert("Debe ingresar una contraseña para iniciar sesión.", "Ingrese una contraseña");
      return;
    }

    // Iniciar sesion con firebase
    try {
      await this.auth.signInWithEmailAndPassword(this.correo, this.contrasena);

      // Si el inicio de sesion fue exitoso, enviar a la pagina principal
      setTimeout(() => {
        this.alertService.showAlert("Bienvenido a TeLlevoAPP.", "");
        this.router.navigate(['/principal']);
      }, 1000);
    }
    catch (error) {
      // Manejar errores de firebase
      this.alertService.showAlert("El correo o la contraseña son invalidos.", "Credenciales invalidas");
      return;
    }
  }


  irARegistro() {
    this.router.navigateByUrl("registro-usuario");
  }

  irACambiarContrasena() {
    this.router.navigateByUrl("cambiar-contrasena");
  }
}
