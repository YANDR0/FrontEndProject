import { Injectable } from '@angular/core';
import { HttpServiceService } from './shared/http-service.service';
import { Observable } from 'rxjs';
import { Users } from '../types/users'; // Asegúrate de ajustar la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseRoute = 'user'; // Ajusta esta ruta según tu API

  constructor(private httpService: HttpServiceService) { }

  getUserData(): Observable<Users> {
    const user = sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user);  // Retorna un Observable con los datos del usuario
    } else {
      // Si no hay usuario en sessionStorage, retornamos un observable vacío o un error
      throw new Error('Usuario no encontrado en sessionStorage');
    }
  }

  updateUserData(data: FormData): Observable<any> {
    return this.httpService.putHttpAuth('user/config', data); // Ajusta la ruta según tu backend
  }
}