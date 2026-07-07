// utils/constants.ts
import { ParametrosEscala, IncrementoValido } from '@/types/escala';

export const INCREMENTOS_FIJOS: IncrementoValido[] = [
  0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 5.0, 10.0,
];

// Por sobre este número de filas se sugiere avisar al usuario
// (rendimiento de la tabla). No bloquea la generación, solo informa.
export const UMBRAL_FILAS_ADVERTENCIA = 2000;

export const PARAMETROS_POR_DEFECTO: ParametrosEscala = {
  pmax: 100,
  exigencia: 60,
  nmin: 1.0,
  nmax: 7.0,
  napr: 4.0,
  incremento: 1.0,
  orden: 'asc',
};
