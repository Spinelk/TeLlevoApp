import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { VehiculoPage } from 'src/app/pages/conductor/vehiculo/vehiculo.page';
import { PerfilPage } from 'src/app/pages/menu/perfil/perfil.page';
import { HelperService } from 'src/app/services/global/helper.service';

import { StorageService } from 'src/app/services/global/storage.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnInit {

  loading:boolean = true;

  @Input() usuario:Usuario = {
    id:0,
    nombre:"",
    apellido:"",
    correo:"",
    esConductor: false
  };

  // Utilizado para agregar/elimar clases de CSS dependiendo de la plataforma
  // Se actuliza en el constructor
  plataformaNoEsIos: boolean = true;

  constructor(
    private helper: HelperService,
    private router: Router,
    private platform: Platform,
    private navController: NavController,
    private auth: AngularFireAuth,
    private menuCtrl:MenuController,
    private storageService: StorageService
    ) {
    this.plataformaNoEsIos = !this.platform.is('ios');
  }

  ngOnInit() {
    this.cargar();
    setTimeout(this.simularCargaAvatar,3000);
  }

  simularCargaAvatar = () => {
    this.loading = false;
  }

  ionViewDisLeave(){
    this.cerrarMenu();
  }

  async modalVehiculo(){
    const vehiculo = await this.storageService.cargarVehiculo();
    var info =[];
    info.push(
      {
        patente: vehiculo?.patente,
        tipoVehiculo: vehiculo?.tipoVehiculo,
        marca: vehiculo?.marca,
        modelo: vehiculo?.modelo,
        color: vehiculo?.color,
        cantidadAsientos: vehiculo?.cantidadAsientos,
        conductor:  vehiculo?.conductor
      }
      );

      const parametros = {dataModal:info};
      this.helper.showModal(VehiculoPage,parametros,true);
  }

  async modalPerfil(){
    const usuario = await this.storageService.cargarUsuario();
    var info =[];
    info.push(
      {
        nombre:usuario?.nombre,
        apellido:usuario?.apellido,
        correo:usuario?.correo,
        esConductor: usuario?.esConductor,

        urlImagenPerfil: usuario?.urlImagenPerfil,
        rut: usuario?.rut,
        licencia: usuario?.licencia,
      }
      );

      const parametros = {dataModal:info};
      this.helper.showModal(PerfilPage,parametros,true);
  }


  async cargar(){
    const usuario = await this.storageService.cargarUsuario();
    if (usuario != null) {
      this.usuario = usuario;
    }
  }


  async cerrarSesion() {
    let confirm = await this.helper.showConfirm("¿Está seguro que desea cerrar sesión?", "Si", "No");
    if (confirm) {
      const loader = await this.helper.showLoading("Cerrando sesión...");
      // Cerrar sesion con firebase
      this.auth.signOut().then(() => {
        localStorage.removeItem("correoUsuario");
        setTimeout(() => {
          loader.dismiss();
          this.helper.showAlert("Vuelve pronto.", "Sesión Finalizada");
          this.irAInicio();
        }, 1000);
      }
      ).catch((error) => {
        // Manejar el error
        console.log('Error al cerrar sesion');
      }
      );
    }
  }

  cerrarMenu(){
    this.menuCtrl.close('menu-lateral');
  }

  irAInicio() {
    this.navController.setDirection('back');
    this.router.navigate(['/inicio-sesion']);
  }


  irARegistrarVehiculo() {
    this.router.navigate(['/registrar-vehiculo']);
  }

  irAConductor(){
    this.router.navigate(['/registrar-conductor']);
  }
}
