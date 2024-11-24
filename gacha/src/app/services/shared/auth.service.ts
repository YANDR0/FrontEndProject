import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../../types/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenObservable: BehaviorSubject<string> = new BehaviorSubject('');
  userObservable: BehaviorSubject<string> = new BehaviorSubject('');
  currUser: Users|undefined;
  currToken: string|undefined;

  constructor() {
    // Comprobar si el token existe en el sessionStorage al iniciar el servicio
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    if (token) {
      this.tokenObservable.next(token); // Si existe, guarda el token en el observable
    }
    if (user) {
      this.userObservable.next(user); // Si existe, guarda el token en el observable
    }
  }

  getToken(){   //De mientras, creo que está mal y se debería obtener del observable
    return sessionStorage.getItem('token') || '';
  }

  getUser(){   //De mientras, creo que está mal y se debería obtener del observable
    return sessionStorage.getItem('user') || '';
  }

  saveToken(token: string) {
    sessionStorage.setItem('token', token); // Guardar en sessionStorage
    this.currToken = token;
    this.tokenObservable.next(token);
  }

  saveUser(user: Users) {
    const strUser = JSON.stringify(user);
    sessionStorage.setItem('user', strUser); // Guardar en sessionStorage
    this.currUser = user;
    this.userObservable.next(strUser);
    console.log(user, this.currUser);
  }

  deleteToken() {
    this.currToken = undefined;
    sessionStorage.removeItem('token'); // Eliminar de sessionStorage
    sessionStorage.clear();
    this.tokenObservable.next(''); // Limpia el observable
  }

  getRole(){
    const user:Users = JSON.parse(this.getUser());
    const role = user.role;
    return role;
  }

  getUserId(){
    const user:Users = JSON.parse(this.getUser());
    const role = user._id;
    return role;
  }

  isLoggedIn(): boolean {
    // Verificar si el token aún existe en sessionStorage
    return !!sessionStorage.getItem('token');
  }

}
