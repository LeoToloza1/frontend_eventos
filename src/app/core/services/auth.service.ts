import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { AsistentesService } from './asistentes.service';
import { Observable, throwError } from 'rxjs';

interface LoginResponse {
  message: string;
  token: string;
  id: number;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private asistenteService: AsistentesService
  ) {}

  /**
   * Inicia sesion como usuario o asistente segun el correo electronico
   * proporcionado.
   *
   * @param email El correo electr nico del usuario o asistente que
   *              intenta iniciar sesi n.
   * @param password La contrase a del usuario o asistente que intenta
   *                 iniciar sesi n.
   *
   * @returns Un observable con la respuesta del servidor.
   */
  login(email: string, password: string, esAsistente: Boolean) {
    if (esAsistente) {
      return this.asistenteService.loginAsistente(email, password);
    } else {
      return this.usuarioService.loginUsuario(email, password);
    }
  }
  /**
   * Verifica si un usuario o un asistente esta logueado y devuelve el token correspondiente.
   *
   * @returns El token de autenticacion del usuario o asistente logueado, o null
   *          si no hay ninguno logueado.
   */
  getToken(): string | null {
    // Verifica si un usuario o un asistente está logueado y devuelve el token correspondiente
    const tokenUsuario = this.usuarioService.getToken();
    if (tokenUsuario) {
      return tokenUsuario;
    }

    const tokenAsistente = this.asistenteService.getToken();
    if (tokenAsistente) {
      return tokenAsistente;
    }

    return null;
  }

  /**
   * Verifica si un usuario o un asistente esta logueado.
   *
   * @returns Verdadero si un usuario o un asistente esta logueado, falso
   *          en caso contrario.
   */
  estaLogueado(): boolean {
    return (
      !!this.usuarioService.getToken() || !!this.asistenteService.getToken()
    );
  }

  /**
   * Refresca el token de autenticacion del usuario o asistente logueado.
   *
   * Verifica si hay un usuario o asistente logueado y llama al metodo
   * `refreshToken` correspondiente para refrescar el token de autenticacion.
   *
   * @returns Un observable con la respuesta del servidor que contiene el
   *          nuevo token de autenticacion.
   *
   * @throws Error si no hay usuario o asistente logueado para refrescar el token.
   */
  refreshToken(): Observable<LoginResponse> {
    const idUsuario = this.usuarioService.getId();
    const idAsistente = this.asistenteService.getId();

    if (idUsuario) {
      return this.usuarioService.refreshToken();
    } else if (idAsistente) {
      return this.asistenteService.refreshToken();
    } else {
      throw new Error(
        'No hay usuario o asistente logueado para refrescar el token'
      );
    }
  }

  getPerfil(): Observable<any> {
    if (this.asistenteService.getToken()) {
      return this.asistenteService.getPerfil();
    } else if (this.usuarioService.getToken()) {
      return this.usuarioService.getPerfil();
    }
    return throwError(() => new Error('No hay usuario o asistente logueado.'));
  }

  /**
   * Verifica si un usuario o asistente está logueado y devuelve información detallada.
   *
   * Comprueba si hay un token de usuario o de asistente disponible y, en caso
   * afirmativo, devuelve un objeto que contiene el tipo ('usuario' o 'asistente'),
   * el token, el ID y el perfil correspondiente. Si no hay ningún token presente,
   * devuelve `null`.
   *
   * @returns Un objeto con el tipo, token, ID y perfil del usuario o asistente
   *          logueado, o `null` si no hay ninguno logueado.
   */
  logueado() {
    const tokenUsuario = this.usuarioService.getToken();
    const tokenAsistente = this.asistenteService.getToken();

    if (tokenUsuario) {
      return this.usuarioService.getNombre();
    } else if (tokenAsistente) {
      return this.asistenteService.getNombre();
    }

    return '';
  }

  /**
   * Obtiene el rol del usuario o asistente logueado.
   *
   * Comprueba si hay un rol de usuario o de asistente disponible y, en caso
   * afirmativo, devuelve el rol correspondiente. Si no hay ninguno logueado,
   * devuelve `null`.
   *
   * @returns El rol del usuario o asistente logueado, o `null` si no hay
   *          ninguno logueado.
   */
  getRol() {
    const rolAsistente = this.asistenteService.getRol();
    const rolUsuario = this.usuarioService.getRol();
    if (rolAsistente === 'Asistente') {
      return rolAsistente;
    }
    if (rolUsuario === 'Usuario') {
      return rolUsuario;
    }
    return null;
  }
}
