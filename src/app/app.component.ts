import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertasService } from './services/alertas.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app-gestion';
  constructor(private alertasService: AlertasService) {}
  mostrarToast() {
    this.alertasService.mostrarToast('Hola mundo', 'success', 'Hola Mundo');
  }
}
