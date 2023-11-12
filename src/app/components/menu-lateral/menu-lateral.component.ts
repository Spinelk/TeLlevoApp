// Angular/Ionic
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

// Servicios
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';
import { StorageService } from 'src/app/services/global/storage.service';

// Modelos
import { Usuario } from 'src/app/models/usuario';

// Ventanas modales
import { VehiculoPage } from 'src/app/components/modals/vehiculo/vehiculo.page';
import { PerfilPage } from 'src/app/components/modals/perfil/perfil.page';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent {

  loading: boolean = true;

  @Input() usuario: Usuario = {
    id: 0,
    nombre: "",
    apellido: "",
    correo: "",
    esConductor: false
  }

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private storageService: StorageService,
    private servicioAutenticacion: AutenticacionService,
    private vehiculoPage: VehiculoPage,
    private perfilPage: PerfilPage,
  ) {
  }

  ionViewDidLeave() {
    this.menuCtrl.close('menu-lateral');
  }

  async modalPerfil() { // Perfil
    this.perfilPage.mostrarModal();
  }


  // Mis Viajes

  // Mi Billetera

  async modalVehiculo() { // Vehículo
    this.vehiculoPage.mostrarModal();
  }

  // Ayuda en línea

  // Configuración

  async cerrarSesion() { // Cerrar sesión
    this.servicioAutenticacion.cerrarSesion();
  }



  async irAVehiculo() {
    const vehiculo = await this.storageService.cargarVehiculo();
    if (vehiculo != null) {
      this.modalVehiculo();
    } else {
      this.router.navigate(['/registrar-vehiculo']);
    }
  }
}
