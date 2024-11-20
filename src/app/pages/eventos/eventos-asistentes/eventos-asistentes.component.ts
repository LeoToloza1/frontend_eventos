import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ParticipacionService } from '../../../core/services/partipacion.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import {
  IAsistenteEvento,
  IEventoConAsistentes,
} from '../../../core/Interfaces/EventoAsistente';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { AlertasService } from '../../../core/services/alertas.service';

@Component({
  selector: 'app-eventos-asistentes',
  standalone: true,
  imports: [DatePipe, NavBarComponent, FooterComponent],
  templateUrl: './eventos-asistentes.component.html',
  styleUrls: ['./eventos-asistentes.component.css'],
})
export class EventosAsistentesComponent implements OnInit {
  private participacionService = inject(ParticipacionService);
  private alertaService = inject(AlertasService);
  private route = inject(ActivatedRoute);
  private id!: number;
  public eventoDetalle: IEventoConAsistentes | null = null;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.participacionService
      .asistentesPorEvento(this.id)
      .pipe(
        tap((res) => {
          this.eventoDetalle = res;
        })
      )
      .subscribe();
  }
  toggleAsistenciaReal(id: number, asistente: IAsistenteEvento) {
    console.log('ID DE LA PARTICIPACION-->' + id);
    if (asistente.asistencia_real) {
      this.alertaService.mostrarToast(
        'Esta asistencia ya está confirmada.',
        'info',
        'Información'
      );
      return;
    }
    this.alertaService
      .mostrarConfirmacion(
        '¿Estás seguro de marcar esta asistencia?',
        'question',
        'Confirmar asistencia'
      )
      .then((confirmado) => {
        if (confirmado) {
          asistente.asistencia_real = true;
          this.participacionService.marcarRealizado(id).subscribe({
            next: (response) => {
              this.alertaService.mostrarToast(response.msj, 'success', 'Éxito');
            },
            error: () => {
              this.alertaService.mostrarToast(
                'Error al marcar la asistencia.',
                'error',
                'Error'
              );
              asistente.asistencia_real = false;
            },
          });
        } else {
          this.alertaService.mostrarToast(
            'La acción fue cancelada.',
            'info',
            'Cancelado'
          );
        }
      });
  }
}
