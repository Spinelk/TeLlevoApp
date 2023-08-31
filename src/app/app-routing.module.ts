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
    path: 'registro',
    loadChildren: () => import('./pages/login/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'principal/:correo',
    loadChildren: () => import('./pages/menu/principal/principal.module').then( m => m.PrincipalPageModule)
  },  {
    path: 'recuperar',
    loadChildren: () => import('./pages/login/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
