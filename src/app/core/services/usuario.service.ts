import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../../Interfaces/Usuario';

interface LoginResponse {
  message: string;
  token: string;
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
      tap((response: LoginResponse) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  getPerfil(): Observable<Usuario> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`${this.apiUrl}/perfil`, { headers });
  }
  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
