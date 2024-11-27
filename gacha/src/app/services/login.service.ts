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
    return this.httpService.getHttpAuth('session/profile').pipe(
      map((user) => {
        console.log("Datos del usuario recibido desde el backend:", user);
        this.authService.saveUser(user); // Guarda la información del usuario
        return user;
      }),
      catchError((error) => {
        console.error('Error en el login con Google:', error);
        return of();
      }),
    );
  }

}
