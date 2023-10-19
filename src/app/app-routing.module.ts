import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard'
const redireccionarlogin = () => redirectUnauthorizedTo(['/inicio-sesion']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/login/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./pages/login/registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule)
  },
  {
    path: 'principal',
    canActivate: [AngularFireAuthGuard], data:{authGuardPipe:redireccionarlogin},
    loadChildren: () => import('./pages/menu/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'solicitar-viaje',
    canActivate: [AngularFireAuthGuard], data:{authGuardPipe:redireccionarlogin}, //PREGUNTAR! es necesario? o solo menú principal?
    loadChildren: () => import('./pages/viajero/solicitar-viaje/solicitar-viaje.module').then( m => m.SolicitarViajePageModule)
  },
  {
    path: 'confirmar-solicitud/:id',
    canActivate: [AngularFireAuthGuard], data:{authGuardPipe:redireccionarlogin}, //PREGUNTAR! es necesario? o solo menú principal?
    loadChildren: () => import('./pages/viajero/solicitar-viaje/confirmar-solicitud/confirmar.module').then( m => m.ConfirmarPageModule)
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./pages/login/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },
  {
    path: 'registrar-vehiculo',
    canActivate: [AngularFireAuthGuard], data:{authGuardPipe:redireccionarlogin}, //PREGUNTAR! es necesario? o solo menú principal?
    loadChildren: () => import('./pages/conductor/registrar-vehiculo/registrar-vehiculo.module').then( m => m.RegistrarVehiculoPageModule)
  },
  {
    path: 'registrar-conductor',
    canActivate: [AngularFireAuthGuard], data:{authGuardPipe:redireccionarlogin},
    loadChildren: () => import('./pages/conductor/registrar-conductor/registrar-conductor.module').then( m => m.RegistrarConductorPageModule)
  },
  {
    path: 'perfil',
    canActivate: [AngularFireAuthGuard], data:{authGuardPipe:redireccionarlogin},
    loadChildren: () => import('./pages/menu/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'vehiculo',
    canActivate: [AngularFireAuthGuard], data:{authGuardPipe:redireccionarlogin},
    loadChildren: () => import('./pages/conductor/vehiculo/vehiculo.module').then( m => m.VehiculoPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
