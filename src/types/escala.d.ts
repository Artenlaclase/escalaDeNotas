// types/escala.d.ts

export interface ParametrosEscala {
  pmax: number;                  // Puntaje máximo (ej. 100)
  exigencia: number;              // Exigencia en % (ej. 60). Debe ser 0 <= exigencia < 100
  nmin: number;                   // Nota mínima (ej. 1.0)
  nmax: number;                   // Nota máxima (ej. 7.0)
  napr: number;                   // Nota aprobación (ej. 4.0)
  incremento: IncrementoValido;   // Paso entre filas (ej. 1.0)
  orden: 'asc' | 'desc';
}

export interface DetalleCalculo {
  puntaje: number;
  umbral: number;                // e * pmax
  rama: 'reprobado' | 'aprobado';
  formula: string;                // Fórmula con los valores ya sustituidos, lista para mostrar
  resultado: number;
}

export interface FilaTabla {
  puntaje: number;
  nota: number;
  detalle: DetalleCalculo;
}

export type IncrementoValido = 0.01 | 0.05 | 0.1 | 0.25 | 0.5 | 1.0 | 5.0 | 10.0;
