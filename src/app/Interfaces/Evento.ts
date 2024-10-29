export interface Evento {
  id?: number;
  nombre: string;
  ubicacion: string;
  fecha: Date;
  descripcion: string;
  realizado?: boolean;
}
