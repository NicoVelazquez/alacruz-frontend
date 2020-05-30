import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getAllProducts(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}product/all`).toPromise();
  }

  public createProduct(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}product/create`, formData).toPromise();
  }

  public editProduct(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}product/edit`, formData).toPromise();
  }

  public deleteProduct(id: string) {
    return this.http.post<any>(`${environment.apiUrl}product/delete`, {id}).toPromise();
  }
}
