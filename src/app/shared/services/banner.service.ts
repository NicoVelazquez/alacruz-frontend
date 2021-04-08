import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Banner} from '../models/banner';
import {AuthService} from './auth.service';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getAllBanners(): Promise<Banner[]> {
    return this.http.get<any>(`${environment.apiUrl}banner/all`).toPromise();
  }

  public createBanner(banner: Banner): Promise<Banner> {
    if (this.authService.isAdmin()) {
      return this.http.post<any>(`${environment.apiUrl}banner/create`, banner).toPromise();
    } else {
      return new Promise<Banner>((resolve, reject) => {
        throw new Error(`You don't have permissions to create Banners`);
      });
    }
  }

  public editBanner(banner: Banner): Promise<Banner> {
    if (this.authService.isAdmin()) {
      return this.http.post<any>(`${environment.apiUrl}banner/edit`, banner).toPromise();
    } else {
      return new Promise<Banner>((resolve, reject) => {
        throw new Error(`You don't have permissions to modify Banners`);
      });
    }
  }

  /**
   * Deletes the banner selected
   * @param id: id of the banner to delete
   * Returns: id of the banner deleted
   */
  public deleteBanner(id: string): Promise<string> {
    if (this.authService.isAdmin()) {
      return this.http.post<any>(`${environment.apiUrl}banner/delete`, {_id: id}).toPromise();
    } else {
      return new Promise<string>((resolve, reject) => {
        throw new Error(`You don't have permissions to delete Banners`);
      });
    }
  }
}
