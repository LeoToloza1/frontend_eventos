import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { CardComponent } from './card/card.component';
import { EventoService } from '../../core/services/eventos.service';
import { catchError, EMPTY } from 'rxjs';
import { Evento } from '../../core/Interfaces/Evento';
import { FormsModule } from '@angular/forms';
import { AlertasService } from '../../core/services/alertas.service';
import { Participacion } from '../../core/Interfaces/Participacion';
import { ParticipacionService } from '../../core/services/partipacion.service';

@Component({
  selector: 'app-participacion',
  standalone: true,
  imports: [FooterComponent, NavBarComponent, CardComponent, FormsModule],
  templateUrl: './participacion.component.html',
  styleUrl: './participacion.component.css',
})
export class ParticipacionComponent {
  searchQuery: string = '';
  eventos: Evento[] = [];
  participacion: Participacion[] = [];

  private eventoService = inject(EventoService);
  private alertaService = inject(AlertasService);
  private participacipacionService = inject(ParticipacionService);

  buscarEventos(): void {
    if (this.searchQuery.trim() && this.searchQuery.length >= 3) {
      this.eventoService
        .buscarPorNombre(this.searchQuery)
        .pipe(
          catchError((error) => {
            console.error('Error al buscar eventos', error);
            return EMPTY;
          })
        )
        .subscribe((eventos) => {
          this.eventos = eventos;
          if (eventos.length === 0) {
            this.alertaService.mostrarToast2(
              `Lo sentimos, no tenemos eventos previstos con ese nombre,
              por favor, intente buscar con otro nombre`,
              'warning',
              'No se encontraron eventos'
            );
          }
        });
    } else {
      this.loadEventos();
    }
  }

  loadEventos(): void {
    this.participacipacionService
      .sinConfirmar()
      .pipe(
        catchError((error) => {
          console.error('Error al cargar eventos', error);
          return EMPTY;
        })
      )
      .subscribe((eventos) => {
        this.eventos = eventos;
      });
  }
}
