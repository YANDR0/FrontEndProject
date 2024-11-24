import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../modules/material/material.module';
import { ListsService } from '../../../../services/lists.service';
import { AuthService } from '../../../../services/shared/auth.service';
import { RestaurantService } from '../../../../services/shared/restaurant.service';
import { Restaurants } from '../../../../types/restaurants';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  userList = []; 
  restaurantList: Restaurants[] = [];

  constructor(private listService: ListsService, private authService: AuthService, private restaurantService: RestaurantService){}


  ngOnInit() {
    const userId = this.authService.getUserId() || '';
    this.listService.getElements(userId).subscribe((res) => {
      this.userList = res;
      for (let i = 0; i < res.length; i++) {
        const resId = res[i].restaurantId;
        this.restaurantService.getRestaurantData(resId).subscribe((data) => {
          this.restaurantList.push(data);
        })
      }
    })
  } 

}
