import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { AlertasService } from '../../../core/services/alertas.service';
import { AuthService } from '../../../core/services/auth.service';
import { Asistente } from '../../../core/Interfaces/Asistente';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-perfil-asistente',
  standalone: true,
  imports: [
    FooterComponent,
    NavBarComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './perfil-asistente.component.html',
  styleUrl: './perfil-asistente.component.css',
})
export class PerfilAsistenteComponent implements OnInit {
  asistente: Asistente = {
    id: 0,
    dni: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: 0,
  };
  activado = false;
  constructor(
    private alerta: AlertasService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.perfil();
  }

  perfil() {
    this.authService
      .getPerfil()
      .pipe()
      .subscribe((response) => {
        this.asistente = response;
      });
  }

  editarPerfil() {
    this.activado = true;
  }

  guardarCambios() {
    this.activado = false;
  }
}
