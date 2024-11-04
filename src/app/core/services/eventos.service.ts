import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../../Interfaces/Evento';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private apiUrl = 'https://leotoloza.alwaysdata.net/eventos';

  constructor(private http: HttpClient) {}

  obtenerEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  obtenerEventosActivos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/activos`);
  }

  obtenerEventoPorId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  marcarRealizado(id: number): Observable<Evento> {
    return this.http.patch<Evento>(`${this.apiUrl}/parcial/${id}`, {
      realizado: true,
    });
  }

  actualizarEvento(id: number, evento: Evento): Observable<Evento> {
    return this.http.patch<Evento>(`${this.apiUrl}/parcial/${id}`, evento);
  }

  guardarEvento(e: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.apiUrl}/crear`, e);
  }
}
