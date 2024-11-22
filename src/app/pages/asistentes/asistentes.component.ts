import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Asistente } from '../../core/Interfaces/Asistente';
import { AlertasService } from '../../core/services/alertas.service';
import { AsistentesService } from '../../core/services/asistentes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistentes',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './asistentes.component.html',
  styleUrl: './asistentes.component.css',
})
export class AsistentesComponent implements OnInit {
  id: number | undefined;
  asistentes: Asistente[] = [];
  asistenteEditando: Asistente | null = null;

  constructor(
    private asistenteService: AsistentesService,
    private alertaService: AlertasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerAsistentes();
  }

  obtenerAsistentes() {
    this.asistenteService.obtenerAsistentes().subscribe({
      next: (asistentes) => {
        this.asistentes = asistentes;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
