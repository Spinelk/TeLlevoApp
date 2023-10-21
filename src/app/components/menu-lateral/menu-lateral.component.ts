// Angular/Ionic
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';

// Servicios
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';
import { StorageService } from 'src/app/services/global/storage.service';

// Modelos
import { Usuario } from 'src/app/models/usuario';

// Ventanas modales
import { VehiculoPage } from 'src/app/components/modals/vehiculo/vehiculo.page';
import { PerfilPage } from 'src/app/components/modals/perfil/perfil.page';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnInit {

  loading: boolean = true;

  @Input() usuario: Usuario = {
    id: 0,
    nombre: "",
    apellido: "",
    correo: "",
    esConductor: false
  };

  // Utilizado para agregar/elimar clases de CSS dependiendo de la plataforma
  // Se actuliza en el constructor
  plataformaNoEsIos: boolean = true;

  constructor(
    private router: Router,
    private platform: Platform,
    private menuCtrl: MenuController,
    private storageService: StorageService,
    private servicioAutenticacion: AutenticacionService,
    private vehiculoPage: VehiculoPage,
    private perfilPage: PerfilPage,
  ) {
    this.plataformaNoEsIos = !this.platform.is('ios');
  }

  ngOnInit() {
    this.cargar();
    setTimeout(this.simularCargaAvatar, 3000);
  }

  simularCargaAvatar = () => {
    this.loading = false;
  }

  ionViewDidLeave() {
    this.cerrarMenu();
  }

  async modalVehiculo() {
    this.vehiculoPage.mostrarModal();
  }

  async modalPerfil() {
    this.perfilPage.mostrarModal();
  }


  async cargar() {
    const usuario = await this.storageService.cargarUsuario();
    if (usuario != null) {
      this.usuario = usuario;
    }
  }


  async cerrarSesion() {
    this.servicioAutenticacion.cerrarSesion();
  }

  cerrarMenu() {
    this.menuCtrl.close('menu-lateral');
  }

  async irAVehiculo() {
    const vehiculo = await this.storageService.cargarVehiculo();
    if (vehiculo != null) {
      this.modalVehiculo();
    } else {
      this.irARegistrarVehiculo();
    }
  }


  // Navegación. Puede ser reemplazada por un botón en el HTML
  irARegistrarVehiculo() {
    this.router.navigate(['/registrar-vehiculo']);
  }
  irAConductor() {
    this.router.navigate(['/registrar-conductor']);
  }
}
