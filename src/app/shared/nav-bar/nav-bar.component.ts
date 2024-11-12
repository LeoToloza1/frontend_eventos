import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';
import { Asistente } from '../../core/Interfaces/Asistente';
import { Usuario } from '../../core/Interfaces/Usuario';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  rol: string | null = null;
  perfil: Asistente | Usuario | null = null;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.rol = this.authService.getRol();
    this.authService.getPerfil().subscribe({
      next: (perfil) => {
        this.perfil = perfil;
      },
      error: (err) => {
        console.error('Error al obtener el perfil:', err);
      },
    });
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  cerrarSesion(): void {
    console.log('Click en cerrar sesion');
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
