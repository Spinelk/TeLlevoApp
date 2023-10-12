import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/global/alert.service';
import { StorageService } from 'src/app/services/global/storage.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {

  correo: string = "";

  constructor(
    private router: Router,
    private storageService: StorageService,
    private alertService: AlertService,
    private navController: NavController
  ) { }


  ngOnInit() {
  }

  irAInicio() {
    this.navController.back();
  }

  irARecuperar() {
    this.router.navigateByUrl("recuperar-contrasena");
  }

  async enviar() {
    if (this.correo == "") {
      this.alertService.showAlert("Debe ingresar un correo para la recuperación.", "Ingrese un correo");
      return;
    } else {
      // Cambiar por validación de firebase
      if (await this.storageService.obtenerUsuarioPorCorreo(this.correo)) {
      this.alertService.showAlert("Se ha enviado un correo a " + this.correo + " con las instrucciones para recuperar su contraseña.", "Correo enviado");
      this.irARecuperar();
      }
      else {
        this.alertService.showAlert("El correo ingresado no existe.", "Correo inválido");
        return;
      }
    }
  }
}
