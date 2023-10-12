import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  constructor(
    private alertService: AlertController,
    private loadingController: LoadingController
    ) { }

  async showAlert(msg:string, tittle:string){
    var alert = await this.alertService.create({cssClass:"alertClass", header:tittle, message:msg, buttons:["Aceptar"]});
    await alert.present();
    return alert;
  }

  async showConfirm(msg:string, btn_confirmar:string, btn_cancelar:string){
    let promise = new Promise<boolean>( async (resolve)=>
    {
      var alert = await this.alertService.create(
        {
          cssClass:"ConfirmarCss",
          message:msg,
          buttons:
          [
            {
              text:btn_confirmar,
              handler: () => {
                resolve(true);
              }
            },
            {
              text:btn_cancelar,
              handler: () => {
                resolve(false);
              }
            }
          ]
        });
        await alert.present();
    });
    return promise;
  }

  async showLoading(msg:string){
    var loader = await this.loadingController.create(
      {
        cssClass:"loaderCss",message:msg,translucent:true
      });
    await loader.present();
    return loader;
  }

}
