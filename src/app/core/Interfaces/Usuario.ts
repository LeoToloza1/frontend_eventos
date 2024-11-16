import { Asistente } from './Asistente';
import { Rol } from './Rol';

export interface Usuario extends Asistente {
  rol_id: number;
  rol?: Rol;
}
