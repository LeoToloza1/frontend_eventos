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
  //TODO corregir para mostrar el formulario de login
  irALogin() {
    this.router.navigate(['/perfil']);
  }

  //TODO corregir para mostrar el formulario de registro
  irARegistro() {
    this.router.navigate(['/registro']);
  }
}

// deberia registrar un nuevo Asistente
// ver el perfil de cada asistente (loguearse con email y dni)
// login de los organizadores
// el organizador no puede crear otros organizadors
// el organizador puede ver todos los asistentes
// el organizador puede ver todos los eventos

/**
 * del lado del servidor, configurar el login de los organizadores y el jwt
 * el login de los asistentes
 * y validaciones
 * recupero de contraseña
 * finalizacion de eventos automatica (opcional)
 */
