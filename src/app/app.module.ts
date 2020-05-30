import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductListItemComponent} from './product-list/product-list-item/product-list-item.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './shared/helpers/jwt.interceptor';
import {ErrorInterceptor} from './shared/helpers/error.interceptor';
import {ManageProductsComponent} from './admin/manage-products/manage-products.component';
import {SidenavComponent} from './admin/sidenav/sidenav.component';
import {AddProductComponent} from './admin/add-product/add-product.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {AddBannerComponent} from './admin/add-banner/add-banner.component';
import {ManageBannersComponent} from './admin/manage-banners/manage-banners.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductListComponent,
    ProductListItemComponent,
    SignInComponent,
    ManageProductsComponent,
    SidenavComponent,
    AddProductComponent,
    DashboardComponent,
    AddBannerComponent,
    ManageBannersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
