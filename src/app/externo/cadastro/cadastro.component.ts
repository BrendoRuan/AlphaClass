import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  errorMsg = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: [''],
      rua: [''],
      bairro: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const novoUsuario = {
        ...this.cadastroForm.value,
        senha: this.cadastroForm.value.password
      };

      this.usuarioService.cadastrar(novoUsuario).subscribe({
        next: () => this.router.navigate(['/externo/login']),
        error: () => this.errorMsg = 'Erro ao cadastrar usuário. Tente novamente.'
      });
    }
  }
}
