import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {BannerService} from '../shared/services/banner.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products = [];
  banners = [];

  constructor(private productService: ProductService, private bannerService: BannerService) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().then(products => {
      this.products = products;
      this.products.map(e => e.imageUrl = environment.apiUrl + e.imageUrl);
    });

    this.bannerService.getAllBanners().then(banners => {
      this.banners = banners;
      this.banners.map(e => e.imageUrl = environment.apiUrl + e.imageUrl);
    });
  }

}
