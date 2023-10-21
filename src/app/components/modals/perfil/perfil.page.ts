// Angular/Ionic
import { Component, Input, Injectable, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

// Servicios
import { HelperService } from 'src/app/services/global/helper.service';
import { StorageService } from 'src/app/services/global/storage.service';

// Modelos
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  loading: boolean = true;
  @Input() dataModal: Usuario[] = [];

  constructor(
    private modalController: ModalController,
    private storageService: StorageService,
    private helper: HelperService,
  ) { }

  ngOnInit() {
    setTimeout(this.simularCargaAvatar, 1000);
  }

  close() {
    this.modalController.dismiss();
  }

  simularCargaAvatar = () => {
    this.loading = false;
  }

  async mostrarModal() {
    const usuario = await this.storageService.cargarUsuario();
    var info = [];
    info.push(
      {
        nombre: usuario?.nombre,
        apellido: usuario?.apellido,
        correo: usuario?.correo,
        esConductor: usuario?.esConductor,

        urlImagenPerfil: usuario?.urlImagenPerfil,
        rut: usuario?.rut,
        licencia: usuario?.licencia,
      }
    );

    const parametros = { dataModal: info };
    this.helper.showModal(PerfilPage, parametros, true);
  }
}
