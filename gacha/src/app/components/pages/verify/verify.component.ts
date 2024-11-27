import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private loginService: LoginService, private activadedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activadedRoute.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        this.authService.saveToken(token);
        this.loginService.loginGoogle().subscribe({
          next: (response) => {
            this.router.navigate(['/home']);
          },
        });
      } else {
        console.error('Error: No se recibió el token');
        this.router.navigate(['/']);
      }
    });
  }
}
