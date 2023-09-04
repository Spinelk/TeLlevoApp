import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/global/alert.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private alertService: AlertService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const usuarioCorreo = params['correo'];
      if (usuarioCorreo) {
        const correo = usuarioCorreo;
        this.usuario = this.usuarioService.getUsuarioPorCorreo(correo);
      }
    });
  }

  irAInicio() {
    this.router.navigateByUrl("inicio-sesion");
  }

  cerrarSesion() {
    this.alertService.showAlert("Vuelve pronto.", "Sesión Finalizada");
    this.irAInicio();
  }
}
