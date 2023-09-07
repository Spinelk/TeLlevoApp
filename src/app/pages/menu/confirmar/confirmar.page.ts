import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/global/alert.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.page.html',
  styleUrls: ['./confirmar.page.scss'],
})
export class ConfirmarPage implements OnInit {

  constructor(
    private router: Router,
    private navController: NavController,
    private alertService: AlertService
    ) { }

  ngOnInit() {
  }

  irASolicitar() {
    this.navController.back();
  }

  
  irAInicio() {
    this.alertService.showAlert("Espera la respuesta del conductor", "Viaje Solicitado.");
    this.irASolicitar();
  }
}
