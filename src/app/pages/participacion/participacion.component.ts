import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { CardComponent } from './card/card.component';
import { EventoService } from '../../core/services/eventos.service';
import { catchError, EMPTY } from 'rxjs';
import { Evento } from '../../core/Interfaces/Evento';
import { FormsModule } from '@angular/forms';

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

  private eventoService = inject(EventoService);

  buscarEventos(): void {
    if (this.searchQuery.trim() && this.searchQuery.length === 3) {
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
        });
    } else {
      this.loadEventos();
    }
  }

  loadEventos(): void {
    this.eventoService
      .obtenerEventosActivos()
      .pipe(
        catchError((error) => {
          console.error('Error al cargar eventos', error);
          return EMPTY;
        })
      )
      .subscribe((eventos) => {
        this.eventos = eventos; // Cargamos todos los eventos
      });
  }
}
