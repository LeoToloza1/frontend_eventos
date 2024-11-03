import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AsistentesService } from '../services/asistentes.service';
import { AlertasService } from '../services/alertas.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const asistenteInterceptor: HttpInterceptorFn = (req, next) => {
  const asistenteService = inject(AsistentesService);
  const alertasService = inject(AlertasService);
  const token = asistenteService.getToken();

  const reqClonada = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    : req;
  return next(reqClonada).pipe(
    catchError((err) => {
      if (err.status === 401) {
        return asistenteService.refreshToken().pipe(
          switchMap(() => {
            const newToken = asistenteService.getToken();
            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });
            return next(newReq);
          }),
          catchError(() => {
            alertasService.mostrarToast(
              'Sesión expirada',
              'error',
              'Por favor, inicia sesión de nuevo.'
            );
            asistenteService.logout();
            return throwError(
              () => new Error('Error al refrescar el token. Sesión expirada.')
            );
          })
        );
      }
      return throwError(() => err);
    })
  );
};
