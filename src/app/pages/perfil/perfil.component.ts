import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { AlertasService } from '../../core/services/alertas.service';
import { AuthService } from '../../core/services/auth.service';
import { Usuario } from '../../Interfaces/Usuario';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importa MatInputModule

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FooterComponent,
    NavBarComponent,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    dni: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: 0,
    password: '',
    rol: { rol: '' },
    rol_id: 0,
  };
  activado = false;

  constructor(
    private alerta: AlertasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  editarPerfil() {
    this.activado = true;
  }

  guardarCambios() {
    // this.alerta.mostrarToast(
    //   'Guardando cambios...',
    //   'info',
    //   'Guardando cambios'
    // );
    this.activado = false;
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
