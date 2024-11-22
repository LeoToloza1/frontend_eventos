import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { AlertasService } from '../../core/services/alertas.service';
import { AuthService } from '../../core/services/auth.service';
import { Usuario } from '../../core/Interfaces/Usuario';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService } from '../../core/services/usuario.service';
import { catchError } from 'rxjs';

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
  private usuarioService = inject(UsuarioService);

  usuario: Usuario = {
    id: 0,
    dni: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: 0,
    password: null,
    rol_id: 0,
  };
  activado = false;

  constructor(
    private alerta: AlertasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService
      .getPerfil()
      .pipe()
      .subscribe((response) => {
        this.usuario = response;
        console.log('RESPUESTA DEL PERFIL: -->', response);
      });
  }

  editarPerfil() {
    this.activado = true;
  }

  guardarCambios(usuarioEditado: Usuario) {
    const usuarioParaActualizar: Usuario = {
      id: this.usuario.id,
      nombre: usuarioEditado.nombre,
      apellido: usuarioEditado.apellido,
      dni: usuarioEditado.dni,
      email: usuarioEditado.email,
      telefono: usuarioEditado.telefono,
      rol_id: this.usuario.rol_id,
    };

    console.log('Edición de perfil: --> ', usuarioParaActualizar);

    this.alerta
      .mostrarConfirmacion(
        '¿Estás seguro de que deseas guardar los cambios en tu perfil?',
        'question',
        'Confirmar cambios'
      )
      .then((confirmado) => {
        if (confirmado) {
          this.usuarioService
            .editarPerfil(usuarioParaActualizar)
            .pipe(
              catchError((error) => {
                this.alerta.mostrarToast(
                  'Error al guardar los cambios. Por favor, inténtalo nuevamente.',
                  'error',
                  'Error'
                );
                throw error;
              })
            )
            .subscribe(() => {
              this.alerta.mostrarToast(
                'Los cambios se han guardado correctamente.',
                'success',
                'Éxito'
              );
              this.activado = false;
            });
        }
      });
  }
}
