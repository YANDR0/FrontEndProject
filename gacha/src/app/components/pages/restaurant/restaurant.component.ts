import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../modules/material/material.module';
import { AuthService } from '../../../services/shared/auth.service';
import { Restaurants } from '../../../types/restaurants';
import { RestaurantService } from '../../../services/shared/restaurant.service';
import { ListsService } from '../../../services/lists.service';


@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, RouterLink],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss'
})
export class RestaurantComponent implements OnInit {

  id: string = "";
  restaurant: Restaurants | undefined;
  stars = "";
  show = false;
  score = 6;

  constructor(private router: Router, private authService: AuthService, private restaurantService: RestaurantService, private listService: ListsService) {
    // Verifica si el usuario está logueado
    if (!this.authService.isLoggedIn()) {
      // Si no está logueado, redirige al login
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.id = this.restaurantService.getUrlId()
    this.restaurantService.getRestaurantData(this.id).subscribe(
      (data: Restaurants) => {
        if (!data) this.router.navigate(['not-found']);
        this.restaurant = data;
        console.log(this.restaurant)
        this.stars = "★".repeat(this.restaurant.rating) + "☆".repeat(5 - this.restaurant.rating);
      },
      (err) => {
        this.restaurant = undefined;
        this.router.navigate(['not-found']);
      }
    )
  }


  modifyScore(plus: number){
    if(this.score == 10 && plus > 0) return
    if(this.score == 0 && plus < 0) return
    this.score += plus;
  }


  listConfirm(){

    this.listService.createElement(this.authService.getUserId() + '', this.restaurant?._id + '', this.score).subscribe(() => {
      this.show = false;
    })
    
  }
}
