import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';
import { Restaurants } from '../../../types/restaurants';
import { RestaurantService } from '../../../services/shared/restaurant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  restaurants: Restaurants[] = [];
  filteredRestaurants: Restaurants[] = [];
  search: string = '';

  constructor(private router: Router, private authService: AuthService, private restaurantsService: RestaurantService) {
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

  }

  filterRestaurants() {
    this.filteredRestaurants = this.restaurants.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(this.search.toLowerCase());
    });
  }
}
