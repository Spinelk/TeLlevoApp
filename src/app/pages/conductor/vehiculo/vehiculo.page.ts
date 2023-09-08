import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo';
import { AlertService } from 'src/app/services/global/alert.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  patente: string = "";
  tipoVehiculo: string = "";
  marca: string = "";
  modelo: string = "";
  color: string = "";
  cantidadAsientos: number = 0;
  conductor : any;

  tipo: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService:AlertService,
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const usuarioCorreo = params['correo'];
      if (usuarioCorreo) {
        const correo = usuarioCorreo;
        this.conductor = this.usuarioService.getUsuarioPorCorreo(correo);
      }
    })
  }

  irAPrincipal() {
    this.router.navigate(['/principal', this.conductor?.correo, this.conductor.tipo,]);
  }

  registrarVehiculo() {
    if (this.patente == "") {
      this.alertService.showAlert("Debe ingresar una patente.", "Ingrese patente");
      return;
    }
    if (this.tipoVehiculo == "") {
      this.alertService.showAlert("Debe ingresar un tipo de vehículo (Automóvil, motocicleta...).", "Ingrese un tipo de vehículo")
      return;
    }
    if (this.modelo == "") {
      this.alertService.showAlert("Debe ingresar un modelo.", "Ingrese un modelo")
      return;
    }
    if (this.marca == "") {
      this.alertService.showAlert("Debe ingresar una marca.", "Ingrese una marca");
      return;
    }
    if (this.color == "") {
      this.alertService.showAlert("Debe ingresar el color del vehículo.", "Ingrese color")
      return;
    }
    if (this.cantidadAsientos == 0) {
      this.alertService.showAlert("Debe ingresar la cantidad de asientos.", "Ingrese cantidad de asientos")
      return;
    }


    let nuevoVehiculo: Vehiculo = {
      patente: this.patente,
      tipoVehiculo: this.tipoVehiculo,
      marca: this.marca,
      modelo: this.modelo,
      color: this.color,
      cantidadAsientos: this.cantidadAsientos,
      conductor: this.conductor
    };

    // console.log("Nuevo Usuario");
    // console.table(usuario);


    // if (!this.usuarioService.getUsuarioPorCorreo(this.correo)) {
    //   this.usuarioService.ingresarUsuario(nuevoUsuario);


      this.alertService.showAlert("Vehículo registrado con éxito.", "Registro exitoso");
      this.irAPrincipal();
    // }
    // else {
    //   this.alertService.showAlert("El correo ingresado ya existe.", "Error al registrar");
    //   return;
    // }
  }

}
