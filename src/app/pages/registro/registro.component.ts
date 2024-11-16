import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertasService } from '../../core/services/alertas.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../core/Interfaces/Usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  private alertaService = inject(AlertasService);
  private usuarioService = inject(UsuarioService);
  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: 0,
    dni: 0,
    password: '',
    rol_id: 2,
  };

  confirmarPassword: string = '';
  validarFormulario(): boolean {
    if (this.usuario && this.usuario.password && this.confirmarPassword) {
      return (
        this.usuario.password.length >= 8 &&
        this.usuario.password === this.confirmarPassword
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

    this.usuarioService.registrarse(this.usuario).subscribe(
      (response) => {
        // Manejar respuesta exitosa
        this.alertaService.mostrarToast('Registro exitoso', 'success', '');
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
