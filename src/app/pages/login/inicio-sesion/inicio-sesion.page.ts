import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/global/alert.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit, OnDestroy {

  correo: string = "";
  contrasena: string = "";

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // No funciona
  ngOnDestroy() {
    console.log("Se destruyo el componente InicioSesionPage");
    console.log("Correo: " + this.correo);
    console.log("Contraseña: " + this.contrasena);
  }

  iniciar() {
    if (this.correo == "") {
      // alert("Debe ingresar un correo.");

      this.alertService.showAlert("Debe ingresar un correo para iniciar sesión.", "Ingrese un correo");
      return;
    }
    if (this.contrasena == "") {
      // alert("Debe ingresar una contraseña.")

      this.alertService.showAlert("Debe ingresar una contraseña para iniciar sesión.", "Ingrese una contraseña");
      return;
    }

    let usuario = this.usuarioService.getUsuarioPorCorreo(this.correo);

    if (this.correo == usuario?.correo && this.contrasena == usuario.contrasena) {
      this.router.navigate(['/principal', usuario.correo]);
      return;
    }

    // alert("Correo o contraseña incorrectos.");
    this.alertService.showAlert("El correo o la contraseña son invalidos.", "Credenciales invalidas");
  }

  irARegistro() {
    this.router.navigateByUrl("registro");
  }

  irARecuperar() {
    this.router.navigateByUrl("recuperar");
  }
}
