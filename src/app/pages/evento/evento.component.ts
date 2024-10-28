import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css',
})
export class EventoComponent {}
