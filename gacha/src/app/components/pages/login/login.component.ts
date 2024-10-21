import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;

  constructor(formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    if (this.form.valid) {
      console.log('Login successful');
      //TODO - Add login logic
      this.router.navigate(['../home'], { relativeTo: this.activatedRoute });
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
