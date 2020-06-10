import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact/contact.component';


// When lazy loading modules, they shouldn't be imported in the app.module
const routes: Routes = [
  {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'contact', component: ContactComponent},
  {path: 'admin', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'dashboard', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', redirectTo: ''},
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {useHash: true})],    // All routes begin with #
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],   // Define the preloading strategy
  exports: [RouterModule]
})
export class AppRoutingModule {
}

