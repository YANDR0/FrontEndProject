import { Injectable } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Users } from '../types/users';
import { Observable } from 'rxjs';
import { HttpService } from './shared/http-service';

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

  loginGoogle(): Observable<any>{
    return this.httpService.getHttp('session/google')
  }
}
