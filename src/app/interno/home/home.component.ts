import { Component, OnInit } from '@angular/core';
import { LivroService } from '../../service/livro.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  imports:[CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  livrosRecentes: any[] = [];
  livrosMaisLidos: any[] = [];

  constructor(private livroService: LivroService, private router: Router) {}

  ngOnInit(): void {
    this.livroService.getLivros().subscribe((livros: any[]) => {
      const livrosOrdenados = [...livros].sort((a, b) =>
        new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime()
      );

      this.livrosRecentes = livrosOrdenados.slice(0, 3);
      this.livrosMaisLidos = livros.filter(livro => livro.maisLido);
    });
  }

  gotoadicionarLivro() {
  this.router.navigate(['components/adicionarLivros']); // crie essa rota ou mude conforme necessário
}
  gotoPerfil(){
    this.router.navigate(['interno/perfil']);
  }

  gotoLivros(){
    this.router.navigate(['interno/livros']);
  }
  
  gotobuscar(){
    this.router.navigate(['components/buscar']);
  }

  gotoCadastro(){
    this.router.navigate(['externo/cadastro']);
  }
}
