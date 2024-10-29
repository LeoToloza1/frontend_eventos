import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { EventoService } from '../../core/services/eventos.service';
import { Evento } from '../../Interfaces/Evento';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, NgFor, FormsModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css',
})
export class EventoComponent implements OnInit {
  private evento: Evento | undefined;
  eventos: Evento[] = [];
  // id: number = 0;
  nombre: string = '';
  ubicacion: string = '';
  fecha: Date = new Date();
  descripcion: string = '';
  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  guardarEvento() {
    const nuevoEvento: Evento = {
      nombre: this.nombre,
      ubicacion: this.ubicacion,
      fecha: this.fecha,
      descripcion: this.descripcion,
    };

    this.eventoService
      .guardarEvento(nuevoEvento)
      .subscribe((eventoGuardado) => {
        console.log('Evento guardado:', eventoGuardado);
        this.resetFormulario();
      });
  }
  resetFormulario() {
    this.nombre = '';
    this.ubicacion = '';
    this.fecha = new Date();
    this.descripcion = '';
  }
}
