import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Preferences } from '@capacitor/preferences';
import { Usuario } from 'src/app/models/usuario';

  const storageUsuario = 'usuarioData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public correoUsuario = "";

  constructor(
    private auth: AngularFireAuth
  ) { }

  async getItem(llave:string):Promise<string | null>{
    //obj = await localStorage.getItem(llave); PREGUNTAR
    const obj = await Preferences.get({key: llave});
    return obj.value;
  }

  async setItem(llave:string, valor:string){
    await Preferences.set({key:llave, value:valor})
  }

  async obtenerUsuarios(){
    const storageData = await this.getItem(storageUsuario);
    if (storageData == null) {
      return [];
    }

    const data:Usuario[] = JSON.parse(storageData);
    if (data) {
      return data;
    }else{
      return [];
    }
  }

  async obtenerUsuarioPorCorreo(correo: string=''){
    const usuarios = await this.obtenerUsuarios();
    for (const i of usuarios) {
      if (i.correo == correo) {
        return i;
      }
    }
    return null;
  }

  async agregarUsuario(user:Usuario[]){ //id:number, nombre:string, apellido:string, correo:string, urlImagenPerfil:string, esConductor:boolean
    const usuarios = await this.obtenerUsuarios();
    for (const i of usuarios) {
      if (i) {
        user.push(i);
      }
    }

    this.setItem(storageUsuario,JSON.stringify(user));
  }

  async eliminarUsuario(correo: string){ //id:number, nombre:string, apellido:string, correo:string, urlImagenPerfil:string, esConductor:boolean
      const usuarios = await this.obtenerUsuarios();
      for (const i of usuarios) {
        if (i.correo == correo) {
          usuarios.splice(usuarios.indexOf(i));
        }
        this.agregarUsuario(usuarios);
      }
    }

    async cargarUsuario(){
      const user = await this.auth.currentUser;
      console.log(user?.email);
        if (user?.email) {
          const usuario = await this.obtenerUsuarioPorCorreo(user.email);
          console.log(usuario);
          if (usuario != null) {
            return usuario;
          } else {
            return null;
          }
        } else {
          return null;
        }
    }

}
