import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../../services/register.service';
import { Users } from '../../../types/users';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  form: FormGroup;

  constructor(formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private registerService: RegisterService, private authService: AuthService) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  passwordsMatch(): boolean {
    return this.form.get('password')?.value === this.form.get('confirmPassword')?.value;
  }

  register() {
    if (this.form.valid && this.passwordsMatch()) {
      const userData: Users = {
        email: this.form.value.email,
        name: this.form.value.username,
        password: this.form.value.password,
        role: 1
      };

      // Llama al servicio de registro
      this.registerService.register(userData).subscribe({
        next: (response) => {
          console.log('ando en el next');
          this.authService.saveToken(response.token); // Asegúrate de que el token se devuelva en la respuesta
          this.router.navigate(['../home'], { relativeTo: this.activatedRoute });
        },
        error: (error) => {
          console.error('Error during registration:', error);
          alert('Registration failed. Please try again.');
          this.form.reset();
        }
      });
    }
    else if (!this.passwordsMatch()) {
      alert('Passwords do not match');
      this.form.reset();
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
