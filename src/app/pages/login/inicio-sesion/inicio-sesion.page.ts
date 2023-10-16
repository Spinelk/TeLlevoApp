import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/global/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ClipboardService } from 'src/app/services/global/clipboard.service';
import { StorageService } from 'src/app/services/global/storage.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  correo: string = "";
  contrasena: string = "";


  constructor(
    private router: Router,
    private storageService: StorageService,
    private alertService: HelperService,
    private clipboardService: ClipboardService,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {
    //Redirigir a principal si ya hay un usuario logeado
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.router.navigate(['/principal']);
        return;
      }
    });
    this.checkClipboard();
  }

  async checkClipboard() {
    try {
      const clipboardData = await this.clipboardService.checkClipboard();
      // Puedes hacer algo con los datos, como mostrarlos en la consola
      console.log('Clipboard Data:', clipboardData);
    } catch (error) {
      console.error('Error checking clipboard:', error);
    }
  }

  async copiarPortapapeles() {
    await this.clipboardService.copiarPortapapeles(this.correo);
  }



  async iniciar() {
    // Validar que el correo y la contraseña no esten vacios
    if (this.correo == "") {
      this.alertService.showAlert("Debe ingresar un correo para iniciar sesión.", "Ingrese un correo");
      return;
    }
    if (this.contrasena == "") {
      this.alertService.showAlert("Debe ingresar una contraseña para iniciar sesión.", "Ingrese una contraseña");
      return;
    }

    // Iniciar sesion con firebase
    try {
      await this.auth.signInWithEmailAndPassword(this.correo, this.contrasena);
      // Si el inicio de sesion fue exitoso, enviar a la pagina principal
      localStorage.setItem('correoUsuario', this.correo);
      const loader = await this.alertService.showLoading("Cargando");
      setTimeout(async () => {
        await loader.dismiss();
        await this.alertService.showAlert("Bienvenido a TeLlevoAPP.", "");
        await this.router.navigate(['/principal']);

      }, 500);
    }
    catch (error: any) {
      // Manejar errores de firebase
      if(error.code == 'auth/user-not-found'){
        this.storageService.eliminarUsuario(this.correo);
        await this.alertService.showAlert("La cuenta no existe. Tal vez ha sido eliminada","Error");
        return;
      }
      this.alertService.showAlert(error.code, "Credenciales inválidas");
      return;
    }

  }




  irARegistro() {
    this.router.navigateByUrl("registro-usuario");
  }

  irACambiarContrasena() {
    this.router.navigateByUrl("cambiar-contrasena");
  }
}
