import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/global/alert.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';
import { IonCard, AnimationController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: any;
  tipo: number = 0;

  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;
  private animation!: Animation;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private alertService: AlertService,
    private animationCtrl: AnimationController
  ) { }

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
      const correo = params['correo'];
      this.usuario = this.usuarioService.getUsuarioPorCorreo(correo);
      // this.tipo = tipo;
    });

  }

  play() {
    this.animation.play();
  }


  irAInicio() {
    this.router.navigateByUrl("inicio-sesion");
  }

  irASolicitar() {
    this.router.navigateByUrl("solicitar");
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
