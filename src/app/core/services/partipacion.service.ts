import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participacion } from '../Interfaces/Participacion';
import { Evento } from '../Interfaces/Evento';
import { IEventoConAsistentes } from '../Interfaces/EventoAsistente';
import { msjResponse } from '../Interfaces/MsjResponse';

@Injectable({
  providedIn: 'root',
})
export class ParticipacionService {
  private apiUrl = 'https://leotoloza.alwaysdata.net/participacion';

  constructor(private http: HttpClient) {}

  obtenerParticipaciones(): Observable<Participacion[]> {
    return this.http.get<Participacion[]>(this.apiUrl); //todas
  }

  /**
   * @description: Obtiene las participaciones de un evento en especifico segun los parametros pasados.
   * @param params: HttpParams con los valores de los campos que se quieren filtrar.
   *     - asistente_id: El id del asistente que se quiere buscar.
   *     - evento_id: El id del evento al que se quiere buscar las participaciones.
   * @returns: Un Observable que emite un array de Participaciones.
   */
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
  marcarRealizado(id: number): Observable<msjResponse> {
    return this.http.patch<msjResponse>(`${this.apiUrl}/realizado`, { id });
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

  /**
   * Genera un PDF del certificado para la participación con el id proporcionado.
   * Llama al método `get` del servicio `HttpClient` y, si se obtiene correctamente,
   * devuelve un objeto `msjResponse` que contiene el mensaje de éxito y la ruta del archivo.
   * @param id El id de la participación para la cual se va a generar el PDF del certificado.
   * @returns Un Observable que emite un `msjResponse` con el mensaje y la ruta del archivo.
   */
  generarPdf(id: number): Observable<msjResponse> {
    return this.http.get<msjResponse>(`${this.apiUrl}/certificado/${id}`);
  }
}
