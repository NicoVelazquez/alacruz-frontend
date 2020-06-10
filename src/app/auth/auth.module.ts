import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthRoutingModule} from './auth-routing.module';


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
