import { Component, OnInit } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/global/helper.service';
import { StorageService } from 'src/app/services/global/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {

  correo: string = "";

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private storageService: StorageService,
    private alertService: HelperService,
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
    }

    const usuario = await this.storageService.obtenerUsuarioPorCorreo(this.correo);

    if (usuario) {
      this.auth.sendPasswordResetEmail(this.correo)
      .then(() => {
        this.alertService.showAlert("Se ha enviado un correo a " + this.correo + " con las instrucciones para recuperar su contraseña.", "Correo enviado");
        this.irARecuperar();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    } else {
      this.alertService.showAlert("El correo ingresado no existe.", "Correo inválido");
      return;
    }
  }
}
