import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../modules/material/material.module';


@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss'
})
export class RestaurantComponent { 

}
