import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/global/helper.service';
import { StorageService } from 'src/app/services/global/storage.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.page.html',
  styleUrls: ['./confirmar.page.scss'],
})
export class ConfirmarPage implements OnInit {

  patente: any;
  vehiculo: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navController: NavController,
    private alertService: HelperService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    // Suscribirse a los cambios en los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      // Obtener el valor del parámetro de la URL
      this.patente = params.get('id');
    });

    this.storageService.obtenerVehiculoPorPatente(this.patente).then((vehiculo) => {
      this.vehiculo = vehiculo;
    });
  }

  confirmar() {
    this.alertService.showAlert("Espera la respuesta del conductor", "Viaje Solicitado.");

    setTimeout(() => {
      this.navController.setDirection('back');
      this.router.navigate(['/principal']);
    }, 1);
  }
}
