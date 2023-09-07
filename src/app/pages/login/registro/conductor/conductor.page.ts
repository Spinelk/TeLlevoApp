import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Conductor } from 'src/app/models/conductor';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/global/alert.service';
import { ConductoresService } from 'src/app/services/login/conductores.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {

  nombre: string = "";
  apellido: string = "";
  correo: string = "";
  contrasena: string = "";
  contrasena2: string = "";
  rut: string = "";
  licencia: string = "";
  // tipo conductor
  tipo = 2;

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private conductoresService: ConductoresService,
    private alertService:AlertService,
    private navController: NavController
  ) { }

  ngOnInit() {
  }

  irAInicio() {
    this.router.navigateByUrl("inicio-sesion");
  }

  registrarConductor() {
    if (this.rut == "") {
      this.alertService.showAlert("Debe ingresar rut.", "Ingrese rut")
      return;
    }
    if (this.nombre == "") {
      this.alertService.showAlert("Debe ingresar un nombre.", "Ingrese un nombre");
      return;
    }
    if (this.apellido == "") {
      this.alertService.showAlert("Debe ingresar un apellido.", "Ingrese un apellido")
      return;
    }
    if (this.correo == "") {
      this.alertService.showAlert("Debe ingresar un correo.", "Ingrese un correo");
      return;
    }
    if (this.contrasena == "") {
      this.alertService.showAlert("Debe ingresar una contraseña.", "Ingrese una contraseña")
      return;
    }
    if (this.contrasena2 == "") {
      this.alertService.showAlert("Debe ingresar la contraseña nuevamente.", "Verifique la contraseña")
      return;
    }
    if (this.licencia == "") {
      this.alertService.showAlert("Debe ingresar un tipo de licencia", "Ingrese licencia")
      return;
    }

    let nuevoConductor: Conductor = {
      id: this.conductoresService.getNuevoId(),
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena,
      rut: this.rut,
      licencia: this.licencia,
      tipo: this.tipo
    };

    if (!this.usuarioService.getUsuarioPorCorreo(this.correo)) {
      if(!this.conductoresService.getConductorPorCorreo(this.correo)){
        this.conductoresService.ingresarConductor(nuevoConductor);

        this.alertService.showAlert("Conductor registrado con éxito.", "Registro exitoso");
        this.irAInicio();
      }
      else {
        this.alertService.showAlert("El correo ingresado ya está registrado.", "Error al registrar");
        return;
      }
    }
    else {
      this.alertService.showAlert("El correo ingresado ya existe como usuario.", "Error al registrar");
      return;
    }
  }
}
