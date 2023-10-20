// Angular/Ionic
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

// Servicios
import { HelperService } from '../global/helper.service';
import { StorageService } from '../global/storage.service';
import { AvatarService } from '../global/avatar.service';

// Modelos
import { Avatar } from 'src/app/models/avatar';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  avatares: Avatar[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertService: HelperService,
    private storageService: StorageService,
    private avatarService: AvatarService,
    private helper: HelperService,
    private navController: NavController,
    private menuCtrl: MenuController,
  ) { }


  async obtenerAvatar() {
    try {
      const response = await this.avatarService.getAvatar();
      this.avatares = response.results;
      return this.avatares[Math.floor(Math.random() * this.avatares.length)].image;
    } catch (error) {
      console.error("Error al cargar avatares", error);
      return "";
    }
  }


  // Iniciar sesión con correo y contraseña
  async iniciarSesion(correo: string, contrasena: string) {
    // Validar que el correo y la contraseña no esten vacios
    if (correo == "") {
      this.alertService.showAlert("Debe ingresar un correo. Por favor, intenta de nuevo.", "Ingrese un correo");
      return;
    }
    if (contrasena == "") {
      this.alertService.showAlert("Debe ingresar una contraseña para iniciar sesión.", "Ingrese una contraseña");
      return;
    }

    // Validar que el correo exista en el array de usuarios
    const usuario = await this.storageService.obtenerUsuarioPorCorreo(correo);
    if (!usuario) {
      this.alertService.showAlert("La cuenta no esta registrada o ha sido eliminada.", "La cuenta no existe");
      return;
    }

    // Iniciar sesión
    return this.afAuth.signInWithEmailAndPassword(correo, contrasena).then(async (userCredential) => {
      // Inicio de sesión exitoso
      localStorage.setItem('correoUsuario', correo);
      const loader = await this.alertService.showLoading("Cargando");
      setTimeout(async () => {
        await loader.dismiss();
        await this.alertService.showAlert("Bienvenido a TeLlevoAPP.", "");
        await this.router.navigate(['/principal']);
      }, 500);
    }).catch((error) => {
      // Manejar errores de inicio de sesión
      const codigoError = error.code;
      switch (codigoError) {
        case "auth/user-not-found":
          this.alertService.showAlert("La cuenta no esta registrada o ha sido eliminada.", "La cuenta no existe");
          break;
        case "auth/invalid-email":
          this.alertService.showAlert("Ingresa una direccion de correo válida.", "Correo no válido");
          break;
        case "auth/missing-password":
          this.alertService.showAlert("Debe ingresar una contraseña. Por favor, intenta de nuevo.", "Debe ingresar una contraseña");
          break;
        case "auth/invalid-login-credentials":
          this.alertService.showAlert("Verifica tus credenciales de inicio de sesión.", "Credenciales no válidas");
          break;
        case "auth/wrong-password":
          this.alertService.showAlert("Verifica tus credenciales de inicio de sesión.", "Credenciales no válidas");
          break;
        default:
          this.alertService.showAlert("Hubo un error al iniciar sesión. Por favor, intenta de nuevo más tarde.", "Error al iniciar sesión: " + codigoError);
      }
    });
  }


  // Registrar usuario con correo y contraseña
  async registrarUsuario(nombre: string, apellido: string, correo: string, contrasena: string, verificadorContrasena: string) {
    // Validar que los campos no esten vacios
    // Validar longitud minima
    if (nombre == "") {
      this.alertService.showAlert("Debe ingresar un nombre.", "Ingrese un nombre");
      return;
    }
    if (nombre.length < 2) {
      this.alertService.showAlert("El nombre debe tener al menos dos caracteres.", "Ingrese un nombre valido");
      return;
    }
    if (apellido == "") {
      this.alertService.showAlert("Debe ingresar un apellido.", "Ingrese un apellido")
      return;
    }
    if (apellido.length < 2) {
      this.alertService.showAlert("El apellido debe tener al menos dos caracteres.", "Ingrese un apellido valido")
      return;
    }
    if (correo == "") {
      this.alertService.showAlert("Debe ingresar un correo.", "Ingrese un correo");
      return;
    }
    if (contrasena == "") {
      this.alertService.showAlert("Debe ingresar una contraseña.", "Ingrese una contraseña")
      return;
    }
    if (contrasena && contrasena.length < 6) {
      this.alertService.showAlert("La contraseña debe tener al menos 6 caracteres.", "Ingrese una contraseña")
      return;
    }
    if (verificadorContrasena == "") {
      this.alertService.showAlert("Debe ingresar la contraseña nuevamente.", "Verifique la contraseña")
      return;
    }
    if (contrasena !== verificadorContrasena) {
      this.alertService.showAlert("Las contraseñas no coinciden.", "Error al verificar contraseña");
      return;
    }

    // Validar que el correo no exista en el array de usuarios
    const usuario = await this.storageService.obtenerUsuarioPorCorreo(correo);
    if (usuario) {
      this.alertService.showAlert("El correo ya está en uso, intenta con otro.", "Correo en uso");
      return;
    }

    const nroUsuarios = (await this.storageService.obtenerUsuarios()).length;


    // Registrar en local storage
    var nuevoUsuario =
      [
        {
          id: nroUsuarios + 1,
          nombre: nombre,
          apellido: apellido,
          correo: correo,
          esConductor: false,
          urlImagenPerfil: await this.obtenerAvatar()
        }
      ]
    this.storageService.agregarUsuario(nuevoUsuario);


    // registrar en firebase
    return this.afAuth.createUserWithEmailAndPassword(correo, contrasena)
      .then((userCredential) => {
        // Registro exitoso
        this.alertService.showAlert("Bienvenido a TeLlevoAPP.", "Registro exitoso");

        this.router.navigate(['/principal']);
      }).catch((error) => {
        const codigoError = error.code;
        switch (codigoError) {
          case "auth/email-already-in-use":
            this.alertService.showAlert("El correo ya se encuentra en uso, intenta con otro.", "Correo en uso");
            break;
          case "auth/missing-email":
            this.alertService.showAlert("Debe ingresar un correo. Por favor, intenta de nuevo.", "Ingrese un correo");
            break;
          case "auth/invalid-email":
            this.alertService.showAlert("Ingresa una direccion de correo válida.", "Correo no válido");
            break;
          case "auth/missing-password":
            this.alertService.showAlert("Debe ingresar una contraseña. Por favor, intenta de nuevo.", "Ingrese una contraseña");
            break;
          case "auth/weak-password":
            this.alertService.showAlert("La contraseña es muy débil. Debe tener al menos 6 caracteres.", "Contraseña débil");
            break;
          default:
            this.alertService.showAlert("Hubo un error al crear la cuenta. Por favor, intenta de nuevo más tarde.", "Error al crear la cuenta");
        }
      });
  }


  async cerrarSesion() {
    // Confirmar que se desea cerrar sesion
    let confirm = await this.alertService.showConfirm("¿Está seguro que desea cerrar sesión?", "Si", "No");
    if (!confirm) {
      return;
    }

    this.menuCtrl.close();

    // Cerrar sesion con firebase
    const loader = await this.helper.showLoading("Cerrando sesión...");
    this.afAuth.signOut().then(() => {
      localStorage.removeItem("correoUsuario");
      setTimeout(() => {
        loader.dismiss();
        this.helper.showAlert("Vuelve pronto.", "Sesión Finalizada");
        this.navController.setDirection('back');
        this.router.navigate(['/inicio-sesion']);
      }, 1000);
    }
    ).catch((error) => {
      // Manejar el error
      this.alertService.showAlert("Hubo un error al cerrar sesión. Por favor, intenta de nuevo más tarde.", "Error al cerrar sesión")
    }
    );
  }


  async enviarCorreoCambioContrasena(correo: string) {
    // Validar que el correo no este vacio
    if (correo == "") {
      this.alertService.showAlert("Debe ingresar un correo para la recuperación.", "Ingrese un correo");
      return;
    }

    // Verificar existencia del usuario
    const usuario = await this.storageService.obtenerUsuarioPorCorreo(correo);
    if (!usuario) {
      this.alertService.showAlert("El correo ingresado no existe.", "Correo inválido");
      return;
    }

    // Enviar correo de recuperación
    this.afAuth.sendPasswordResetEmail(correo)
      .then(() => {
        this.alertService.showAlert("Se ha enviado un correo a " + correo + " con las instrucciones para recuperar su contraseña.",
          "Correo enviado");
      })
      .catch((error) => {
        const errorCode = error.code;
        this.alertService.showAlert("Hubo un error al enviar el correo. Por favor, intenta de nuevo más tarde.", "Error al enviar correo: " + errorCode);
      });
  }


  // obtenerEstadoAutenticacion() {
  //   return this.afAuth.authState;
  // }
}
