import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
//import { RelatoriosComponent } from './pages/relatorios/relatorios.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent}
];

@NgModule({
    declarations:[
        AppComponent,
        HomeComponent,
        LoginComponent,
        CadastroComponent,
    ],
    imports:[
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers:[],
    bootstrap:[AppComponent]
})


export class AppModule{ }