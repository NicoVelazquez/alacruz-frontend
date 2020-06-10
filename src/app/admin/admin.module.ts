import {NgModule} from '@angular/core';
import {ManageProductsComponent} from './manage-products/manage-products.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {AddProductComponent} from './add-product/add-product.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddBannerComponent} from './add-banner/add-banner.component';
import {ManageBannersComponent} from './manage-banners/manage-banners.component';
import {AdminRoutingModule} from './admin-routing.module';
import {PreviewImageComponent} from './preview-image/preview-image.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ManageProductsComponent,
    SidenavComponent,
    AddProductComponent,
    DashboardComponent,
    AddBannerComponent,
    ManageBannersComponent,
    PreviewImageComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
