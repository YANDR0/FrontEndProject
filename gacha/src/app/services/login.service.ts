import { Injectable } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Users } from '../types/users';
import { Observable } from 'rxjs';
import { HttpServiceService } from './shared/http-service.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpService: HttpServiceService, private authService: AuthService) {
    //Login logic
    
  }

  login(userData: Users): Observable<any>{
    return this.httpService.postHttp('session/login', userData)
  }

  loginGoogle(): Observable<any>{
    return this.httpService.getHttp('session/google')
  }
}
