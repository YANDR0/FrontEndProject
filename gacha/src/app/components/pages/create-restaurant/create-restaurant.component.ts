import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';

@Component({
  selector: 'app-create-restaurant',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './create-restaurant.component.html',
  styleUrl: './create-restaurant.component.scss'
})
export class CreateRestaurantComponent {
  constructor(private router: Router, private authService: AuthService) {
    // Verifica si el usuario está logueado
    if (!this.authService.isLoggedIn()) {
      // Si no está logueado, redirige al login
      this.router.navigate(['login']); 
    }
  }
}
