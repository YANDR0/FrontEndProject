import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private authService: AuthService) {
    //Register logic

    this.authService.saveToken('token');
  }
}
