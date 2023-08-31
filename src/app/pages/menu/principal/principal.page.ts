import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/login/usuarios.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: any;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuariosService
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

}
