import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Perez',
      correo: 'ju.perez@duocuc.cl',
      contrasena: '123'
    },
    {
      id: 2,
      nombre: 'Pedro',
      apellido: 'Picapiedra',
      correo: 'pe.picapiedra@duocuc.cl',
      contrasena: '321'
    },
  ];

  getNuevoId() {
    return this.usuarios.length + 1;
  }

  getUsuarioPorCorreo(correo: string) {
    return this.usuarios.find(usuario => usuario.correo === correo);
  }

  getUsuarioPorId(id: number) {
    return this.usuarios.find(usuario => usuario.id === id);
  }

  ingresarUsuario(usuario: Usuario) {
    this.usuarios.push(usuario);
  }

  constructor() { }
}
