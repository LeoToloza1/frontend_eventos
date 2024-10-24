import { Rol } from './Rol';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: number;
  dni: number;
  password: string | null;
  rol_id: number;
  rol: Rol;
}
