import { Injectable } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, EmailAuthProvider, GoogleAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword, User } from 'firebase/auth';
import { doc, Firestore, getDoc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   usuarioAtual$: Observable<User | null>;
   
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.usuarioAtual$ = authState(this.auth);
  }
  async getUsuarioAtual(): Promise<User | null> {
    return this.auth.currentUser;
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(this.auth, provider);

      if (!credential.user){
        throw new Error('Usuário não encontrado após login');
      }
        
      const uid = credential.user.uid;
      const userDocRef = doc(this.firestore, 'usuario', uid);

      const userData = await getDoc(userDocRef);

      if (!userData.exists()) {
        await setDoc(userDocRef, {
          nome: credential.user.displayName || 'Usuário Google',
          email: credential.user.email || '',
          createdAt: new Date(),
        });
      }

      console.log('Usuário logado via Google:', credential.user);
      this.router.navigate(['home']);
    } catch (error) {
      console.error('Erro no login com Google:', error);
      throw error;
    }
  }

  async register(userData: {
    email: string;
    password: string;
    nome: string;
    telefone?: string;
    rua?: string;
    bairro?: string;
  }): Promise<void> {
    const { email, password, nome, telefone, rua, bairro } = userData;

    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const uid = credential.user?.uid;
    if (!uid) throw new Error('Usuário não encontrado após cadastro');

    const userDocRef = doc(this.firestore, 'usuario', uid);

    await setDoc(userDocRef, {
      nome,
      telefone: telefone || '',
      rua: rua || '',
      bairro: bairro || '',
      email,
      createdAt: new Date(),
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

   // NOVO MÉTODO PARA ATUALIZAR O PERFIL DO USUÁRIO
  async atualizarPerfil(dados: {
    nome: string;
    email: string;
    telefone: string;
    senhaAtual?: string;
    novaSenha?: string;
  }): Promise<void> {
    const user = this.auth.currentUser;

    if (!user) throw new Error('Usuário não autenticado.');

    const uid = user.uid;
    const userDocRef = doc(this.firestore, 'usuario', uid);

    // Se for alterar email ou senha, pode ser necessária reautenticação
    if ((dados.email && dados.email !== user.email) || dados.novaSenha) {
      if (!dados.senhaAtual) {
        throw new Error('Para alterar email ou senha, a senha atual é necessária.');
      }

      // Reautenticação
      const credential = EmailAuthProvider.credential(user.email!, dados.senhaAtual);
      await reauthenticateWithCredential(user, credential);
    }

    // Atualiza o documento do usuário no Firestore
    await setDoc(userDocRef, {
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      updatedAt: new Date()
    }, { merge: true });

    // Atualiza o e-mail no Auth, se ele tiver sido alterado
    if (user.email !== dados.email) {
      await updateEmail(user, dados.email);
    }

    // Atualiza a senha se nova senha foi fornecida e válida
    if (dados.novaSenha && dados.novaSenha.trim().length >= 6) {
      await updatePassword(user, dados.novaSenha);
    }
  }
}
