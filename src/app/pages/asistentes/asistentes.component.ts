import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Asistente } from '../../core/Interfaces/Asistente';
import { AlertasService } from '../../core/services/alertas.service';
import { AsistentesService } from '../../core/services/asistentes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistentes',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    NgFor,
    NgIf,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './asistentes.component.html',
  styleUrl: './asistentes.component.css',
})
export class AsistentesComponent implements OnInit {
  id: number | undefined;
  asistentes: Asistente[] = [];
  asistenteEditando: Asistente | null = null;

  constructor(
    private asistenteService: AsistentesService,
    private alertaService: AlertasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerAsistentes();
  }

  obtenerAsistentes() {
    this.asistenteService.obtenerAsistentes().subscribe({
      next: (asistentes) => {
        this.asistentes = asistentes;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  // edicion de perfil de asistente
  guardarAsistente(id: number) {
    if (this.asistenteEditando) {
      this.asistenteService
        .actualizarAsistente(id, this.asistenteEditando)
        .subscribe({
          next: () => {
            this.alertaService.mostrarToast(
              'Actualizacion de Asistente',
              'success',
              'Se realizó con exito la actualización'
            );
            this.asistenteEditando = null;
            this.obtenerAsistentes();
          },
          error: (error) => {
            console.error('Error al actualizar asistente:', error);
            this.alertaService.mostrarToast(
              'Actualizacion de Asistente',
              'error',
              'Error al actualizar asistente'
            );
          },
        });
    }
  }

  cancelarEdicion() {
    this.asistenteEditando = null;
  }

  editarAsistente(id: number) {
    const asistente = this.asistentes.find((as) => as.id === id);
    if (asistente) {
      this.asistenteEditando = { ...asistente };
      this.asistenteService.guardarAsistente(this.asistenteEditando).subscribe({
        next: () => {
          this.alertaService.mostrarToast(
            'Edicion de Asistente',
            'success',
            'Se realizó con exito la edición'
          );
          this.asistenteEditando = null;
          this.obtenerAsistentes();
        },
        error: (error) => {
          console.error('Error al editar asistente:', error);
          this.alertaService.mostrarToast(
            'Edicion de Asistente',
            'error',
            'Error al editar asistente'
          );
        },
      });
    }
  }

  registrarAsistente() {
    const nuevoAsistente: Asistente = {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
      dni: 0,
      telefono: 0,
    };
    this.asistenteService.guardarAsistente(nuevoAsistente).subscribe({
      next: () => {
        this.alertaService.mostrarToast(
          'Registro de Asistente',
          'success',
          'Se realizó con exito el registro'
        );
        this.obtenerAsistentes();
      },
      error: (error) => {
        console.error('Error al registrar asistente:', error);
        this.alertaService.mostrarToast(
          'Registro de Asistente',
          'error',
          'Error al registrar asistente'
        );
      },
    });
  }
}
