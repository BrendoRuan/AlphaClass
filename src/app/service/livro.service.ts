import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Livro {
  id: number;
  titulo: string;
  capa: string;
  resumo: string;
  autor: string;
}

@Injectable({ providedIn: 'root' })
export class LivroService {
  private apiUrl = 'http://localhost:3000/livros';

  constructor(private http: HttpClient) {}

  getLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }
  adicionarLivro(livro: any): Observable<any> {
  return this.http.post(this.apiUrl, livro);
  }
}
