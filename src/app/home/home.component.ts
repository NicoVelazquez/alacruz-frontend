import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {BannerService} from '../shared/services/banner.service';
import {Product} from '../shared/models/product';
import {Banner} from '../shared/models/banner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[];
  banners: Banner[];

  constructor(private productService: ProductService, private bannerService: BannerService) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().then(products => this.products = products);

    this.bannerService.getAllBanners().then(banners => this.banners = banners);
  }

}
