import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/global/alert.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnInit {

  @Input() usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    esConductor: false
  }

  // Utilizado para agregar/elimar clases de CSS dependiendo de la plataforma
  // Se actuliza en el constructor
  plataformaNoEsIos: boolean = true;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private platform: Platform,
    private navController: NavController,
    private auth: AngularFireAuth,
  ) {
    this.plataformaNoEsIos = !this.platform.is('ios');
  }

  ngOnInit() { }

  async cerrarSesion() {
    let confirm = await this.alertService.showConfirm("¿Está seguro que desea cerrar sesión?", "Si", "No");
    if (confirm) {
      // Cerrar sesion con firebase
      this.auth.signOut().then(() => {
        console.log('Sesion cerrada');
        this.alertService.showAlert("Vuelve pronto.", "Sesión Finalizada");
        this.irAInicio();
      }
      ).catch((error) => {
        // Manejar el error
        console.log('Error al cerrar sesion');
      }
      );
    }
  }

  irAInicio() {
    this.navController.setDirection('back');
    this.router.navigate(['/inicio-sesion']);
  }

  irAVehiculo() {
    this.router.navigate(['/registrar-vehiculo']);
  }
}
