import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  error: string | null = null;
  loading = false;

  onSubmit() {
    if (this.form.invalid) return;

    this.error = null;
    this.loading = true;

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        const role = this.authService.getRole();
        const route = role?.toLowerCase() === 'admin' ? '/admin' : '/client';
        this.router.navigate([route]);
      },
      error: (err) => {
        this.error = 'Correo o contraseña inválidos';
        this.loading = false;
      }
    });
  }
}

