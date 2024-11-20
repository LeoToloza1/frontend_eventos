import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { Evento } from '../../../core/Interfaces/Evento';
import { AlertasService } from '../../../core/services/alertas.service';
import { ParticipacionService } from '../../../core/services/partipacion.service';
import { catchError, EMPTY } from 'rxjs';
import { Participacion } from '../../../core/Interfaces/Participacion';
import { DatePipe } from '@angular/common';
import { msjResponse } from '../../../core/Interfaces/MsjResponse';
import { IEventoConAsistentes } from '../../../core/Interfaces/EventoAsistente';

@Component({
  selector: 'app-mis-eventos',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, DatePipe],
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css'],
})
export class MisEventosComponent implements OnInit {
  participacion: Participacion[] = [];
  eventosConfirmados: IEventoConAsistentes[] = [];
  private alertaService = inject(AlertasService);
  private participacipacionService = inject(ParticipacionService);
  private apiUrl = 'https://leotoloza.alwaysdata.net';

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
          id: participacion.id,
          evento_id: participacion.evento_id,
          nombre: participacion.evento.nombre,
          ubicacion: participacion.evento.ubicacion,
          fecha: participacion.evento.fecha,
          descripcion: participacion.evento.descripcion,
          realizado: participacion.evento.realizado || false,
        }));
      });
  }

  generarPdf(id: number): void {
    console.log('llegando al generarPDF');
    this.participacipacionService.generarPdf(id).subscribe({
      next: (res: msjResponse) => {
        if (res.filePath) {
          const fileName = res.filePath.split('public/')[1];
          this.alertaService
            .mostrarConfirmacion(
              'Se ha generado el PDF, desea descargarlo?',
              'success',
              res.msj
            )
            .then((result) => {
              if (result) {
                const fileUrl = `${this.apiUrl}/${fileName}`;
                window.open(fileUrl, '_blank');
              }
            });

          // window.open(fileUrl, '_blank');
        } else {
          console.error('Error: La ruta del archivo no está disponible.');
          this.alertaService.mostrarConfirmacion(
            'Error: La ruta del archivo no está disponible.',
            'error',
            res.msj
          );
        }
      },
      error: (error) => {
        console.error('Error en la suscripción:', error);
        this.alertaService.mostrarToast2(
          'Ocurrió un error al generar el PDF.',
          'error',
          'Error al generar PDF'
        );
      },
    });
  }
}
