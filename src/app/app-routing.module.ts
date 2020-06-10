import {NgModule} from '@angular/core';
import {NoPreloading, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact/contact.component';


const routes: Routes = [
  {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'contact', component: ContactComponent},
  {path: 'admin', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'dashboard', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', redirectTo: ''},
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {useHash: true})],    // All routes begin with #
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: NoPreloading})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
