import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-participacion',
  standalone: true,
  imports: [FooterComponent,NavBarComponent],
  templateUrl: './participacion.component.html',
  styleUrl: './participacion.component.css'
})
export class ParticipacionComponent {

}
