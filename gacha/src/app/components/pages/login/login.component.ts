import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Users } from '../../../types/users';
import { environment } from '../../../../environments/environment';

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
    private loginService: LoginService
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
        next: () => {
          console.log('Login successful');
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
    const googleAuthUrl = `${environment.SERVER_URL}session/google`;
    window.location.href = googleAuthUrl;
  }
}
