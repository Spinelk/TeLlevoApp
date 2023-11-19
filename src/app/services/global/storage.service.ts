import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Preferences } from '@capacitor/preferences';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculo } from 'src/app/models/vehiculo';

const storageUsuario = 'usuarioData';
const storageVehiculo = 'vehiculoData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public conductorActualizado: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private auth: AngularFireAuth
  ) { }

  async getItem(llave: string): Promise<string | null> {
    //obj = await localStorage.getItem(llave); PREGUNTAR
    const obj = await Preferences.get({ key: llave });
    return obj.value;
  }

  async setItem(llave: string, valor: string) {
    await Preferences.set({ key: llave, value: valor })
  }

  //storage USUARIOS

  //obtener un array de usuarios
  async obtenerUsuarios() {
    const storageData = await this.getItem(storageUsuario);
    if (storageData == null) {
      return [];
    }

    const data: Usuario[] = JSON.parse(storageData);
    if (data) {
      return data;
    } else {
      return [];
    }
  }

  //obtener un usuario por su correo
  async obtenerUsuarioPorCorreo(correo: string = '') {
    const usuarios = await this.obtenerUsuarios();
    for (const i of usuarios) {
      if (i.correo == correo) {
        return i;
      }
    }
    return null;
  }

  //Recibe un array dentro del que se encuentra el usuario a agregar y agrega los ya guardados
  async agregarUsuario(users: Usuario[]) { //id:number, nombre:string, apellido:string, correo:string, urlImagenPerfil:string, esConductor:boolean
    const usuarios = await this.obtenerUsuarios();
    for (const i of usuarios) {
      if (i) {
        users.push(i);
      }
    }

    this.setItem(storageUsuario, JSON.stringify(users));
  }


  async eliminarUsuario(correo: string) { //id:number, nombre:string, apellido:string, correo:string, urlImagenPerfil:string, esConductor:boolean
    const usuarios = await this.obtenerUsuarios();
    for (const i of usuarios) {
      if (i.correo == correo) {
        usuarios.splice(usuarios.indexOf(i));
      }
    }
    this.setItem(storageUsuario, JSON.stringify(usuarios));
  }

  async modificarUsuario(user: Usuario) { //id:number, nombre:string, apellido:string, correo:string, urlImagenPerfil:string, esConductor:boolean
    await this.eliminarUsuario(user.correo);
    var usuario = [
      {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        esConductor: user.esConductor,
        urlImagenPerfil: user.urlImagenPerfil,
        licencia: user.licencia,
        rut: user.rut
      }
    ]
    await this.agregarUsuario(usuario);
    this.conductorActualizado.emit();
  }

  async cargarUsuario() {
    const user = await this.auth.currentUser;
    if (user?.email) {
      const usuario = await this.obtenerUsuarioPorCorreo(user.email);
      if (usuario != null) {
        return usuario;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  //storage VEHICULOS

  //obtener un array de usuarios
  async obtenerVehiculos() {
    const storageData = await this.getItem(storageVehiculo);
    if (storageData == null) {
      return [];
    }

    const data: Vehiculo[] = JSON.parse(storageData);
    if (data) {
      return data;
    } else {
      return [];
    }
  }

  async obtenerVehiculoPorCorreo(correo: string = '') {
    const vehiculos = await this.obtenerVehiculos();
    for (const i of vehiculos) {
      if (i.conductor == correo) {
        return i;
      }
    }
    return null;
  }

  async agregarVehiculo(vehicles: Vehiculo[]) { //id:number, nombre:string, apellido:string, correo:string, urlImagenPerfil:string, esConductor:boolean
    const vehiculos = await this.obtenerVehiculos();
    for (const i of vehiculos) {
      if (i) {
        vehicles.push(i);
      }
    }

    this.setItem(storageVehiculo, JSON.stringify(vehicles));
  }

  async cargarVehiculo() {
    const user = await this.auth.currentUser;
    if (user?.email) {
      const vehiculo = await this.obtenerVehiculoPorCorreo(user.email);
      if (vehiculo != null) {
        return vehiculo;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
