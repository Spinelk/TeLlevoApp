import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/login/usuarios.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  email:string = "";
  contrasena:string = "";
  
  constructor(
    private router:Router,
    private usuarioService:UsuariosService
    ) { }

  ngOnInit() {
  }

  login(){
    if (this.email == "") {
      alert("Debe ingresar un email.");
      return;
    }
    if (this.contrasena == "") {
      alert("Debe ingresar una contraseña.")
      return;
    }
    

    let usuario = this.usuarioService.getUsuarioPorCorreo(this.email);

    if (this.email == usuario?.correo && this.contrasena == usuario.contrasena) {
      console.log("Usuario: ", this.email);
      console.log("Contraseña: ", this.contrasena);
      this.router.navigateByUrl("principal");
      return;
    }
    
    alert("Usuario o contraseña incorrectos.");
  }

  registro(){
    this.router.navigateByUrl("registro");
  }
}
