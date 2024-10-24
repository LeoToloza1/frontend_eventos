import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { AsistentesComponent } from './pages/asistentes/asistentes.component';
import { ParticipacionComponent } from './pages/participacion/participacion.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'asistentes', component: AsistentesComponent },
  { path: 'participacion', component: ParticipacionComponent },
  { path: '**', component: NotFoundComponent, redirectTo: '' },
];
