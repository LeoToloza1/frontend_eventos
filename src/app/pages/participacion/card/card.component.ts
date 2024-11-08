import { Component, OnInit } from '@angular/core';
import { Evento } from '../../../core/Interfaces/Evento';
import { NgFor } from '@angular/common';
import { EventoService } from '../../../core/services/eventos.service';
import { AlertasService } from '../../../core/services/alertas.service';
// import {}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  /**
   *
   */
  eventos: Evento[] = [];
  constructor(private eventoService: EventoService) {}
  ngOnInit(): void {
    this.eventoService.obtenerEventosActivos().subscribe((eventos) => {
      eventos = this.eventos;
    });
  }

  participar() {}
}
