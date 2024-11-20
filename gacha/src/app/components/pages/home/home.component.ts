import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { RestaurantService } from '../../../services/shared/restaurant.service';
import { Restaurants } from '../../../types/restaurants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  restaurants: Restaurants[] = [];
  trending: Restaurants[] = [];
  top10: Restaurants[] = [];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.getAllRestaurants().subscribe((data: any) => {
      this.restaurants = data;

      this.trending = this.restaurants.sort((a, b) => {
        return b.rating - a.rating;
      }).slice(0, 6);

      this.top10 = this.restaurants.sort((a, b) => {
        return b.rating - a.rating;
      }).slice(0, 10);
    });
  }
}
