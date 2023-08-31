import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertService: AlertController) { }

  async showAlert(msg:string, tittle:string){
    var alert = await this.alertService.create({cssClass:"alertClass", header:tittle, message:msg, buttons:["Aceptar"]});
    await alert.present();
    return alert;
  }
}
