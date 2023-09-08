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
      contrasena: '123',
      esConductor: false
    },
    {
      id: 2,
      nombre: 'Pedro',
      apellido: 'Picapiedra',
      correo: 'pe.picapiedra@duocuc.cl',
      contrasena: '321',
      esConductor: false
    },
    {
      id: 3,
      nombre: 'José',
      apellido: 'Silva',
      correo: 'jo.silva@duocuc.cl',
      contrasena: '132',
      rut: '111-1',
      licencia: 'Clase A',
      esConductor: true
    },
    {
      id: 4,
      nombre: 'Guillermo',
      apellido: 'Villacura',
      correo: 'pgy4121-003d',
      contrasena: 'pgy4121-003d',
      rut: '111-1',
      licencia: 'Clase A',
      esConductor: true
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
