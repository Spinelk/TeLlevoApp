import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConductoresService } from 'src/app/services/login/conductores.service';
import { UsuariosService } from 'src/app/services/login/usuarios.service';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.page.html',
  styleUrls: ['./solicitar.page.scss'],
})
export class SolicitarPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private conductorService: ConductoresService,

    ) { }

  ngOnInit() {
  }

  irAConfirmar() {
    console.log("Se presiono el boton de solicitar");
    this.router.navigateByUrl("confirmar");
  }
}
