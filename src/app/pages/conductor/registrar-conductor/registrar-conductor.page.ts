import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { HelperService } from 'src/app/services/global/helper.service';
import { StorageService } from 'src/app/services/global/storage.service';

import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-registrar-conductor',
  templateUrl: './registrar-conductor.page.html',
  styleUrls: ['./registrar-conductor.page.scss'],
})
export class RegistrarConductorPage {


  conductor: Usuario = {
    id: 0,
    nombre: "",
    apellido: "",
    correo: "",
    esConductor: false,
    urlImagenPerfil: "",
    licencia: "",
    rut: ""
  };

  constructor(
    private auth: AngularFireAuth,
    private storageService: StorageService,
    private alertService: HelperService,
    private router: Router,
  ) { }

  async registrarConductor() {
    if (this.conductor.rut == "") {
      this.alertService.showAlert("Debe ingresar su rut.", "Ingrese rut");
      return;
    }
    if (this.conductor.rut && this.conductor.rut.length < 8) {
      this.alertService.showAlert("El rut debe tener al menos 8.", "Ingrese nombre");
      return;
    }
    if (this.conductor.licencia == "") {
      this.alertService.showAlert("Debe ingresar una licencia.", "Ingrese licencia")
      return;
    }
    if (this.conductor.licencia && this.conductor.licencia.length < 6) {
      this.alertService.showAlert("La licencia debe tener al menos 6 caracteres.", "Ingrese una licencia valida");
      return;
    }
    const user = await this.auth.currentUser;
    if (user?.email) {
      const usuario = await this.storageService.obtenerUsuarioPorCorreo(user?.email);
      if (usuario != null) {
        this.conductor.id = usuario.id;
        this.conductor.nombre = usuario.nombre;
        this.conductor.apellido = usuario.apellido;
        this.conductor.correo = usuario.correo;
        this.conductor.esConductor = true;
        this.conductor.urlImagenPerfil = usuario.urlImagenPerfil;
        await this.storageService.modificarUsuario(this.conductor);
        await this.router.navigateByUrl('principal');
      }
      setTimeout(() => {
        this.alertService.showToast("Se ha registrado como conductor");
      }, 1000);
    }
  }
}
