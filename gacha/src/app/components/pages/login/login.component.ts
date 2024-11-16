import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { AuthService } from '../../../services/shared/auth.service';
import { Users } from '../../../types/users';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;

  constructor(formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginService, private authService: AuthService) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    if (this.form.valid) {
      const userData: Users = { 
        email: this.form.value.email, 
        password: this.form.value.password
      }

      this.loginService.login(userData).subscribe({
        next: (response) => {
          console.log('Login successful');
          this.authService.saveToken(response.token)
          this.router.navigate(['../home'], { relativeTo: this.activatedRoute });
        },
        error: (error) => {
          console.error('Error during login:', error);
          alert('Login failed. Please try again.');
          this.form.reset();
        } 
      })
    }
    else {
      alert('Please fill in all fields');
      this.form.reset();
    }
  }

  navRegister() {
    this.router.navigate(['../register'], { relativeTo: this.activatedRoute });
  }
}
