// Angular/Ionic
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Device } from '@capacitor/device';

// Servicios
import { HelperService } from 'src/app/services/global/helper.service';
import { StorageService } from 'src/app/services/global/storage.service';

// Modelos
import { Vehiculo } from 'src/app/models/vehiculo';

// Modals
import { VehiculoPage } from '../../../components/modals/vehiculo/vehiculo.page';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  animarTexto = true;

  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    urlImagenPerfil: '',
    esConductor: false,
    licencia: '',
    rut: '',
  }

  vehiculo: Vehiculo = {
    patente: '',
    tipoVehiculo: '',
    marca: '',
    modelo: '',
    color: '',
    cantidadAsientos: 0,
    conductor: '',
  }


  constructor(
    private router: Router,
    private storageService: StorageService,
    private helper: HelperService,
  ) {

  }

  ngOnInit() {
    this.cargarUsuario();
    this.cargarVehiculo();

    this.storageService.conductorActualizado.subscribe(() => {
      // Lógica para actualizar el componente, por ejemplo, cargar el botón
      this.cargarUsuario();

    });
    this.dispositivo();

  }

  async dispositivo(){
    const device = await   Device.getInfo();
    await this.helper.showToast("Su dispositivo es: " + device.model);
  }

  async cargarUsuario() {
    const usuario = await this.storageService.cargarUsuario();
    if (usuario != null) {
      this.usuario = usuario;
    }
  }

  async cargarVehiculo() {
    const vehiculo = await this.storageService.cargarVehiculo();
    if (vehiculo != null) {
      this.vehiculo = vehiculo;
    }
  }

  async disponerVehiculo() {
    const vehiculo = await this.storageService.cargarVehiculo();
    if (vehiculo != null) {
      this.modalVehiculo();
    } else {
      this.router.navigateByUrl('registrar-vehiculo');
    }
  }

  async modalVehiculo() {
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
