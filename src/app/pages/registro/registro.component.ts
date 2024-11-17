import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertasService } from '../../core/services/alertas.service';
import { Asistente } from '../../core/Interfaces/Asistente';
import { AsistentesService } from '../../core/services/asistentes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  private alertaService = inject(AlertasService);
  private asistenteService = inject(AsistentesService);
  private router = inject(Router);
  asistente: Asistente = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: 0,
    dni: 0,
    password: '',
  };

  confirmarPassword: string = '';
  validarFormulario(): boolean {
    if (this.asistente && this.asistente.password && this.confirmarPassword) {
      return (
        this.asistente.password.length >= 8 &&
        this.asistente.password === this.confirmarPassword
      );
    }
    return false;
  }
  onSubmit() {
    if (!this.validarFormulario()) {
      this.alertaService.mostrarToast(
        'La contraseña debe tener al menos 8 caracteres y coincidir',
        'error',
        ''
      );
      return;
    }

    this.asistenteService.registrarse(this.asistente).subscribe(
      (response) => {
        console.log(response);
        this.alertaService.mostrarToast('Registro exitoso', 'success', '');
        this.router.navigate(['/login'], {
          queryParams: { tipo: 'asistente' },
        });
      },
      (error) => {
        this.alertaService.mostrarToast(
          'Hubo un error al registrar al usuario',
          'error',
          ''
        );
      }
    );
  }
}
