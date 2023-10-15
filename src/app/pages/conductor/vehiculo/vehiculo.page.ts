import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Vehiculo } from 'src/app/models/vehiculo';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  @Input() dataModal:Vehiculo[]=[];

  constructor(private modalController:ModalController) { }

  ngOnInit() {
    console.log("Información modal", this.dataModal);

  }

  close(){
    this.modalController.dismiss();
  }



}
