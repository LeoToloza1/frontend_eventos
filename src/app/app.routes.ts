import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { AsistentesComponent } from './pages/asistentes/asistentes.component';
import { ParticipacionComponent } from './pages/participacion/participacion.component';
import { EventoComponent } from './pages/evento/evento.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { authGuard } from './core/guards/auth.guard';
import { usuarioGuard } from './core/guards/usuario.guard';
import { PerfilAsistenteComponent } from './pages/perfil/perfil-asistente/perfil-asistente.component';
import { asistenteGuard } from './core/guards/asistente.guard';
import { MisEventosComponent } from './pages/eventos/mis-eventos/mis-eventos.component';
import { RecuperarPassComponent } from './pages/recuperar-pass/recuperar-pass.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [authGuard, usuarioGuard],
  },
  {
    path: 'perfil/asistente',
    component: PerfilAsistenteComponent,
    canActivate: [authGuard, asistenteGuard],
  },
  {
    path: 'eventos',
    component: EventosComponent,
    canActivate: [authGuard, usuarioGuard],
  },
  {
    path: 'evento',
    component: EventoComponent,
    canActivate: [authGuard, usuarioGuard],
  },
  {
    path: 'mis-eventos',
    component: MisEventosComponent,
    canActivate: [authGuard, asistenteGuard],
  },
  {
    path: 'participacion',
    component: ParticipacionComponent,
    canActivate: [authGuard, asistenteGuard],
  },
  {
    path: 'asistentes',
    component: AsistentesComponent,
    canActivate: [authGuard, usuarioGuard],
  },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar', component: RecuperarPassComponent },

  { path: '**', component: NotFoundComponent },
];
