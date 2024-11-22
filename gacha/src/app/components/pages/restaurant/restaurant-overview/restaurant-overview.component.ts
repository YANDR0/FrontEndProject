import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../modules/material/material.module';
import { Restaurants } from '../../../../types/restaurants';
import { RestaurantService } from '../../../../services/shared/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-overview',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './restaurant-overview.component.html',
  styleUrl: './restaurant-overview.component.scss'
})
export class RestaurantOverviewComponent implements OnInit{

  id: string = "";
  restaurant: Restaurants|undefined;

  constructor(private restaurantService: RestaurantService, private router: Router){}


  ngOnInit() {
    this.id = this.restaurantService.getUrlId()

    this.restaurantService.getRestaurantData(this.id).subscribe(
      (data: Restaurants) => {
        if(!data) this.router.navigate(['not-found']); 
        this.restaurant = data;
      },
      (err) => {
        this.restaurant = undefined;
        this.router.navigate(['not-found']); 
      }
    )
  }

}
