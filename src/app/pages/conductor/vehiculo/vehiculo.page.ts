import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculo } from 'src/app/models/vehiculo';
import { AlertService } from 'src/app/services/global/alert.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  // Se llena automaticamente durante la inicialización del componente.
  correoUsuarioActual: string = "";


  usuario: any;
  nuevoVehiculo: Vehiculo = {
    patente: "",
    tipoVehiculo: "",
    marca: "",
    modelo: "",
    color: "",
    cantidadAsientos: 0,
    conductor: null
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.correoUsuarioActual = params['correo'];
      if (this.correoUsuarioActual) {
        this.usuario = this.usuarioService.getUsuarioPorCorreo(this.correoUsuarioActual);

        this.nuevoVehiculo.conductor = this.usuario;
      }
    })
  }

  irAPrincipal() {
    this.router.navigate(['/principal', this.correoUsuarioActual]);
  }

  registrarVehiculo() {
    if (this.nuevoVehiculo.patente == "") {
      this.alertService.showAlert("Debe ingresar una patente.", "Ingrese patente");
      return;
    }
    if (this.nuevoVehiculo.tipoVehiculo == "") {
      this.alertService.showAlert("Debe ingresar un tipo de vehículo (Automóvil, motocicleta...).", "Ingrese un tipo de vehículo")
      return;
    }
    if (this.nuevoVehiculo.modelo == "") {
      this.alertService.showAlert("Debe ingresar un modelo.", "Ingrese un modelo")
      return;
    }
    if (this.nuevoVehiculo.marca == "") {
      this.alertService.showAlert("Debe ingresar una marca.", "Ingrese una marca");
      return;
    }
    if (this.nuevoVehiculo.color == "") {
      this.alertService.showAlert("Debe ingresar el color del vehículo.", "Ingrese color")
      return;
    }
    if (this.nuevoVehiculo.cantidadAsientos == 0) {
      this.alertService.showAlert("Debe ingresar la cantidad de asientos.", "Ingrese cantidad de asientos")
      return;
    }
    console.log("nuevoVehiculo");
    console.table(this.nuevoVehiculo);

    this.alertService.showAlert("Vehículo registrado con éxito.", "Registro exitoso");
    this.irAPrincipal();
  }

}
