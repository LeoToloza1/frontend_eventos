import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../core/services/usuario.service';
import { AlertasService } from '../../core/services/alertas.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(
    private alerta: AlertasService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(email: string, password: string) {
    this.isLoading = true; // Indica que se está procesando el login
    this.usuarioService.loginUsuario(email, password).subscribe({
      next: (data) => {
        this.alerta.mostrarToast('Login exitoso', 'success', 'Login');
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        this.alerta.mostrarToast('Credenciales inválidas', 'error', 'Login');
        console.log(err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
