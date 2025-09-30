import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message: string = '';
  registerModeSignal = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerModeSignal.set(false);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registerMode() {
    this.registerModeSignal.set(true);
  }

  async login() {
    if (this.loginForm.invalid) {
      this.message = 'Por favor completa el formulario correctamente.';
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      await this.authService.login(email, password);
      this.message = 'Login exitoso!';
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.message = 'Error: ' + err.message;
    }
  }

  async register() {
    if (this.loginForm.invalid) {
      this.message = 'Por favor completa el formulario correctamente.';
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      await this.authService.register(email, password);
      this.message = 'Usuario registrado!';
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.message = 'Error: ' + err.message;
    }
  }
}
