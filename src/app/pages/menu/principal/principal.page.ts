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
    esConductor: false
  }

  // Utilizado para agregar/elimar clases de CSS dependiendo de la plataforma
  // Se actuliza en el constructor
  plataformaNoEsIos: boolean = true;

  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;
  private animation!: Animation;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private alertService: AlertService,
    private animationCtrl: AnimationController,
    private platform: Platform
  ) {
    this.plataformaNoEsIos = !this.platform.is('ios');
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(document.querySelectorAll("#cardOne"))
      .duration(2000)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(100px)', 'translateX(-100px)')
      .fromTo('opacity', '1', '0.2');
    this.play();
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

  play() {
    this.animation.play();
  }


  irAInicio() {
    this.router.navigateByUrl("inicio-sesion");
  }

  irASolicitar() {
    this.router.navigateByUrl("solicitar-viaje");
  }

  irAVehiculo() {
    this.router.navigate(['/vehiculo', this.usuario.correo]);
  }

  async cerrarSesion() {
    let confirm = await this.alertService.showConfirm("¿Está seguro que desea cerrar sesión?", "Si", "No");
    if (confirm) {

      this.alertService.showAlert("Vuelve pronto.", "Sesión Finalizada");
      this.irAInicio();
    }
  }
}
