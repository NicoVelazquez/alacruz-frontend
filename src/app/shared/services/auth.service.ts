import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  public isAuth() {
    return window.localStorage.getItem('currentUser') !== null;
  }

  public isAdmin() {
    return JSON.parse(window.localStorage.getItem('currentUser')).email === environment.adminEmail;
  }

  public signIn(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}auth/sign-in`, {email, password}).toPromise()
      .then(user => {
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  public signOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

  public sendMail(mail: any) {
    return this.http.post<any>(`${environment.apiUrl}auth/send-mail`, mail).toPromise();
  }
}
