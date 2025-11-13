export interface Training {
  id?: string;
  fecha: Date | string;
  musculos: MusculoEntrenado[];
  createdAt?: {
    type: string;
    seconds: number;
    nanoseconds: number;
  };
}

export interface MusculoEntrenado {
  musculo: {
    id: number;
    nombre: string;
  };
  ejercicios: EjercicioRealizado[];
}

export interface EjercicioRealizado {
  ejercicio: string;
}
