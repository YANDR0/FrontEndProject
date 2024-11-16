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
      this.tokenObservable.next(token); // Si existe, guarda el token en el observable
    }
  }

  getToken(){   //De mientras, creo que está mal y se debería obtener del observable
    return sessionStorage.getItem('token') || '';
  }

  saveToken(token: string) {
    sessionStorage.setItem('token', token); // Guardar en sessionStorage
    this.tokenObservable.next(token);
  }

  deleteToken() {
    sessionStorage.removeItem('token'); // Eliminar de sessionStorage
    sessionStorage.clear();
    this.tokenObservable.next(''); // Limpia el observable
  }

  isLoggedIn(): boolean {
    // Verificar si el token aún existe en sessionStorage
    return !!sessionStorage.getItem('token');
  }

}
