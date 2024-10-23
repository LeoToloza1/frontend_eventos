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
      timer: 1750,
    });
  }
}
