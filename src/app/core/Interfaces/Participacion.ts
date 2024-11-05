import { Asistente } from './Asistente';

export interface Participacion {
  id: number;
  asistente_id: number;
  asistente: Asistente;
  evento_id: number;
  confirmacion: boolean;
  asistencia_real?: boolean;
}
