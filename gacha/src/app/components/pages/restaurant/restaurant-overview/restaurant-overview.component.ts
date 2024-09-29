import { Component } from '@angular/core';
import { MaterialModule } from '../../../../modules/material/material.module';

@Component({
  selector: 'app-restaurant-overview',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './restaurant-overview.component.html',
  styleUrl: './restaurant-overview.component.scss'
})
export class RestaurantOverviewComponent {

}
