import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Asistente } from '../../Interfaces/Asistente';

interface LoginResponse {
  message: string;
  token: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AsistentesService {
  private apiUrl = 'http://leotoloza.alwaysdata.net/asistentes';

  constructor(private http: HttpClient) {}

  loginAsistente(email: string, password: string): Observable<LoginResponse> {
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
      throw new Error('ID de asistente no disponible para refrescar el token.');
    }
    return this.http.get<LoginResponse>(`${this.apiUrl}/perfil/${id}`).pipe(
      tap((response) => {
        this.setToken(response.token);
      })
    );
  }

  logout() {
    this.removeToken();
    this.removeId();
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

  /***
   *
   */
  private setToken(token: string) {
    localStorage.setItem('tokenAsistente', token);
  }

  getToken(): string {
    return localStorage.getItem('tokenAsistente') ?? '';
  }

  private removeToken() {
    localStorage.removeItem('tokenAsistente');
  }

  private setId(id: number) {
    localStorage.setItem('idAsistente', id.toString());
  }

  getId(): number | null {
    const id = localStorage.getItem('idAsistente');
    return id ? parseInt(id, 10) : null;
  }

  private removeId() {
    localStorage.removeItem('idAsistente');
  }
}
