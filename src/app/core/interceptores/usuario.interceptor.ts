import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AlertasService } from '../services/alertas.service';
import { catchError, switchMap, throwError } from 'rxjs';

/**
 * Interceptador que agrega el token de autenticación a las solicitudes
 * si está disponible. Si no hay token, la solicitud se deja intacta.
 * @returns La solicitud modificada o la original.
 */
export const usuarioInterceptor: HttpInterceptorFn = (req, next) => {
  const usuarioService = inject(UsuarioService);
  const alertasService = inject(AlertasService);
  const token = usuarioService.getToken();

  if (!req.url.includes('/usuarios')) {
    return next(req);
  }

  const reqClonada = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    : req;
  return next(reqClonada).pipe(
    catchError((err) => {
      if (err.status === 401) {
        return usuarioService.refreshToken().pipe(
          switchMap((response) => {
            const newToken = usuarioService.getToken();
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
            usuarioService.logOutUsuario();
            return throwError(
              () => new Error('Error al refrescar el token. Sesión expirada.')
            );
          })
        );
      }
      if (err.status === 403) {
        return usuarioService.refreshToken().pipe(
          switchMap((response) => {
            const newToken = usuarioService.getToken();
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
            usuarioService.logOutUsuario();
            return throwError(
              () => new Error('Error al refrescar el token. Sesión expirada.')
            );
          })
        );
        // alertasService.mostrarToast(
        //   'Acceso denegado',
        //   'error',
        //   'No tienes permisos para acceder a esta ruta.'
        // );
        // return throwError(() => new Error('Acceso denegado.'));
      }
      return throwError(() => err);
    })
  );
};
