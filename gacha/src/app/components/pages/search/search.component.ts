import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

}
