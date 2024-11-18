import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ParticipacionService } from '../../../core/services/partipacion.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { IEventoConAsistentes } from '../../../core/Interfaces/EventoAsistente';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-eventos-asistentes',
  standalone: true,
  imports: [DatePipe, NavBarComponent, FooterComponent],
  templateUrl: './eventos-asistentes.component.html',
  styleUrls: ['./eventos-asistentes.component.css'],
})
export class EventosAsistentesComponent implements OnInit {
  private participacionService = inject(ParticipacionService);
  private route = inject(ActivatedRoute);
  private id!: number;
  public eventoDetalle: IEventoConAsistentes | null = null;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.participacionService
      .asistentesPorEvento(this.id)
      .pipe(
        tap((res) => {
          console.log('Respuesta del servicio:', res);
          this.eventoDetalle = res;
        })
      )
      .subscribe();
  }
}
