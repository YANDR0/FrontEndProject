import { Component } from '@angular/core';
import { MaterialModule } from '../../../../modules/material/material.module';

@Component({
  selector: 'app-restaurant-reviews',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './restaurant-reviews.component.html',
  styleUrl: './restaurant-reviews.component.scss'
})
export class RestaurantReviewsComponent {

}
