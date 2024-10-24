import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenObservable: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    // Comprobar si el token existe en el sessionStorage al iniciar el servicio
    const token = sessionStorage.getItem('token');
    if (token) {
      this.saveToken(token); // Si existe, guarda el token en el observable
    }
  }

  saveToken(token: string) {
    sessionStorage.setItem('token', token); // Guardar en sessionStorage
    this.tokenObservable.next(token);
  }

  deleteToken() {
    sessionStorage.removeItem('token'); // Eliminar de sessionStorage
    sessionStorage.clear();
    this.tokenObservable.next('');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token'); // Retorna true si el token existe
  }
}
