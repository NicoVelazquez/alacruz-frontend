import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Product} from '../models/product';
import {Banner} from '../models/banner';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public createProduct(product: Product): Promise<Product> {
    if (this.authService.isAdmin()) {
      return this.http.post<any>(`${environment.apiUrl}product/create`, product).toPromise();
    } else {
      return new Promise<Banner>((resolve, reject) => {
        throw new Error(`You don't have permissions to create Products`);
      });
    }
  }

  public editProduct(product: Product): Promise<Product> {
    if (this.authService.isAdmin()) {
      return this.http.post<any>(`${environment.apiUrl}product/edit`, product).toPromise();
    } else {
      return new Promise<Banner>((resolve, reject) => {
        throw new Error(`You don't have permissions to modify Products`);
      });
    }
  }

  /**
   * Deletes the product selected
   * @param id: id of the product to delete
   * Returns: id of the product deleted
   */
  public deleteProduct(id: string): Promise<string> {
    if (this.authService.isAdmin()) {
      return this.http.post<any>(`${environment.apiUrl}product/delete`, {_id: id}).toPromise();
    } else {
      return new Promise<string>((resolve, reject) => {
        throw new Error(`You don't have permissions to delete Products`);
      });
    }
  }

  public async getAllProducts(): Promise<Product[]> {
    return this.http.get<any>(`${environment.apiUrl}product/all`).toPromise();
  }

  public async getFeaturedProducts(): Promise<Product[]> {
    return this.http.get<any>(`${environment.apiUrl}product/featured`).toPromise();
  }

  public async getRegularProducts(): Promise<Product[]> {
    return this.http.get<any>(`${environment.apiUrl}product/regular`).toPromise();
  }
}
