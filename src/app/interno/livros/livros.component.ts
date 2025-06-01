import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LivroService } from '../../service/livro.service';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.scss'
})
export class LivrosComponent {
   livros: any[] = [];

    constructor(private livroService: LivroService, private router: Router) {}

  ngOnInit() {
    this.livroService.getLivros().subscribe((res) => {
      this.livros = res;
    });
  }
  gotoVoltarhome(){
    this.router.navigate(['interno/home']);
  }
}
