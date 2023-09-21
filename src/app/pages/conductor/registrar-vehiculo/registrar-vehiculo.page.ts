import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculo } from 'src/app/models/vehiculo';
import { AlertService } from 'src/app/services/global/alert.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registrar-vehiculo',
  templateUrl: './registrar-vehiculo.page.html',
  styleUrls: ['./registrar-vehiculo.page.scss'],
})
export class RegistrarVehiculoPage implements OnInit {
  // Se llena automaticamente durante la inicialización del componente.
  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    esConductor: false
  }

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
    private navController: NavController,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {
    // Redirigir a inicio de sesion si no hay usuario
    this.auth.onAuthStateChanged(user => {
      if (!user) {
        this.router.navigate(['/inicio-sesion']);
        return;
      }
    });
  }

  irAPrincipal() {
    this.navController.setDirection('back');
    this.router.navigate(['/principal']);
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
