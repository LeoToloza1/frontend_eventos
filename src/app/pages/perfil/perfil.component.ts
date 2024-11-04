import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { AlertasService } from '../../core/services/alertas.service';
import { AuthService } from '../../core/services/auth.service';
import { Usuario } from '../../Interfaces/Usuario';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FooterComponent, NavBarComponent, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  usuario: Usuario | undefined;
  activado = false;
  constructor(
    private alerta: AlertasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  editarPerfil() {}

  abrirModal() {
    this.activado = true;
  }

  obtenerUsuario() {
    this.authService
      .getPerfil()
      .pipe()
      .subscribe((response) => {
        this.usuario = response;
      });
  }
}
