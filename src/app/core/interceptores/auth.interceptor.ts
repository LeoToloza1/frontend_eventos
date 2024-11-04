import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AlertasService } from '../services/alertas.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const alertasService = inject(AlertasService);
  const token = authService.getToken();

  const reqClonada = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    : req;
  return next(reqClonada).pipe(
    catchError((err) => {
      if (err.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((response) => {
            const newToken = response.token;
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
            // authService.logOut();
            return throwError(
              () => new Error('Error al refrescar el token. Sesión expirada.')
            );
          })
        );
      }
      if (err.status === 403) {
        return authService.refreshToken().pipe(
          switchMap((response) => {
            const newToken = response.token;
            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });
            return next(newReq);
          }),
          catchError(() => {
            alertasService.mostrarToast(
              'No Autorizado',
              'error',
              'Por favor, inicia sesión de nuevo.'
            );
            // authService.logOut();
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
