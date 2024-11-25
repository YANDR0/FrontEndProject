import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';
import { Restaurants } from '../../../types/restaurants';
import { RestaurantService } from '../../../services/shared/restaurant.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../../types/category';
import { filter } from 'rxjs';
import { CategoriesService } from '../../../services/shared/categories.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  categories: Category[] = [];
  restaurants: Restaurants[] = [];
  filteredRestaurants: Restaurants[] = [];
  search = false;

  category = "";
  ubication = 0;
  minScore = 0;
  maxScore = 5;
  minCost = 0;
  maxCost = 1000;


  constructor(private router: Router, private authService: AuthService, private restaurantsService: RestaurantService, private categoriesService: CategoriesService) {
    // Verifica si el usuario está logueado
    if (!this.authService.isLoggedIn()) {
      // Si no está logueado, redirige al login
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.restaurantsService.getAllRestaurants().subscribe((data: Restaurants[]) => {
      this.restaurants = data;
      console.log(this.restaurants);
    });
    this.categoriesService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
      console.log(this.categories)
    })
    //this.categoriesService.
  }

  resetValues(){
    this.search = false;
    this.category = "";
    this.ubication = 0;
    this.minScore = 0;
    this.maxScore = 5;
    this.minCost = 0;
    this.maxCost = 1000;
  }

  filterRestaurants() {
    this.search = true;

    console.log(this.category, this.ubication);

    this.filteredRestaurants = this.restaurants.filter((r) => {
      let valid = true;
      
      if(this.ubication) valid &&= r.location == this.ubication
      if(this.category) valid &&= r.category.includes(this.category);
      if(this.maxScore != 5 || this.minScore != 0)
        valid &&= (r.rating <= this.maxScore && r.rating >= this.minScore); 
      if(this.maxCost != 1000 || this.minCost != 0)
        valid &&= (r.price <= this.maxCost && r.price >= this.minCost); 

      return valid;
    });
    
  }

  changePage(_id: string|undefined){
    this.router.navigate(['restaurant/'+_id]);
  }
}
