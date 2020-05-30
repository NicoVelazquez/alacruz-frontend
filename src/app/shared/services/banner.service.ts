import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) {
  }

  public getAllBanners(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}banner/all`).toPromise();
  }

  public createBanner(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}banner/create`, formData).toPromise();
  }

  public editBanner(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}banner/edit`, formData).toPromise();
  }

  public deleteBanner(id: string) {
    return this.http.post<any>(`${environment.apiUrl}banner/delete`, {id}).toPromise();
  }
}
