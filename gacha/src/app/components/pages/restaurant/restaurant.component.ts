import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../modules/material/material.module';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss'
})
export class RestaurantComponent { 
  constructor(private router: Router, private authService: AuthService) {
    // Verifica si el usuario está logueado
    if (!this.authService.isLoggedIn()) {
      // Si no está logueado, redirige al login
      this.router.navigate(['login']); 
    }
  }
}
