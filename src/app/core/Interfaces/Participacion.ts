import { Asistente } from './Asistente';
import { Evento } from './Evento';

export interface Participacion {
  id: number;
  asistente_id: number;
  asistente?: Array<Asistente>;
  evento_id: number;
  evento: Evento;
  confirmacion: boolean;
  asistencia_real?: boolean;
}
