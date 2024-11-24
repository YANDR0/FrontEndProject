import { Injectable } from '@angular/core';
import { HttpService } from './shared/http-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private httpService: HttpService, private router: Router) { }

  createElement(userId: string, restaurantId: string, score: number){
    const category = '';
    const data = {userId, restaurantId, category, score};
    console.log(data);
    return this.httpService.postHttpAuth('list',data);
  }

  getElements(userId: string){
    const data = {userId};
    return this.httpService.postHttpAuth('list/user',data)
  }

}
