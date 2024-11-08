import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participacion } from '../Interfaces/Participacion';

@Injectable({
  providedIn: 'root',
})
export class ParticipacionService {
  private apiUrl = 'https://leotoloza.alwaysdata.net/participacion';

  constructor(private http: HttpClient) {}

  obtenerParticipaciones(): Observable<Participacion[]> {
    return this.http.get<Participacion[]>(this.apiUrl); //todas
  }

  participacionPorEvento(): Observable<Participacion[]> {
    return this.http.get<Participacion[]>(`${this.apiUrl}/por-evento`);
  }

  obtenerParticipacionPorId(id: number): Observable<Participacion> {
    return this.http.get<Participacion>(`${this.apiUrl}/${id}`);
  }

  marcarRealizado(id: number): Observable<Participacion> {
    return this.http.patch<Participacion>(`${this.apiUrl}/parcial/${id}`, {
      realizado: true,
    });
  }

  actualizarParticipacion(
    id: number,
    Participacion: Participacion
  ): Observable<Participacion> {
    return this.http.patch<Participacion>(
      `${this.apiUrl}/parcial/${id}`,
      Participacion
    );
  }

  guardarParticipacion(e: Participacion): Observable<Participacion> {
    return this.http.post<Participacion>(`${this.apiUrl}/crear`, e);
  }
}
