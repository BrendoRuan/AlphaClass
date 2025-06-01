import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { LivroService } from '../../service/livro.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-adicionar-livro',
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './adicionar-livro.component.html',
  styleUrls: ['./adicionar-livro.component.scss']
})
export class AdicionarLivroComponent {
  livroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
    private router: Router
  ) {
    this.livroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      resumo: ['', Validators.required],
      capa: ['', Validators.required]
    });
  }

  salvarLivro() {
    if (this.livroForm.valid) {
      this.livroService.adicionarLivro(this.livroForm.value).subscribe(() => {
        alert('Livro adicionado com sucesso!');
        this.router.navigate(['/home']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/home']);
  }

  gotoVoltarHome(){
    this.router.navigate(['interno/home']);
  }
}
