import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { EventoService } from '../../core/services/eventos.service';
import { Evento } from '../../Interfaces/Evento';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, NgFor],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent implements OnInit {
  private evento: Evento | undefined;
  id: number | undefined;
  eventos: Evento[] = [];
  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarEventos();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;
      this.detalleEvento(this.id);
    }
  }

  listarEventos(): void {
    this.eventoService.obtenerEventos().subscribe((eventos) => {
      console.log(eventos);
      this.eventos = eventos;
    });
  }
  detalleEvento(id: number) {}
  eliminarEvento(id: number) {}

  editarEvento(id: number) {}
}
