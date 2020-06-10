import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {AddProductComponent} from './add-product/add-product.component';
import {ManageProductsComponent} from './manage-products/manage-products.component';
import {AddBannerComponent} from './add-banner/add-banner.component';
import {ManageBannersComponent} from './manage-banners/manage-banners.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'add-product', pathMatch: 'full'},
      {path: 'add-product', component: AddProductComponent},
      {path: 'manage-products', component: ManageProductsComponent},
      {path: 'add-banner', component: AddBannerComponent},
      {path: 'manage-banners', component: ManageBannersComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
