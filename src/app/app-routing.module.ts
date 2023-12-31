import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard'
const redireccionarPrincipal = () => redirectLoggedInTo(['principal']);
const redireccionarLogin = () => redirectUnauthorizedTo(['inicio-sesion']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },


  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/login/inicio-sesion/inicio-sesion.module').then(m => m.InicioSesionPageModule)
  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./pages/login/registro-usuario/registro-usuario.module').then(m => m.RegistroUsuarioPageModule)
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./pages/login/cambiar-contrasena/cambiar-contrasena.module').then(m => m.CambiarContrasenaPageModule)
  },

  {
    path: '',
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redireccionarLogin },
    children: [
      {
        path: 'principal',
        loadChildren: () => import('./pages/menu/principal/principal.module').then(m => m.PrincipalPageModule)
      },
      {
        path: 'solicitar-viaje',
        loadChildren: () => import('./pages/viajero/solicitar-viaje/solicitar-viaje.module').then(m => m.SolicitarViajePageModule)
      },
      {
        path: 'confirmar-solicitud/:id',
        loadChildren: () => import('./pages/viajero/solicitar-viaje/confirmar-solicitud/confirmar.module').then(m => m.ConfirmarPageModule)
      },
      {
        path: 'registrar-vehiculo',
        loadChildren: () => import('./pages/conductor/registrar-vehiculo/registrar-vehiculo.module').then(m => m.RegistrarVehiculoPageModule)
      },
      {
        path: 'registrar-conductor',
        loadChildren: () => import('./pages/conductor/registrar-conductor/registrar-conductor.module').then(m => m.RegistrarConductorPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./components/modals/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'vehiculo',
        loadChildren: () => import('./components/modals/vehiculo/vehiculo.module').then(m => m.VehiculoPageModule)
      },
    ]
  },

  {
    path: '**',
    redirectTo: 'principal',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
