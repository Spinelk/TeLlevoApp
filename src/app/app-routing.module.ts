import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'inicio-sesion',
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
    path: 'principal/:correo',
    loadChildren: () => import('./pages/menu/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./pages/login/recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'solicitar-viaje',
    loadChildren: () => import('./pages/viajero/solicitar-viaje/solicitar-viaje.module').then( m => m.SolicitarViajePageModule)
  },
  {
    path: 'vehiculo/:correo',
    loadChildren: () => import('./pages/conductor/vehiculo/vehiculo.module').then( m => m.VehiculoPageModule)
  },
  {
    path: 'confirmar-solicitud',
    loadChildren: () => import('./pages/viajero/solicitar-viaje/confirmar-solicitud/confirmar.module').then( m => m.ConfirmarPageModule)
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./pages/login/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
