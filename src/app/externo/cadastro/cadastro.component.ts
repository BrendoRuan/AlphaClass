import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      nome: [''],
      telefone: [''],
      rua: [''],
      bairro: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.cadastroForm.valid) {
      this.errorMsg = '';
      try {
        await this.authService.register(this.cadastroForm.value);
        this.router.navigate(['/home']);
      } catch (error: any) {
        this.errorMsg = error.message || 'Erro no cadastro';
      }
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
}
