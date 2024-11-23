import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from '../../core/services/alertas.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { AsistentesService } from '../../core/services/asistentes.service';

@Component({
  selector: 'app-recuperar-pass',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.css'],
})
export class RecuperarPassComponent {
  email: string = '';
  esAsistente = false;

  private ruta = inject(ActivatedRoute);
  private alertaService = inject(AlertasService);
  private usuarioService = inject(UsuarioService);
  private asistenteService = inject(AsistentesService);
  private router = inject(Router);

  constructor() {
    this.ruta.queryParams.subscribe((params) => {
      const tipo = params['tipo'];
      this.esAsistente = tipo === 'asistente';
    });
  }

  recuperarPass() {
    if (!this.email.trim()) {
      this.alertaService.mostrarToast(
        'Por favor, ingresa un correo electrónico válido.',
        'error',
        'Ingrese su correo'
      );
      return;
    }

    const servicio = this.esAsistente
      ? this.asistenteService.recuperarContraseñaAsistente(this.email)
      : this.usuarioService.recuperarContraseñaUsuario(this.email);

    servicio.subscribe({
      next: (response) => {
        this.alertaService.mostrarToast(
          response.message,
          'success',
          'Recuperación'
        );
        this.redirigirAlLogin();
      },
      error: (error) =>
        this.alertaService.mostrarToast(
          error.error.message,
          'error',
          'Recuperación'
        ),
    });
  }

  private redirigirAlLogin(): void {
    const tipoUsuario = this.esAsistente ? 'asistente' : 'usuario';
    this.router.navigate(['/login'], { queryParams: { tipo: tipoUsuario } });
  }
}
