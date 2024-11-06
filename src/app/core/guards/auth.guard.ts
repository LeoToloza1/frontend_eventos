import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertasService } from '../services/alertas.service';

/**
 * Guard para proteger rutas que requieren autenticacion. Si el usuario no esta  logueado,
 * muestra un toast de aviso y redirige a la pantalla de inicio de sesion.
 * @param route Ruta que se intenta acceder.
 * @param state Estado de la ruta.
 * @returns true si el usuario esta logueado, false en caso contrario.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const alerta = inject(AlertasService);
  if (authService.estaLogueado()) {
    return true;
  } else {
    const router = inject(Router);
    alerta.mostrarToast(
      'Por favor vuelva a loguearse',
      'warning',
      'Acceso denegado'
    );
    router.navigate(['/']);

    return false;
  }
};
