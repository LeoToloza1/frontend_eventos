import { Component, inject } from '@angular/core';
import { AlertasService } from '../../core/services/alertas.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tipo: string = '';
  private alertasService = inject(AlertasService);
  private router = inject(Router);
  private authService = inject(AuthService);

  /**
   *
   */
  constructor() {}

  irALogin(tipo: string) {
    if (this.authService.estaLogueado()) {
      this.router.navigate(['/perfil'], { queryParams: { tipo } });
      return;
    }
    if (this.validarTipo(tipo)) {
      console.log();
      this.router.navigate(['/login'], { queryParams: { tipo } });
    } else {
      this.alertasService.mostrarToast(
        'URL incorrecta',
        'info',
        'Intenta de nuevo, por favor'
      );
    }
  }

  validarTipo(tipo: string): boolean {
    return tipo === 'asistente' || tipo === 'usuario';
  }
  //registro de usuarios nuevos
  irARegistro() {
    this.router.navigate(['/registro']); //implementar algo parecido al login
  }
}
