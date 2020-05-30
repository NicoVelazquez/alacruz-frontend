import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {DashboardComponent} from './admin/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home/:section', component: HomeComponent},
  {path: 'admin', component: SignInComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'dashboard/:section', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
