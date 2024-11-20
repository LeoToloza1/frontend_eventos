import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  constructor() {}

  mostrarToast(mensaje: string, tipo: SweetAlertIcon, titulo: string) {
    Swal.fire({
      position: 'center',
      icon: tipo,
      text: mensaje,
      title: titulo,
      showConfirmButton: false,
      timer: 2000,
    });
  }
  mostrarToast2(mensaje: string, tipo: SweetAlertIcon, titulo: string) {
    Swal.fire({
      position: 'center',
      icon: tipo,
      text: mensaje,
      title: titulo,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      timer: 3000,
    });
  }

  mostrarConfirmacion(
    mensaje: string,
    tipo: SweetAlertIcon,
    titulo: string
  ): Promise<boolean> {
    return Swal.fire({
      position: 'center',
      icon: tipo,
      text: mensaje,
      title: titulo,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => result.isConfirmed);
  }
}
