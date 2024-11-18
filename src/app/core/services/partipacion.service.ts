import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participacion } from '../Interfaces/Participacion';
import { Evento } from '../Interfaces/Evento';
import { IEventoConAsistentes } from '../Interfaces/EventoAsistente';

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

  /**
   * Crea una nueva participacion para el usuario actual.
   * Llama al m todo `post` del servicio `HttpClient` y, si se
   * obtiene el evento correctamente, devuelve la participacion
   * recien creada.
   * @param id_evento El id del evento para el cual se va a crear
   * la participacion.
   */
  crearPaticipaicion(evento_id: number): Observable<Participacion> {
    return this.http.post<Participacion>(`${this.apiUrl}/crear`, { evento_id });
  }

  //solo para asistentes
  confirmarParticipacion(): Observable<Participacion> {
    return this.http.get<Participacion>(`${this.apiUrl}/confirmar`);
  }
  //solo para asistentes
  guardarParticipacion(e: Participacion): Observable<Participacion> {
    return this.http.post<Participacion>(`${this.apiUrl}/crear`, e);
  }

  /**
   * Devuelve una lista de participaciones del usuario actual.
   * Llama al m todo `get` del servicio `HttpClient` y, si se
   * obtiene el listado correctamente, devuelve el listado de
   * participaciones.
   */
  misEventos(): Observable<Participacion[]> {
    return this.http.get<Participacion[]>(`${this.apiUrl}/mis-eventos`);
  }

  sinConfirmar(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/sin-confirmar`);
  }

  asistentesPorEvento(id: number): Observable<IEventoConAsistentes> {
    return this.http.get<IEventoConAsistentes>(
      `${this.apiUrl}/evento-asistentes/${id}`
    );
  }
}
