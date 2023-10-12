import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { IonCard, AnimationController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/services/global/storage.service';

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
    urlImagenPerfil: '',
    esConductor: false
  }

  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;
  private animacionNombre!: Animation;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private animationCtrl: AnimationController,
    private navController: NavController,
    private auth: AngularFireAuth,
  ) {

  }

  ngOnInit() {
    // 1) Redirigir a inicio de sesion si no hay usuario
    // this.auth.onAuthStateChanged(user => {
    //   if (!user) {
    //     this.navController.setDirection('back');
    //     this.router.navigate(['/inicio-sesion']);
    //     return;
    //   }
    //   // 2) Obtener el usuario de firebase
    //   if (user === null) {
    //     // Manejar el caso cuando user es nulo
    //     return;
    //   }
    // });

    this.cargar();
  }

  async cargar(){
    const usuario = await this.storageService.cargarUsuario();
    if (usuario != null) {
      this.usuario = usuario;
    }
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
