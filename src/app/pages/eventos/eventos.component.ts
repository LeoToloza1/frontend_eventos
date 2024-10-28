import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { EventoService } from '../../core/services/eventos.service';
import { Evento } from '../../Interfaces/Evento';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, NgFor, NgIf, FormsModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  private evento: Evento | undefined;
  id: number | undefined;
  eventos: Evento[] = [];
  eventoEditando: Evento | null = null;

  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarEventosActivos();
  }

  listarEventosActivos(): void {
    this.eventoService.obtenerEventosActivos().subscribe({
      next: (eventos) => {
        this.eventos = eventos;
      },
      error: (error) => {
        console.error('Error al obtener eventos activos:', error);
      },
    });
  }

  listarEventos(): void {
    this.eventoService.obtenerEventos().subscribe({
      next: (eventos) => {
        this.eventos = eventos;
      },
      error: (error) => {
        console.error('Error al obtener eventos:', error);
      },
    });
  }

  marcarEventoComoRealizado(id: number): void {
    this.eventoService.marcarRealizado(id).subscribe({
      next: (evento) => {
        console.log('Evento marcado como realizado:', evento);
        this.listarEventosActivos();
      },
      error: (error) => {
        console.error('Error al marcar el evento como realizado:', error);
      },
    });
  }

  editarEvento(id: number): void {
    this.eventoService.obtenerEventoPorId(id).subscribe({
      next: (evento) => {
        this.eventoEditando = evento;
        console.log('Editando evento:', evento);
        this.listarEventosActivos();
      },
      error: (error) => {
        console.error('Error al obtener el evento para editar:', error);
      },
    });
  }

  guardarEvento(): void {
    if (this.eventoEditando) {
      this.eventoService
        .actualizarEvento(this.eventoEditando.id, this.eventoEditando)
        .subscribe({
          next: (eventoActualizado) => {
            const index = this.eventos.findIndex(
              (evento) => evento.id === eventoActualizado.id
            );
            if (index !== -1) {
              this.eventos[index] = eventoActualizado;
            }
            this.eventoEditando = null;
            console.log('Evento guardado:', eventoActualizado);
            this.listarEventosActivos();
          },
          error: (error) => {
            console.error('Error al guardar el evento:', error);
          },
        });
    }
  }

  cancelarEdicion(): void {
    this.eventoEditando = null;
  }
}
