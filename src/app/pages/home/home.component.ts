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
  /**
   *
   */
  constructor(private alertasService: AlertasService, private router: Router) {}

  mostrarToast() {
    this.alertasService.mostrarToast('Hola mundo', 'success', 'Hola Mundo');
  }
  //login para usuarios
  irALogin() {
    this.router.navigate(['/login']);
  }

  //registro de usuarios nuevos
  irARegistro() {
    this.router.navigate(['/registro']);
  }
}
