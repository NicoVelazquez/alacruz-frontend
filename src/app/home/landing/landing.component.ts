import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {BannerService} from '../../shared/services/banner.service';
import {Product} from '../../shared/models/product';
import {Banner} from '../../shared/models/banner';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  products: Product[] = [new Product('', './assets/images/product-loader.svg'),
    new Product('', './assets/images/product-loader.svg'),
    new Product('', './assets/images/product-loader.svg')];
  featuredProducts: Product[] = [new Product('', './assets/images/product-loader.svg'),
    new Product('', './assets/images/product-loader.svg'),
    new Product('', './assets/images/product-loader.svg')];
  banners: Banner[] = [new Banner('', './assets/images/banner-loader.svg')];

  constructor(private productService: ProductService, private bannerService: BannerService) {
  }

  ngOnInit(): void {
    this.productService.getFeaturedProducts().then(products => this.featuredProducts = products);

    this.productService.getRegularProducts().then(products => this.products = products);

    this.bannerService.getAllBanners().then(banners => this.banners = banners);
  }

}
