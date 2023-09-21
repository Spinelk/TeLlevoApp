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
      esConductor: false
    },
    {
      id: 2,
      nombre: 'Pedro',
      apellido: 'Picapiedra',
      correo: 'pe.picapiedra@duocuc.cl',
      esConductor: false
    },
    {
      id: 3,
      nombre: 'José',
      apellido: 'Silva',
      correo: 'jo.silva@duocuc.cl',
      rut: '111-1',
      licencia: 'Clase A',
      esConductor: true
    },
    {
      id: 4,
      nombre: 'Guillermo',
      apellido: 'Villacura',
      correo: 'pgy4121-003d',
      rut: '111-1',
      licencia: 'Clase A',
      esConductor: true
    },
    {
      id: 5,
      nombre: 'Fernanda',
      apellido: 'Valenzuela',
      correo: 'fe.valenzuela@duocuc.cl',
      esConductor: false
    },
    {
      id: 6,
      nombre: 'Kevin',
      apellido: 'Espinel',
      correo: 'ke.espinel@duocuc.cl',
      rut: '26.370.443-6',
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

  registrarUsuario(usuario: Usuario) {
    this.usuarios.push(usuario);
  }

  constructor() { }
}
