import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  form: FormGroup;

  constructor(formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
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

  signUp() {
    if (this.form.valid && this.passwordsMatch()) {
      console.log('Sign up successful');
      //TODO - Add sign up logic
      this.router.navigate(['../home'], { relativeTo: this.activatedRoute });
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

  navLogin() {
    this.router.navigate(['../login'], { relativeTo: this.activatedRoute });
  }
}
