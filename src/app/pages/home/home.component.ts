import { Component } from '@angular/core';
import { AlertasService } from '../../core/services/alertas.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tipo: string = '';
  /**
   *
   */
  constructor(private alertasService: AlertasService, private router: Router) {}

  //login para usuarios
  irALogin(tipo: string) {
    if (this.validarTipo(tipo)) {
      this.router.navigate(['/login'], { queryParams: { tipo } });
    } else {
      this.alertasService.mostrarToast(
        'URL incorrecta',
        'info',
        'Intende de nuevo por favor'
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
