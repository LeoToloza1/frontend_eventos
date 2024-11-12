import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { CardComponent } from '../../participacion/card/card.component';
import { Evento } from '../../../core/Interfaces/Evento';
import { AlertasService } from '../../../core/services/alertas.service';
import { ParticipacionService } from '../../../core/services/partipacion.service';
import { catchError, EMPTY } from 'rxjs';
import { Participacion } from '../../../core/Interfaces/Participacion';

@Component({
  selector: 'app-mis-eventos',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css'],
})
export class MisEventosComponent implements OnInit {
  eventosConfirmados: Evento[] = [];
  participacion: Participacion[] = [];
  private alertaService = inject(AlertasService);
  private participacipacionService = inject(ParticipacionService);

  ngOnInit(): void {
    this.participacipacionService
      .misEventos()
      .pipe(
        catchError((error) => {
          console.error('Error al cargar eventos', error);
          this.alertaService.mostrarToast2(
            'Error al cargar los eventos.',
            'warning',
            'Ocurrio un error'
          );
          return EMPTY;
        })
      )
      .subscribe((participaciones: Participacion[]) => {
        this.participacion = participaciones;
        this.eventosConfirmados = participaciones.map((participacion) => ({
          id: participacion.evento.id,
          nombre: participacion.evento.nombre,
          ubicacion: participacion.evento.ubicacion,
          fecha: participacion.evento.fecha,
          descripcion: participacion.evento.descripcion,
          realizado: participacion.evento.realizado,
        }));
        console.log(this.eventosConfirmados);
      });
  }
}
