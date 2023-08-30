import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  login(){
    this.router.navigateByUrl("principal");
  }

  registro(){
    this.router.navigateByUrl("registro");
  }
}
