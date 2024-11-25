import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Restaurants } from '../../types/restaurants';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpService: HttpService, private router: Router) { }

  createRestaurant(data: FormData): Observable<Restaurants> {
    return this.httpService.postHttpAuth('restaurant', data); // Ajusta la ruta según tu backend
  }

  getAllRestaurants() {
    return this.httpService.getHttp('restaurant');
  }

  getRestaurantData(_id: string) {
    const data = { _id }
    return this.httpService.postHttpAuth('restaurant/info', data);
  }

  getUrlId() {
    const url = this.router.url.split('/');
    let last = url.pop();
    last = last != 'reviews' ? last : url.pop();
    return last ? last : "";
  }

  deleteElement(_id: string){
    const data = {_id};
    return this.httpService.deleteHttpAuth('restaurant', data);
  }
}
