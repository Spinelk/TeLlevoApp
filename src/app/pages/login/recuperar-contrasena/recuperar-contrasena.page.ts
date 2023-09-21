import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/global/alert.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {

  codigo: string = "";

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private alertService: AlertService,
    private navController: NavController
  ) { }


  ngOnInit() {
  }

  irAInicio() {
    this.router.navigateByUrl("inicio-sesion");
  }

  enviarCod() {
    if (this.codigo == "") {
      this.alertService.showAlert("Debe ingresar el código enviado a su correo.", "Ingrese código");
      return;
    }

    this.alertService.showAlert("Haga click en aceptar para crear una nueva contraseña", "Verificación realizada");
    this.irAInicio();
  }
}