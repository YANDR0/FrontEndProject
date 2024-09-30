import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
