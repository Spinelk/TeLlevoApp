import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/global/alert.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';
import { IonCard, AnimationController, Platform } from '@ionic/angular';
import type { Animation } from '@ionic/angular';

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
    contrasena: '',
    urlImagenPerfil: '',
    esConductor: false
  }

  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;
  private animacionNombre!: Animation;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private animationCtrl: AnimationController,
  ) {

  }

  ngAfterViewInit() {
    this.animacionNombre = this.animationCtrl
      .create()
      .addElement(document.querySelectorAll("#cardOne"))
      .duration(7000)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(350px)', 'translateX(-350px)')
      .fromTo('opacity', '1', '0.2');

    this.animacionNombre.play();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usuario.correo = params['correo'];
      const usuarioEncontrado = this.usuarioService.getUsuarioPorCorreo(this.usuario.correo);

      if (usuarioEncontrado !== undefined) {
        this.usuario = usuarioEncontrado;
      } else {
        // Manejar el caso en el que no se encuentra ningún usuario con el correo especificado
      }
    });
  }

  irASolicitar() {
    this.router.navigate(['/solicitar-viaje']);
  }
  irAVehiculo() {
    this.router.navigate(['/vehiculo', this.usuario.correo]);
  }
}
