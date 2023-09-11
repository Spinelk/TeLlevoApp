import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/login/usuarios.service';

@Component({
  selector: 'app-solicitar-viaje',
  templateUrl: './solicitar-viaje.page.html',
  styleUrls: ['./solicitar-viaje.page.scss'],
})
export class SolicitarViajePage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    ) { }

  ngOnInit() {
  }

  irAConfirmar() {
    console.log("Se presiono el boton de solicitar");
    this.router.navigateByUrl("confirmar-solicitud");
  }
}
