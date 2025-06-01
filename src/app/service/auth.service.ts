import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private baseUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.baseUrl}?email=${email}&senha=${senha}`).pipe(
      map(usuarios => {
        const usuario = usuarios[0];
        if (usuario) {
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
  }

  usuarioLogado() {
    return JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
  }

  estaLogado(): boolean {
    return !!localStorage.getItem('usuarioLogado');
  }

  getUsuarioLogadoId(): number | null {
  const usuario = this.usuarioLogado();
  return usuario ? usuario.id : null;
  }
}