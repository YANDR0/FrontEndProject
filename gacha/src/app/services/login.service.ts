import { Injectable } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Users } from '../types/users';
import { Observable } from 'rxjs';
import { HttpService } from './shared/http-service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpService: HttpService, private authService: AuthService) {
    //Login logic
  }

  login(userData: Users): Observable<any> {
    return this.httpService.postHttp('session/login', userData)
  }

  loginGoogle(): Observable<any> {
    return this.httpService.getHttp('profile').pipe(
      map((response) => {
        const userData = response;

        this.authService.saveUser(userData);
        //const userDataCopy = { ...userData } as Users;
        //this.authService.setUserData(userDataCopy);

        return response;
      }),
      catchError((error) => {
        console.error('Error en el login con Google: ', error);
        return of();
      }),
    );
  }
}
