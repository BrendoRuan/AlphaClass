import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
 standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  erro: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  fazerLogin() {
    this.authService.login(this.email, this.senha).subscribe(sucesso => {
      if (sucesso) {
        this.router.navigateByUrl('/interno/home');
      } else {
        this.erro = 'Email ou senha inválidos';
      }
    });
  }

  gotoCadastro(){
    this.router.navigate(['externo/cadastro']);
  }
}
