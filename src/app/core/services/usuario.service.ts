import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../../Interfaces/Usuario';

interface LoginResponse {
  message: string;
  token: string;
  id: number;
}
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://leotoloza.alwaysdata.net/usuarios';
  constructor(private http: HttpClient) {}

  /**
   * Inicia sesión de un usuario y devuelve un observable con la respuesta.
   *
   * @param email El correo electrónico del usuario
   * @param password La contraseña del usuario
   *
   * @returns Un observable con la respuesta del servidor
   */
  loginUsuario(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.setId(response.id);
      })
    );
  }

  refreshToken(): Observable<LoginResponse> {
    const id = this.getId();
    if (!id) {
      throw new Error('ID de usuario no disponible para refrescar el token.');
    }
    return this.http.get<LoginResponse>(`${this.apiUrl}/perfil/${id}`).pipe(
      tap((response) => {
        this.setToken(response.token);
      })
    );
  }

  logOutUsuario() {
    this.removeToken();
    this.removeId();
  }

  getPerfil(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/perfil`);
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  private removeToken() {
    localStorage.removeItem('token');
  }

  private setId(id: number) {
    localStorage.setItem('id', id.toString());
  }

  getId(): number | null {
    const id = localStorage.getItem('id');
    return id ? parseInt(id, 10) : null;
  }

  private removeId() {
    localStorage.removeItem('id');
  }
}
