import { Injectable } from '@angular/core';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpService: HttpService) { }

  getAllCategories() {
    return this.httpService.getHttp('restaurant');
  }
  
}
