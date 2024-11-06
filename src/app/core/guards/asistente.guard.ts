import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Protege rutas para que solo los asistentes puedan acceder.
 * Devuelve true si el usuario autenticado es un asistente, false de lo contrario.
 * @param route Ruta a la que se intenta acceder.
 * @param state Estado de la ruta.
 * @returns true si se puede acceder, false de lo contrario.
 */
export const asistenteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const rol = authService.getRol();
  if (rol !== 'Asistente') {
    return false;
  }
  return true;
};
