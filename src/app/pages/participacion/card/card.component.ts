import { Component, inject, Input, OnInit } from '@angular/core';
import { Evento } from '../../../core/Interfaces/Evento';
import { EventoService } from '../../../core/services/eventos.service';
import { AlertasService } from '../../../core/services/alertas.service';
import { ParticipacionService } from '../../../core/services/partipacion.service';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input() eventos: Evento[] = [];

  private eventoService = inject(EventoService);
  private participacionService = inject(ParticipacionService);
  private alertaService = inject(AlertasService);

  constructor() {}

  ngOnInit(): void {
    if (this.eventos.length === 0) {
      this.eventoService
        .obtenerEventosActivos()
        .pipe(
          tap((eventos) => (this.eventos = eventos)),
          catchError((error) => {
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

  participar(evento_id: number) {
    console.log('ID DEL EVENTO CLICK: -->' + evento_id);
  }
}
