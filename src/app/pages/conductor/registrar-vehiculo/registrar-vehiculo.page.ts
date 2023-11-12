import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { StorageService } from 'src/app/services/global/storage.service';
import { HelperService } from 'src/app/services/global/helper.service';

import { Vehiculo } from 'src/app/models/vehiculo';

@Component({
  selector: 'app-registrar-vehiculo',
  templateUrl: './registrar-vehiculo.page.html',
  styleUrls: ['./registrar-vehiculo.page.scss'],
})
export class RegistrarVehiculoPage {

  nuevoVehiculo: Vehiculo = {
    patente: "",
    tipoVehiculo: "",
    marca: "",
    modelo: "",
    color: "",
    cantidadAsientos: 0,
    conductor: ""
  };

  constructor(
    private router: Router,
    private helperService: HelperService,
    private storageService: StorageService,
    private auth: AngularFireAuth,
  ) { }

  async registrarVehiculo() {
    if (this.nuevoVehiculo.patente == "") {
      this.helperService.showAlert("Debe ingresar una patente.", "Ingrese patente");
      return;
    }
    if (this.nuevoVehiculo.patente.length < 6) {
      this.helperService.showAlert("La patente debe tener al menos 6 caracteres.", "Ingrese una patente valida");
      return;
    }
    if (this.nuevoVehiculo.tipoVehiculo == "") {
      this.helperService.showAlert("Debe ingresar un tipo de vehículo (Automóvil, motocicleta...).", "Ingrese un tipo de vehículo")
      return;
    }
    if (this.nuevoVehiculo.modelo == "") {
      this.helperService.showAlert("Debe ingresar un modelo.", "Ingrese un modelo")
      return;
    }
    if (this.nuevoVehiculo.marca == "") {
      this.helperService.showAlert("Debe ingresar una marca.", "Ingrese una marca");
      return;
    }
    if (this.nuevoVehiculo.marca.length < 2) {
      this.helperService.showAlert("La marca debe tener al menos 2 caracteres.", "Ingrese una marca valida");
      return;
    }
    if (this.nuevoVehiculo.color == "") {
      this.helperService.showAlert("Debe ingresar el color del vehículo.", "Ingrese color")
      return;
    }
    if (this.nuevoVehiculo.cantidadAsientos == 0) {
      this.helperService.showAlert("Debe ingresar la cantidad de asientos.", "Ingrese cantidad de asientos")
      return;
    }

    const user = await this.auth.currentUser;
    const correoUsuario = user?.email;

    if (correoUsuario) {
      this.nuevoVehiculo.conductor = correoUsuario;
    }

    const vehiculo = (await this.storageService.obtenerVehiculos()).filter(v => v.conductor == this.nuevoVehiculo.conductor);

    if (vehiculo.length == 0) {
      try {
        var vehicle =
          [
            {
              patente: this.nuevoVehiculo.patente,
              tipoVehiculo: this.nuevoVehiculo.tipoVehiculo,
              marca: this.nuevoVehiculo.marca,
              modelo: this.nuevoVehiculo.modelo,
              color: this.nuevoVehiculo.color,
              cantidadAsientos: this.nuevoVehiculo.cantidadAsientos,
              conductor: this.nuevoVehiculo.conductor
            }
          ]
        this.storageService.agregarVehiculo(vehicle);
        await this.router.navigateByUrl('principal');
      }
      catch (error) {
        // Manejar errores
        this.helperService.showAlert("Ocurrió un problema en el registro", "ERROR");
        return;
      }

      setTimeout(() => {
        this.helperService.showToast("Vehículo registrado con éxito.");
      }, 1000);
    }
  }
}
