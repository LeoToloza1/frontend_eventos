import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { AlertasService } from '../../../core/services/alertas.service';
import { AuthService } from '../../../core/services/auth.service';
import { Asistente } from '../../../core/Interfaces/Asistente';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsistentesService } from '../../../core/services/asistentes.service';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-perfil-asistente',
  standalone: true,
  imports: [
    FooterComponent,
    NavBarComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './perfil-asistente.component.html',
  styleUrl: './perfil-asistente.component.css',
})
export class PerfilAsistenteComponent implements OnInit {
  private asistenteService = inject(AsistentesService);
  asistente: Asistente = {
    id: 0,
    dni: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: 0,
  };
  activado = false;
  constructor(
    private alerta: AlertasService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService
      .getPerfil()
      .pipe()
      .subscribe((response) => {
        this.asistente = response;
      });
  }

  editarPerfil() {
    this.activado = true;
  }

  guardarCambios(asistenteEditado: Asistente) {
    const asistenteParaActualizar: Asistente = {
      id: this.asistente.id,
      nombre: asistenteEditado.nombre,
      apellido: asistenteEditado.apellido,
      dni: asistenteEditado.dni,
      email: asistenteEditado.email,
      telefono: asistenteEditado.telefono,
    };
    console.log('Edición de perfil: --> ', asistenteParaActualizar);

    this.alerta
      .mostrarConfirmacion(
        '¿Estás seguro de que deseas guardar los cambios en tu perfil?',
        'question',
        'Confirmar cambios'
      )
      .then((confirmado) => {
        if (confirmado) {
          this.asistenteService
            .editarPerfil(asistenteParaActualizar)
            .pipe(
              catchError((error) => {
                this.alerta.mostrarToast(
                  'Error al guardar los cambios. Por favor, inténtalo nuevamente.',
                  'error',
                  'Error'
                );
                throw error;
              })
            )
            .subscribe(() => {
              this.alerta.mostrarToast(
                'Los cambios se han guardado correctamente.',
                'success',
                'Éxito'
              );
              this.activado = false;
            });
        }
      });
  }
}
