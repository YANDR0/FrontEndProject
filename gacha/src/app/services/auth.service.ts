import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenObservable: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  constructor() {
    // CHECK if token exist in local storage
  }

  saveToken(token: string) {
    this.tokenObservable.next(token);
  }

  deleteToken() {
    this.tokenObservable.next(undefined);
  }
}
