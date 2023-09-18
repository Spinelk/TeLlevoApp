import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/login/usuarios.service';
import { IonCard, AnimationController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    esConductor: false
  }

  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;
  private animacionNombre!: Animation;

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private animationCtrl: AnimationController,
    private navController: NavController,
    private auth: AngularFireAuth,
  ) {

  }

  ngOnInit() {
    // 1) Redirigir a inicio de sesion si no hay usuario
    this.auth.onAuthStateChanged(user => {
      if (!user) {
        this.navController.setDirection('back');
        this.router.navigate(['/inicio-sesion']);
        return;
      }
      // 2) Obtener el usuario de firebase
      if (user === null) {
        // Manejar el caso cuando user es nulo
        return;
      }

      // 3) Extraer el correo del usuario
      if (user.email === null) {
        // Manejar el caso cuando user.email es nulo
        return;
      }

      // 4) Buscar el usuario en el arreglo de usuarios
      const usuarioEncontrado = this.usuarioService.getUsuarioPorCorreo(user.email);
      if (!usuarioEncontrado) {
        // Manejar el caso cuando no se encuentra el usuario
        console.log('No se encontro el array al usuario: ' + user.email);
        return;
      }

      // 5) Asignar el usuario encontrado
      this.usuario = usuarioEncontrado;

    });
  }


  // Eliminar o remplazar esta animación
  // ngAfterViewInit() {
  //   this.animacionNombre = this.animationCtrl
  //     .create()
  //     .addElement(document.querySelectorAll("#cardOne"))
  //     .duration(7000)
  //     .iterations(Infinity)
  //     .fromTo('transform', 'translateX(350px)', 'translateX(-350px)')
  //     .fromTo('opacity', '1', '0.2');

  //   this.animacionNombre.play();
  // }
}
