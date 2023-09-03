import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/global/alert.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  correo: string = "";

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private alertService: AlertService,
    private navController: NavController
  ) { }


  ngOnInit() {
  }

  irAInicio() {
    this.navController.back();
  }

  enviar() {
    if (this.correo == "") {
      this.alertService.showAlert("Debe ingresar un correo para la recuperación.", "Ingrese un correo");
      return;
    }

    this.alertService.showAlert("Se ha enviado un correo a " + this.correo + " con las instrucciones para recuperar su contraseña.", "Correo enviado");
    this.irAInicio();
  }
}
