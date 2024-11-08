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

  participacionPorEvento(params: HttpParams): Observable<Participacion[]> {
    return this.http.get<Participacion[]>(`${this.apiUrl}/por-evento`, {
      params,
    });
  }

  obtenerParticipacionPorId(id: number): Observable<Participacion> {
    return this.http.get<Participacion>(`${this.apiUrl}/${id}`);
  }

  /** solo para usuarios
   * Marca la participacion con el id proporcionado como realizado.
   * Llama al m todo `patch` del servicio `HttpClient` y, si se
   * obtiene el evento correctamente, devuelve el evento actualizado.
   * @param id El id de la participacion a marcar como realizado.
   */
  marcarRealizado(id: number): Observable<Participacion> {
    return this.http.patch<Participacion>(`${this.apiUrl}/realizado/${id}`, {
      realizado: true,
    });
  }
  //solo para asistentes
  confirmarParticipacion(): Observable<Participacion> {
    return this.http.get<Participacion>(`${this.apiUrl}/confirmar`);
  }
  //solo para asistentes
  guardarParticipacion(e: Participacion): Observable<Participacion> {
    return this.http.post<Participacion>(`${this.apiUrl}/crear`, e);
  }
}
