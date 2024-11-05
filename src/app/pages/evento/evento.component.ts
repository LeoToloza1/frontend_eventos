import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { EventoService } from '../../core/services/eventos.service';
import { Evento } from '../../core/Interfaces/Evento';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertasService } from '../../core/services/alertas.service';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, NgFor, FormsModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css',
})
export class EventoComponent implements OnInit {
  eventos: Evento[] = [];
  // id: number = 0;
  nombre: string = '';
  ubicacion: string = '';
  fecha: string = '';
  descripcion: string = '';
  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private alertaService: AlertasService
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
        if (eventoGuardado) {
          this.alertaService.mostrarToast(
            `Evento "${nuevoEvento.nombre}" guardado con éxito`,
            'success',
            'Guardado'
          );
          this.resetFormulario();
        } else {
          this.alertaService.mostrarToast(
            'No se pudo guardar el evento',
            'error',
            'Error'
          );
        }
      });
  }
  resetFormulario() {
    this.nombre = '';
    this.ubicacion = '';
    this.fecha = '';
    this.descripcion = '';
  }
}
