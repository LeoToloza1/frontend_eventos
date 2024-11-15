import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  /**
   * Redirige al usuario según su estado de autenticación:
   * - Si es un asistente logueado, lo envía a su perfil de asistente.
   * - Si es un usuario logueado, lo envía a su perfil de usuario.
   * - Si no está logueado, lo envía al home.
   */
  redirigir(): void {
    if (this.authService.estaLogueado()) {
      const rol = this.authService.getRol();

      if (rol === 'Asistente') {
        this.router.navigate(['/perfil/asistente']);
      } else if (rol === 'Usuario') {
        this.router.navigate(['/perfil']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}
