import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {HomeRoutingModule} from './home-routing.module';
import {LandingComponent} from './landing/landing.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductListItemComponent} from './product-list/product-list-item/product-list-item.component';


@NgModule({
  declarations: [
    LandingComponent,
    ProductListComponent,
    ProductListItemComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}
