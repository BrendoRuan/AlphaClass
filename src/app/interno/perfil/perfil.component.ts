import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  usuarios: any[] = [];
  livros: any[] = [];

  usuarioSelecionado: any = null;
  livroSelecionado: any = null;

  usuarioForm!: FormGroup;
  livroForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.carregarUsuarios();
    this.carregarLivros();
  }

  carregarUsuarios() {
    this.http.get<any[]>('http://localhost:3000/usuarios').subscribe(data => {
      this.usuarios = data;
    });
  }

  carregarLivros() {
    this.http.get<any[]>('http://localhost:3000/livros').subscribe(data => {
      this.livros = data;
    });
  }

  editarUsuario(usuario: any) {
    this.usuarioSelecionado = usuario;
    this.usuarioForm = this.fb.group({
      nome: [usuario.nome, Validators.required],
      email: [usuario.email, [Validators.required, Validators.email]],
      telefone: [usuario.telefone, Validators.required],
      rua: [usuario.rua || ''],
      bairro: [usuario.bairro || ''],
      senha: [usuario.senha || '', Validators.minLength(6)]
    });
  }

  salvarEdicaoUsuario() {
    if (this.usuarioForm.invalid) return;

    const atualizado = this.usuarioForm.value;
    this.http.put(`http://localhost:3000/usuarios/${this.usuarioSelecionado.id}`, atualizado).subscribe(() => {
      this.usuarioSelecionado = null;
      this.carregarUsuarios();
    });
  }

  cancelarEdicaoUsuario() {
    this.usuarioSelecionado = null;
  }

  editarLivro(livro: any) {
    this.livroSelecionado = livro;
    this.livroForm = this.fb.group({
      titulo: [livro.titulo, Validators.required],
      autor: [livro.autor, Validators.required],
      resumo: [livro.resumo || ''],
      capa: [livro.capa || ''],
      categoria: [livro.categoria || ''],
      maisLido: [livro.maisLido || false],
      dataPublicacao: [livro.dataPublicacao ? livro.dataPublicacao.substring(0,10) : ''] // YYYY-MM-DD
    });
  }

  salvarEdicaoLivro() {
    if (this.livroForm.invalid) return;

    const atualizado = this.livroForm.value;
    this.http.put(`http://localhost:3000/livros/${this.livroSelecionado.id}`, atualizado).subscribe(() => {
      this.livroSelecionado = null;
      this.carregarLivros();
    });
  }

  cancelarEdicaoLivro() {
    this.livroSelecionado = null;
  }

  deletarUsuario(usuario: any) {
    if (confirm(`Tem certeza que deseja excluir o usuário "${usuario.nome}"?`)) {
      this.http.delete(`http://localhost:3000/usuarios/${usuario.id}`).subscribe(() => {
        this.carregarUsuarios();
      });
    }
  }

  deletarLivro(livro: any) {
    if (confirm(`Tem certeza que deseja excluir o livro "${livro.titulo}"?`)) {
      this.http.delete(`http://localhost:3000/livros/${livro.id}`).subscribe(() => {
        this.carregarLivros();
      });
    }
  }

  gotoVoltarHome() {
    this.router.navigate(['interno/home']);
  }
}
