import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

@Input() dataModal:Usuario[]=[];


  constructor(private modalController:ModalController){ }

  ngOnInit() {
    console.log("Información modal", this.dataModal);
  }

  close(){
    this.modalController.dismiss();
  }
}
