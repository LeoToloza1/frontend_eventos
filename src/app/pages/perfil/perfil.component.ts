import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { AlertasService } from '../../core/services/alertas.service';
import { UsuarioService } from '../../core/services/usuario.service';
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

  constructor(
    private alerta: AlertasService,
    private usuarioService: UsuarioService
  ) {}
  mostrarToast() {}
  ngOnInit(): void {
    this.obtenerUsuario();
  }

  editarPerfil() {
    this.mostrarToast();
  }

  obtenerUsuario() {
    this.usuarioService.getPerfil().subscribe({
      next: (data: Usuario) => {
        this.usuario = data;
      },
      error: (err) => {
        this.alerta.mostrarToast('Error', 'error', 'Error al obtener usuario');
        console.error('Error al obtener usuario:', err);
      },
    });
  }
}
