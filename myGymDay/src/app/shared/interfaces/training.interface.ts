export interface Training {
  id?: string;
  fecha: Date;
  musculos: [{ id: number; nombre: string }];
}
