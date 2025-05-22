import { Injectable } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User } from 'firebase/auth';
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
}
