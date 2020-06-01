import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public async getAllProducts(): Promise<Product[]> {
    return this.http.get<any>(`${environment.apiUrl}product/all`).toPromise();
  }


  public createProduct(product: Product): Promise<Product> {
    return this.http.post<any>(`${environment.apiUrl}product/create`, product).toPromise();
  }

  public editProduct(product: Product): Promise<Product> {
    return this.http.post<any>(`${environment.apiUrl}product/edit`, product).toPromise();
  }

  /**
   * Deletes the product selected
   * @param _id: id of the product to delete
   * Returns: id of the product deleted
   */
  // tslint:disable-next-line:variable-name
  public deleteProduct(_id: string): Promise<string> {
    return this.http.post<any>(`${environment.apiUrl}product/delete`, {_id}).toPromise();
  }
}
