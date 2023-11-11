// Angular/Ionic
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { IonCard, AnimationController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';

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

  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;
  private animacionNombre!: Animation;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private helper: HelperService,
    private animationCtrl: AnimationController,
  ) {

  }

  ngOnInit() {
    this.cargarUsuario();
    this.cargarVehiculo();

    this.storageService.conductorActualizado.subscribe(() => {
      // Lógica para actualizar el componente, por ejemplo, cargar el botón
      this.cargarUsuario();
    });

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


  // Eliminar o remplazar esta animación
  ngAfterViewInit() {
    this.animacionNombre = this.animationCtrl
      .create()
      .addElement(document.querySelectorAll("#nombreUsuario"))
      .duration(7000)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(350px)', 'translateX(-350px)')
      .fromTo('opacity', '1', '0.2');

    this.animacionNombre.play();
  }
}
