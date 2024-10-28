import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
@Component({
  selector: 'app-asistentes',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './asistentes.component.html',
  styleUrl: './asistentes.component.css',
})
export class AsistentesComponent {}
