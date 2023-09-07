import { Injectable } from '@angular/core';
import { Conductor } from 'src/app/models/conductor';

@Injectable({
  providedIn: 'root'
})
export class ConductoresService{

  private conductores: Conductor[] = [
    {
      id: 1,
      nombre: 'José',
      apellido: 'Silva',
      correo: 'jo.silva@duocuc.cl',
      contrasena: '132',
      rut: '111-1',
      licencia: 'Clase A',
      tipo: 2
    },
    {
      id: 2,
      nombre: 'Guillermo',
      apellido: 'Villacura',
      correo: 'pgy4121-003d',
      contrasena: 'pgy4121-003d',
      rut: '111-1',
      licencia: 'Clase A',
      tipo: 2
    },
    
  ];

  getNuevoId() {
    return this.conductores.length + 1;
  }

  getConductorPorCorreo(correo: string) {
    return this.conductores.find(conductor => conductor.correo === correo);
  }

  getConductorPorId(id: number) {
    return this.conductores.find(conductor => conductor.id === id);
  }

  ingresarConductor(conductor: Conductor) {
    this.conductores.push(conductor);
  }

  constructor() { }
}
