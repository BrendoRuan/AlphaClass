import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { get } from '@angular/fire/database';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

  perfilForm!: FormGroup;
  carregando: boolean = false;
  mensagemErro: string = '';
  mensagemSucesso: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.perfilForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      senhaAtual: [''],     // Necessário para mudar email ou senha
      novaSenha: ['']
    });

    // Preenche os dados atuais do usuário no formulário
    const usuario = await this.authService.getUsuarioAtual();
    if (usuario) {
      // Tenta carregar dados adicionais do Firestore
      // Se você quiser, pode criar um método para pegar esses dados do Firestore e popular aqui
      this.perfilForm.patchValue({
        nome: usuario.displayName || '',
        email: usuario.email || '',
        telefone: '' // se tiver telefone salvo no Firestore, preencha aqui
      });
    }
  }

  async salvarPerfil() {
    this.mensagemErro = '';
    this.mensagemSucesso = '';
    this.carregando = true;

    if (this.perfilForm.invalid) {
      this.mensagemErro = 'Por favor, preencha corretamente os campos obrigatórios.';
      this.carregando = false;
      return;
    }

    const dados = this.perfilForm.value;

    // Se trocar email ou senha, senhaAtual é obrigatória
    if ((dados.email !== (await this.authService.getUsuarioAtual())?.email || dados.novaSenha) && !dados.senhaAtual) {
      this.mensagemErro = 'Para alterar e-mail ou senha, informe a senha atual.';
      this.carregando = false;
      return;
    }

    // Validação mínima para nova senha
    if (dados.novaSenha && dados.novaSenha.length > 0 && dados.novaSenha.length < 6) {
      this.mensagemErro = 'A nova senha deve ter pelo menos 6 caracteres.';
      this.carregando = false;
      return;
    }

    try {
      await this.authService.atualizarPerfil(dados);
      this.mensagemSucesso = 'Perfil atualizado com sucesso!';
      this.perfilForm.patchValue({ senhaAtual: '', novaSenha: '' }); // limpa senhas no form
    } catch (error: any) {
      this.mensagemErro = error.message || 'Erro ao atualizar perfil.';
    } finally {
      this.carregando = false;
    }
  }

  // Métodos auxiliares para facilitar acesso aos controles do formulário no template
  get nome() { return this.perfilForm.get('nome'); }
  get email() { return this.perfilForm.get('email'); }
  get telefone() { return this.perfilForm.get('telefone'); }
  get senhaAtual() { return this.perfilForm.get('senhaAtual'); }
  get novaSenha() { return this.perfilForm.get('novaSenha'); }
}