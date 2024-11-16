import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  constructor(private router: Router, private authService: AuthService) {
    // Verifica si el usuario está logueado
    if (!this.authService.isLoggedIn()) {
      // Si no está logueado, redirige al login
      this.router.navigate(['login']); 
    }
  }
}
