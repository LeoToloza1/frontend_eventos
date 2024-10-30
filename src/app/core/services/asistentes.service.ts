import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistente } from '../../Interfaces/Asistente';

@Injectable({
  providedIn: 'root',
})
export class AsistentesService {
  private apiUrl = 'http://leotoloza.alwaysdata.net/asistentes';

  constructor(private http: HttpClient) {}

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
}
