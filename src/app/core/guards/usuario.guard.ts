import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertasService } from '../services/alertas.service';

/**
 * Guard que protege rutas para que solo los usuarios puedan acceder a ellas.
 * Comprueba el rol del usuario actual y devuelve true si el rol es "Usuario",
 * o false en caso contrario.
 * @param route Ruta a la que se intenta acceder.
 * @param state Estado de la ruta.
 * @returns True si el rol es "Usuario", false en caso contrario.
 */
export const usuarioGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const alerta = inject(AlertasService);
  const rol = authService.getRol();
  if (rol !== 'Usuario') {
    const router = inject(Router);
    router.navigate(['/perfil/asistente']);
    return false;
  }
  return true;
};
