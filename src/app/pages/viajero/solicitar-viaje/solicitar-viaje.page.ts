import { Component } from '@angular/core';
import { HelperService } from 'src/app/services/global/helper.service';
import { StorageService } from 'src/app/services/global/storage.service';

@Component({
  selector: 'app-solicitar-viaje',
  templateUrl: './solicitar-viaje.page.html',
  styleUrls: ['./solicitar-viaje.page.scss'],
})
export class SolicitarViajePage {

  vehiculos: any[] = [];

  constructor(
    private storageService: StorageService,
    private helper: HelperService,
  ) {
    // obtener todos los autos del local storage
    this.storageService.obtenerVehiculos().then((vehiculos) => {
      this.vehiculos = vehiculos;
    });
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.verificarExistenciaDeVehiculos();
  }

  verificarExistenciaDeVehiculos(): void {
    if (this.vehiculos.length == 0) {
      this.helper.showToast('Lo sentimos. No existen vehículos disponibles en este momento');
    }
  }
}
