import { Component } from '@angular/core';
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
  ) {
    // obtener todos los autos del local storage
    this.storageService.obtenerVehiculos().then((vehiculos) => {
      this.vehiculos = vehiculos;
    });
  }
}
