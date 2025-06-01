export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  rua?: string;
  bairro?: string;
}