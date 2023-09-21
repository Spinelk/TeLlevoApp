import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
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
    urlImagenPerfil: '',
    esConductor: false
  }

  // Utilizado para agregar/elimar clases de CSS dependiendo de la plataforma
  // Se actuliza en el constructor
  plataformaNoEsIos: boolean = true;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private platform: Platform
  ) {
    this.plataformaNoEsIos = !this.platform.is('ios');
  }

  ngOnInit() { }

  async cerrarSesion() {
    let confirm = await this.alertService.showConfirm("¿Está seguro que desea cerrar sesión?", "Si", "No");
    if (confirm) {

      this.alertService.showAlert("Vuelve pronto.", "Sesión Finalizada");
      this.irAInicio();
    }
  }

  irAInicio() {
    this.router.navigate(['/inicio-sesion']);
  }

  irAVehiculo() {
    this.router.navigate(['/vehiculo', this.usuario.correo]);
  }
}
