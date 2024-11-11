import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AlertasService } from '../../core/services/alertas.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  tipo: string = '';
  esAsistente: boolean = false;

  constructor(
    private alerta: AlertasService,
    private authService: AuthService,
    private router: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ruta.queryParams.subscribe((params) => {
      this.tipo = params['tipo'];
      this.validarTipo();
    });
  }

  validarTipo(): void {
    if (this.tipo === 'asistente') {
      this.esAsistente = true;
    } else if (this.tipo === 'usuario') {
      this.esAsistente = false;
    } else {
      this.alerta.mostrarToast('URL incorrecta', 'error', 'Login');
      this.router.navigate(['/']);
    }
  }
  login(email: string, password: string): void {
    this.isLoading = true;
    this.authService.login(email, password, this.esAsistente).subscribe({
      next: (data) => {
        this.alerta.mostrarToast('Login exitoso', 'success', 'Login');
        if (this.esAsistente) {
          this.router.navigate(['/perfil/asistente']);
        } else {
          this.router.navigate(['/perfil']);
        }
      },
      error: (err) => {
        this.alerta.mostrarToast(
          err?.message || 'Credenciales inválidas',
          'error',
          'Login'
        );
        console.log(err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
