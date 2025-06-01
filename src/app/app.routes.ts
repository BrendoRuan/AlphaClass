import { Routes } from '@angular/router';
import { LoginComponent } from './externo/login/login.component';
import { CadastroComponent } from './externo/cadastro/cadastro.component';
import { HomeComponent } from './interno/home/home.component';
import { LivrosComponent } from './interno/livros/livros.component';
import { PerfilComponent } from './interno/perfil/perfil.component';
import { AdicionarLivroComponent } from './components/adicionar-livro/adicionar-livro.component';
import { BuscarComponent } from './components/buscar/buscar.component';





export const routes: Routes = [
  { path: '', redirectTo: 'externo/login', pathMatch: 'full' },
  { path: 'externo/login', component: LoginComponent },
  { path: 'externo/cadastro', component: CadastroComponent },
  { path: 'interno/home', component: HomeComponent },
  { path: 'interno/livros', component: LivrosComponent },
  { path: 'interno/perfil', component: PerfilComponent },
  { path: 'components/adicionarLivros', component: AdicionarLivroComponent},
  { path: 'components/buscar', component: BuscarComponent}
];