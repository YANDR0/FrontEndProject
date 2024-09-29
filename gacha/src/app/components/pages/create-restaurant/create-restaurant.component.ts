import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-restaurant',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './create-restaurant.component.html',
  styleUrl: './create-restaurant.component.scss'
})
export class CreateRestaurantComponent {

}
