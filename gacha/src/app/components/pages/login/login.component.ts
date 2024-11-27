import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Users } from '../../../types/users';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/shared/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    if (this.form.valid) {
      const userData: Users = {
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this.loginService.login(userData).subscribe({
        next: (response) => {
          console.log('Login successful');
          console.log('Response:', response);
          this.authService.saveToken(response.token); // Asegúrate de que el token se devuelva en la respuesta
          this.authService.saveUser(response.user._doc); // Asegúrate de que el token se devuelva en la respuesta
          this.router.navigate(['../home'], { relativeTo: this.activatedRoute });
        },
        error: (error) => {
          console.error('Error during login:', error);
          alert('Login failed. Please try again.');
          this.form.reset();
        },
      });
    } else {
      alert('Please fill in all fields');
    }
  }

  navRegister() {
    this.router.navigate(['../register'], { relativeTo: this.activatedRoute });
  }

  loginWithGoogle() {
    window.location.href = `${environment.SERVER_URL}session/google`;
  }
  
}
