import { Injectable } from '@angular/core';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpService: HttpService) { }

  getAllRestaurants() {
    return this.httpService.getHttp('restaurant');
  }
}
