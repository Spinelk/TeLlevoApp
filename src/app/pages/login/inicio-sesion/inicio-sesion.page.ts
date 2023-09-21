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
  }


  // iniciar() {
  //   if (this.correo == "") {
  //     // alert("Debe ingresar un correo.");
  //     this.alertService.showAlert("Debe ingresar un correo para iniciar sesión.", "Ingrese un correo");
  //     return;
  //   }
  //   if (this.contrasena == "") {
  //     // alert("Debe ingresar una contraseña.")
  //     this.alertService.showAlert("Debe ingresar una contraseña para iniciar sesión.", "Ingrese una contraseña");
  //     return;
  //   }


  //   let usuario = this.usuarioService.getUsuarioPorCorreo(this.correo);
  //   if (this.correo == usuario?.correo && this.contrasena == usuario?.contrasena) {
  //     this.correo = "";
  //     this.contrasena = "";
  //     this.router.navigate(['/principal', usuario.correo]);
  //     return;
  //   } 


  //   this.alertService.showAlert("El correo o la contraseña son invalidos.", "Credenciales invalidas");
  // }

  async iniciar() {
    if (this.correo === "" || this.contrasena === "") {
      this.alertService.showAlert("Debe ingresar un email y una contraseña.", "ERROR");
      return;
    }

    try {
      await this.auth.signInWithEmailAndPassword(this.correo, this.contrasena);
      this.alertService.showAlert("Validando credenciales...", "");
    } catch (error) {
      this.alertService.showAlert("Usuario y contraseña no válidos.", "ERROR");
    }

    setTimeout(() => {

      this.alertService.showAlert("Bienvenido a TeLlevoAPP.", "");
      // this.router.navigateByUrl("menu");
      this.router.navigate(['/principal', this.correo]);
    }, 1000);

  }


  irARegistro() {
    this.router.navigateByUrl("registro-usuario");
  }

  irACambiarContrasena() {
    this.router.navigateByUrl("cambiar-contrasena");
  }
}
