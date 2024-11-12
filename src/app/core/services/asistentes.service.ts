import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Asistente } from '../Interfaces/Asistente';

interface LoginResponse {
  message: string;
  token: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AsistentesService {
  private apiUrl = 'https://leotoloza.alwaysdata.net/asistentes';
  private nombreAsistenteKey = 'nombredelasistente';
  private rolAsistenteKey = 'rolAsistente';
  constructor(private http: HttpClient) {}

  loginAsistente(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.setId(response.id);
        this.setRol('Asistente');
      })
    );
  }

  refreshToken(): Observable<LoginResponse> {
    const id = this.getId();
    if (!id) {
      throw new Error('ID de asistente no disponible para refrescar el token.');
    }
    return this.http.get<LoginResponse>(`${this.apiUrl}/perfil/${id}`).pipe(
      tap((response) => {
        this.setToken(response.token);
      })
    );
  }

  getPerfil(): Observable<Asistente> {
    return this.http.get<Asistente>(`${this.apiUrl}/perfil`).pipe(
      tap((usuario) => {
        localStorage.setItem(this.nombreAsistenteKey, usuario.nombre);
      })
    );
  }

  getNombre() {
    return localStorage.getItem(this.nombreAsistenteKey);
  }
  removeNombre() {
    return localStorage.removeItem(this.nombreAsistenteKey);
  }
  logOutAsistente() {
    localStorage.clear();
  }

  obtenerAsistentes(): Observable<Asistente[]> {
    return this.http.get<Asistente[]>(this.apiUrl);
  }
  obtenerAsistentePorId(id: number): Observable<Asistente> {
    return this.http.get<Asistente>(`${this.apiUrl}/${id}`);
  }

  actualizarAsistente(id: number, Asistente: Asistente): Observable<Asistente> {
    return this.http.patch<Asistente>(
      `${this.apiUrl}/parcial/${id}`,
      Asistente
    );
  }

  guardarAsistente(e: Asistente): Observable<Asistente> {
    return this.http.post<Asistente>(`${this.apiUrl}/crear`, e);
  }

  setToken(token: string) {
    localStorage.setItem('tokenAsistente', token);
  }

  getToken(): string {
    return localStorage.getItem('tokenAsistente') ?? '';
  }

  removeToken() {
    localStorage.removeItem('tokenAsistente');
  }

  setId(id: number) {
    localStorage.setItem('idAsistente', id.toString());
  }

  getId(): number | null {
    const id = localStorage.getItem('idAsistente');
    return id ? parseInt(id, 10) : null;
  }

  removeId() {
    localStorage.removeItem('idAsistente');
  }

  setRol(rol: string) {
    localStorage.setItem(this.rolAsistenteKey, rol);
  }

  getRol(): string | null {
    return localStorage.getItem(this.rolAsistenteKey);
  }

  removeRol() {
    localStorage.removeItem(this.rolAsistenteKey);
  }
}
