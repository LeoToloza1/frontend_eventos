import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { EventoService } from '../../core/services/eventos.service';
import { Evento } from '../../Interfaces/Evento';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, NgFor],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css',
})
export class EventoComponent implements OnInit {
  private evento: Evento | undefined;
  eventos: Evento[] = [];
  id: number | undefined;
  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;
      this.obtenerEventoPorId(this.id);
    }
  }

  obtenerEventoPorId(id: number) {
    console.log('El ID del evento es:', id);
    this.eventoService.obtenerEventoPorId(id).subscribe((evento) => {
      this.evento = evento;
    });
  }
}
