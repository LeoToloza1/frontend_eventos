import { Component, inject, Input, OnInit } from '@angular/core';
import { Evento } from '../../../core/Interfaces/Evento';
import { EventoService } from '../../../core/services/eventos.service';
import { AlertasService } from '../../../core/services/alertas.service';
import { ParticipacionService } from '../../../core/services/partipacion.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { Participacion } from '../../../core/Interfaces/Participacion';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input() eventos: Evento[] = [];
  @Input() participacion: Participacion[] = [];

  private eventoService = inject(EventoService);
  private participacionService = inject(ParticipacionService);
  private alertaService = inject(AlertasService);

  constructor() {}

  ngOnInit(): void {
    if (this.eventos.length === 0) {
      this.participacionService
        .sinConfirmar()
        .pipe(
          tap((eventos) => (this.eventos = eventos)),
          catchError((error) => {
            console.log(this.eventos);
            this.alertaService.mostrarToast(
              'Error al cargar los eventos',
              'error',
              'Ocurrió un error'
            );
            console.error('Hubo un error en la llamada a la api' + error);
            return EMPTY;
          })
        )
        .subscribe();
    }
  }

  /**
   * Registra la participación del usuario en el evento cuyo id se pasa como parámetro.
   * Llama al método `crearPaticipaicion` del servicio `ParticipacionService` y, si se
   * obtiene el registro correctamente, muestra una notificación de éxito.
   * Si ocurre un error, muestra una notificación de error.
   * @param evento_id El id del evento en el que se va a registrar la participación.
   */
  participar(evento_id: number): void {
    this.participacionService
      .crearPaticipaicion(evento_id)
      .pipe(
        tap(() => {
          this.alertaService.mostrarToast(
            'Su participación en el evento fue registrada correctamente',
            'success',
            'Participación confirmada'
          );

          this.eventos = this.eventos.filter(
            (evento) => evento.id !== evento_id
          );
        }),
        catchError((error) => {
          console.error('Error al registrar la participación', error);
          this.alertaService.mostrarToast(
            'No se pudo registrar su participación en el evento',
            'error',
            'Error al participar'
          );
          return EMPTY;
        })
      )
      .subscribe();
  }
}
