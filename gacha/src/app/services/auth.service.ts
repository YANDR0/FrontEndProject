import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenObservable: BehaviorSubject<string > = new BehaviorSubject('');

  constructor() {
    // Comprobar si el token existe en el localStorage al iniciar el servicio
    const token = localStorage.getItem('token');
    if (token) {
      this.saveToken(token); // Si existe, guarda el token en el observable
    }
  }

  saveToken(token: string) {
    localStorage.setItem('token', token); // Guardar en localStorage
    this.tokenObservable.next(token);
  }

  deleteToken() {
    localStorage.removeItem('token'); // Eliminar de localStorage
    this.tokenObservable.next('');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Retorna true si el token existe
  }
}
