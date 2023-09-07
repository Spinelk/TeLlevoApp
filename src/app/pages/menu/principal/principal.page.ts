import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/global/alert.service';
import { ConductoresService } from 'src/app/services/login/conductores.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: any;
  tipo: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private conductorService: ConductoresService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const correo = params['correo'];
      const tipo = params['tipo'];
      if (tipo == 1) {
        this.usuario = this.usuarioService.getUsuarioPorCorreo(correo);
      } else {
        this.usuario = this.conductorService.getConductorPorCorreo(correo);
      }
      this.tipo = tipo;
    });
  }

  irAInicio() {
    this.router.navigateByUrl("inicio-sesion");
  }

  irASolicitar () {
    this.router.navigateByUrl("solicitar");
  }

  irAVehiculo () {
    this.router.navigate(['/vehiculo', this.usuario.correo]);
  }

  cerrarSesion() {
    this.alertService.showAlert("Vuelve pronto.", "Sesión Finalizada");
    this.irAInicio();
  }
}
