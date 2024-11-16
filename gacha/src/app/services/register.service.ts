import { Injectable } from '@angular/core';
import { HttpServiceService } from './shared/http-service.service';
import { AuthService } from './shared/auth.service';
import { Users } from '../types/users'; // Ajusta la ruta si es necesario
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private httpService: HttpServiceService, private authService: AuthService) {
    //Register logic
  }

  register(userData: Users): Observable<any> {
    console.log('ando en el register service');
    return this.httpService.postHttp('session/register', userData); // Ajusta el endpoint según tu API
  }
}
