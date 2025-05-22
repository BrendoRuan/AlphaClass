import { Routes } from '@angular/router';
import { LoginComponent } from './externo/login/login.component';
import { CadastroComponent } from './externo/cadastro/cadastro.component';
import { HomeComponent } from './interno/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LivrosComponent } from './interno/livros/livros.component';
import { PerfilComponent } from './interno/perfil/perfil.component';


export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'home', component: HomeComponent},
    {path: 'livros', component: LivrosComponent},
    {path: 'perfil',component: PerfilComponent},
    {path: '**', component: PageNotFoundComponent},
];
