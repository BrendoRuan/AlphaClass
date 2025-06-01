import { Component, OnInit } from '@angular/core';
import { LivroService } from '../../service/livro.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss'
})
export class BuscarComponent  implements OnInit {

   livros: any[] = [];
  livrosFiltrados: any[] = [];
  categoria: string = '';

  constructor(private livroService: LivroService, private router: Router) {}

  ngOnInit() {
    this.livroService.getLivros().subscribe((res) => {
      this.livros = res;
      this.livrosFiltrados = res;
    });
  }

  filtrarPorCategoria() {
    const termo = this.categoria.trim().toLowerCase();
    this.livrosFiltrados = this.livros.filter((livro) =>
      livro.categoria?.toLowerCase().includes(termo)
    );
  }

  gotoVoltarHome(){
    this.router.navigate(['interno/home']);
  }
}
