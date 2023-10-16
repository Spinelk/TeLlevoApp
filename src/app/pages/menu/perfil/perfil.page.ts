import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
loading:boolean = true;
@Input() dataModal:Usuario[]=[];


  constructor(private modalController:ModalController){ }

  ngOnInit() {
    console.log("Información modal", this.dataModal);
    setTimeout(this.simularCargaAvatar,2000);
  }

  close(){
    this.modalController.dismiss();
  }

  simularCargaAvatar = () => {
    this.loading = false;
  }
}
