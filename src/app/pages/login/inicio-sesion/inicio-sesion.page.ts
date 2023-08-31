import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/login/usuarios.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  correo:string = "";
  contrasena:string = "";
  
  constructor(
    private router:Router,
    private usuarioService:UsuariosService
    ) { }

  ngOnInit() {
  }

  iniciar(){
    if (this.correo == "") {
      alert("Debe ingresar un correo.");
      return;
    }
    if (this.contrasena == "") {
      alert("Debe ingresar una contraseña.")
      return;
    }
    

    let usuario = this.usuarioService.getUsuarioPorCorreo(this.correo);

    if (this.correo == usuario?.correo && this.contrasena == usuario.contrasena) {
      this.router.navigate(['/principal', usuario.correo]);
      return;
    }
    
    alert("Usuario o contraseña incorrectos.");
  }

  registro(){
    this.router.navigateByUrl("registro");
  }
}
