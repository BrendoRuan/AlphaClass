import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.scss'
})
export class LivrosComponent {
   livros = [
    {
      titulo: 'O Código da Inteligência',
      capa: 'https://m.media-amazon.com/images/I/71ZDlYh5RjL.jpg',
      resumo: 'Uma reflexão sobre como nossa mente pode criar o sucesso ou o fracasso.',
      autor: 'Augusto Cury'
    },
    {
      titulo: 'A Garota do Lago',
      capa: 'https://m.media-amazon.com/images/I/81jxc6L0OCL.jpg',
      resumo: 'Uma jovem é encontrada morta em uma cidade pacata e segredos começam a vir à tona.',
      autor: 'Charlie Donlea'
    },
    {
      titulo: 'Mindset',
      capa: 'https://m.media-amazon.com/images/I/71xLmdLOQ0L.jpg',
      resumo: 'O livro que mudou a forma como o mundo pensa sobre sucesso.',
      autor: 'Carol S. Dweck'
    }
  ];
}
