import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Banner} from '../models/banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) {
  }

  public getAllBanners(): Promise<Banner[]> {
    return this.http.get<any>(`${environment.apiUrl}banner/all`).toPromise();
  }

  public createBanner(banner: Banner): Promise<Banner> {
    return this.http.post<any>(`${environment.apiUrl}banner/create`, banner).toPromise();
  }

  public editBanner(banner: Banner): Promise<Banner> {
    return this.http.post<any>(`${environment.apiUrl}banner/edit`, banner).toPromise();
  }

  /**
   * Deletes the banner selected
   * @param _id: id of the banner to delete
   * Returns: id of the banner deleted
   */
  // tslint:disable-next-line:variable-name
  public deleteBanner(_id: string): Promise<string> {
    return this.http.post<any>(`${environment.apiUrl}banner/delete`, {_id}).toPromise();
  }
}
