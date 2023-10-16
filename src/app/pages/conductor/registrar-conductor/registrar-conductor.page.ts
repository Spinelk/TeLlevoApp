import { Component, EventEmitter, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { HelperService } from 'src/app/services/global/helper.service';
import { StorageService } from 'src/app/services/global/storage.service';

@Component({
  selector: 'app-registrar-conductor',
  templateUrl: './registrar-conductor.page.html',
  styleUrls: ['./registrar-conductor.page.scss'],
})
export class RegistrarConductorPage implements OnInit {



  conductor:Usuario = {
    id:0,
    nombre:"",
    apellido:"",
    correo:"",
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

  ngOnInit() {
  }

  async registrarConductor(){
    if (this.conductor.rut == "") {
      this.alertService.showAlert("Debe ingresar su rut.", "Ingrese rut");
      return;
    }
    if (this.conductor.licencia == "") {
      this.alertService.showAlert("Debe ingresar una licencia.", "Ingrese licencia")
      return;
    }
    const user = await this.auth.currentUser;
    if(user?.email){
      const usuario = await this.storageService.obtenerUsuarioPorCorreo(user?.email);
      if(usuario != null){
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
