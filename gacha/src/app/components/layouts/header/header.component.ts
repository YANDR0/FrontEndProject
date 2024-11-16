import { Component } from '@angular/core';
import { AuthService } from '../../../services/shared/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../modules/material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // Suscribirse al observable para detectar cambios en el estado de autenticación
    this.authService.tokenObservable.subscribe(token => {
      this.isLoggedIn = !!token; // Actualizar estado basado en la presencia del token
    });
  }

  logout() {
    this.authService.deleteToken(); // Eliminar el token
    this.router.navigate(['home']); // Redirigir al usuario a la página de login
  }
}
