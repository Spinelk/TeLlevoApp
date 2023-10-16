import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-solicitar-viaje',
  templateUrl: './solicitar-viaje.page.html',
  styleUrls: ['./solicitar-viaje.page.scss'],
})
export class SolicitarViajePage implements OnInit {

  constructor(
    private router: Router,
    private auth: AngularFireAuth,

  ) { }

  ngOnInit() {
    // Redirigir a inicio de sesion si no hay usuario
    // this.auth.onAuthStateChanged(user => {
    //   if (!user) {
    //     this.router.navigate(['/inicio-sesion']);
    //     return;
    //   }
    // });
  }

  irAConfirmar() {
    this.router.navigate(['/confirmar-solicitud']);
  }


}
