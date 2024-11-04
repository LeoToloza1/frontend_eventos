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
  private apiUrl = 'https://leotoloza.alwaysdata.net/usuarios';
  private nombreUsuarioKey = 'nombredeusuario';
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
    console.log('USUARIO : ', body);
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.setId(response.id);
      })
    );
  }

  /**
   * Refresca el token de autenticación del usuario.
   *
   * Obtiene el ID del usuario almacenado y realiza una
   * solicitud HTTP para refrescar el token de autenticación
   * asociado a ese ID. El nuevo token se almacena en el
   * almacenamiento local.
   *
   * @returns Un observable con la respuesta del servidor que
   *          contiene el nuevo token.
   *
   * @throws Error si el ID de usuario no está disponible.
   */
  refreshToken(): Observable<LoginResponse> {
    const id = this.getId();
    if (!id) {
      throw new Error('ID de usuario no disponible para refrescar el token.');
    }
    return this.http.get<LoginResponse>(`${this.apiUrl}/perfil/${id}`).pipe(
      tap((response) => {
        console.log(`${this.apiUrl}/perfil/${id}`);
        this.setToken(response.token);
      })
    );
  }

  logOutUsuario() {
    this.removeToken();
    this.removeId();
  }

  /**
   * Obtiene el perfil del usuario actual.
   *
   * Realiza una solicitud HTTP de tipo GET para obtener
   * el perfil del usuario actual.
   *
   * @returns Un observable con la respuesta del servidor que
   *          contiene el perfil del usuario actual.
   */
  getPerfil(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/perfil`).pipe(
      tap((usuario) => {
        localStorage.setItem(this.nombreUsuarioKey, usuario.nombre);
        console.log('Guardando nombre: ' + this.nombreUsuarioKey);
      })
    );
  }
  /**
   * Obtiene el nombre del usuario almacenado.
   *
   * @returns El nombre del usuario si está disponible, o null si no.
   */
  getNombre(): string | null {
    return localStorage.getItem(this.nombreUsuarioKey); // Usar la clave correcta
  }
  /**
   * Registra un nuevo usuario en el sistema.
   *
   * Realiza una solicitud HTTP de tipo POST con el objeto
   * `user` que contiene la información del usuario a registrar.
   *
   * @param user El objeto que contiene la información del usuario a registrar.
   * @returns Un observable con la respuesta del servidor que
   *          contiene el usuario registrado.
   */
  registrarse(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/crear`, user);
  }

  /**
   * Edita el perfil del usuario actual.
   * Realiza una solicitud HTTP de tipo PATCH con el objeto
   * `user` que contiene la información del usuario a actualizar.
   * @param user El objeto que contiene la información del usuario a actualizar.
   * @returns Un observable con la respuesta del servidor que
   *          contiene el usuario actualizado.
   */
  editarPerfil(user: Usuario): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/parcial`, user);
  }

  setToken(tokenUsuario: string) {
    localStorage.setItem('tokenUsuario', tokenUsuario);
  }

  getToken(): string {
    return localStorage.getItem('tokenUsuario') ?? '';
  }

  removeToken() {
    localStorage.removeItem('tokenUsuario');
  }

  setId(idUsuario: number) {
    localStorage.setItem('idUsuario', idUsuario.toString());
  }

  getId(): number | null {
    const id = localStorage.getItem('idUsuario');
    return id ? parseInt(id, 10) : null;
  }

  removeId() {
    localStorage.removeItem('idUsuario');
  }
}
