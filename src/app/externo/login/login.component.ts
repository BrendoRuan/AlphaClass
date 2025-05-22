import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
     this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
   get usuario() {
    return this.loginForm.get('usuario');
  }

  get senha() {
    return this.loginForm.get('senha');
  }

  onSubmit() {
  if (this.loginForm.valid) {
    const { usuario, senha } = this.loginForm.value;

    this.authService.login(usuario, senha)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Erro no login:', error);
      });

  } else {
    this.loginForm.markAllAsTouched();
  }
}

  loginGoogle() {
    this.authService.loginWithGoogle();
  }
}
