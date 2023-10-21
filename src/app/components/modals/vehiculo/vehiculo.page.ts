// Angular/Ionic
import { Component, Input, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

// Servicios
import { HelperService } from 'src/app/services/global/helper.service';
import { StorageService } from 'src/app/services/global/storage.service';

// Modelos
import { Vehiculo } from 'src/app/models/vehiculo';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage {
  @Input() dataModal: Vehiculo[] = [];

  constructor(
    private modalController: ModalController,
    private storageService: StorageService,
    private helper: HelperService,
  ) { }

  close() {
    this.modalController.dismiss();
  }

  async mostrarModal() {
    const vehiculo = await this.storageService.cargarVehiculo();
    var info = [];
    info.push(
      {
        patente: vehiculo?.patente,
        tipoVehiculo: vehiculo?.tipoVehiculo,
        marca: vehiculo?.marca,
        modelo: vehiculo?.modelo,
        color: vehiculo?.color,
        cantidadAsientos: vehiculo?.cantidadAsientos,
        conductor: vehiculo?.conductor
      }
    );

    const parametros = { dataModal: info };
    this.helper.showModal(VehiculoPage, parametros, true);
  }

}
