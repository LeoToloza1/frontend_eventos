import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { EventoService } from '../../core/services/eventos.service';
import { Evento } from '../../Interfaces/Evento';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AlertasService } from '../../core/services/alertas.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    NgFor,
    NgIf,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  id: number | undefined;
  eventos: Evento[] = [];
  eventoEditando: Evento | null = null;

  constructor(
    private eventoService: EventoService,
    private alertaService: AlertasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarEventosActivos();
  }

  listarEventosActivos(): void {
    this.eventoService.obtenerEventosActivos().subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        // this.alertaService.mostrarToast(
        //   'Eventos Activos',
        //   'success',
        //   'Eventos activos cargados exitosamente'
        // );
      },
      error: (error) => {
        this.alertaService.mostrarToast(
          'Eventos Activos',
          'error',
          'Ocurrió un error al listar los eventos\n' + error
        );
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

  /**
   * Marca el evento cuyo id se pasa como par metro como realizado.
   * Llama al m todo `marcarRealizado` del servicio `EventoService` y, si se
   * obtiene el evento correctamente, llena la lista de eventos activos con
   * `listarEventosActivos`.
   * @param id El id del evento a marcar como realizado.
   */
  marcarEventoComoRealizado(id: number): void {
    this.eventoService.marcarRealizado(id).subscribe({
      next: (evento) => {
        // console.log('Evento marcado como realizado:', evento);
        this.alertaService.mostrarToast(
          'Evento Realizado',
          'success',
          `${evento.nombre}: Marcado como realizado`
        );
        this.listarEventosActivos();
      },
      error: (error) => {
        this.alertaService.mostrarToast(
          'Evento Realizado',
          'error',
          'Error al marcar el evento como realizado' + error
        );
      },
    });
  }

  /**
   * Edita el evento cuyo id se pasa como par metro.
   * Primero, se intenta obtener el evento con el id especificado.
   * Si se obtiene, se guarda en `eventoEditando` y se imprimen los datos del evento.
   * Si no se puede obtener, se muestra un mensaje de error.
   * Luego, se actualiza el listado de eventos activos.
   * @param id El id del evento a editar.
   */
  editarEvento(id: number): void {
    this.eventoService.obtenerEventoPorId(id).subscribe({
      next: (evento) => {
        this.eventoEditando = evento;
        this.alertaService.mostrarToast(
          'Edicion de Evento',
          'success',
          `Evento: ${this.eventoEditando?.nombre} editado correctamente`
        );
        this.listarEventosActivos();
      },
      error: (error) => {
        this.alertaService.mostrarToast(
          'Edicion de evento',
          'error',
          'Error al obtener el evento para editar: ' + error
        );
      },
    });
  }

  /**
   * Guarda el evento actualmente editado, si existe.
   * Luego, actualiza el listado de eventos activos.
   */
  guardarEvento(): void {
    const id = this.eventoEditando?.id ?? 0;
    if (this.eventoEditando) {
      this.eventoService.actualizarEvento(id, this.eventoEditando).subscribe({
        next: (eventoActualizado) => {
          const index = this.eventos.findIndex(
            (evento) => evento.id === eventoActualizado.id
          );
          if (index !== -1) {
            this.eventos[index] = eventoActualizado;
          }
          this.eventoEditando = null;
          this.alertaService.mostrarToast(
            'Evento Guardado',
            'success',
            `Evento: ${eventoActualizado?.nombre} guardado correctamente`
          );
          console.log('Evento guardado:', eventoActualizado);
          this.listarEventosActivos();
        },
        error: (error) => {
          console.error('Error al guardar el evento:', error);
          this.alertaService.mostrarToast(
            'El evento no se pudo guardar',
            'error',
            'Error al guardar el evento: ' + error
          );
        },
      });
    }
  }

  /**
   * Cancela la edicion actual del evento.
   * Limpia el valor de `eventoEditando` para que no se muestre la edicion
   * en la interfaz de usuario.
   */
  cancelarEdicion(): void {
    this.eventoEditando = null;
  }
  /**
   * Navega a la ruta para agregar un nuevo evento.
   */
  agregarEvento(): void {
    this.router.navigate(['/evento']);
  }
}
