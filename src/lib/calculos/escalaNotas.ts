// lib/calculos/escalaNotas.ts
import { DetalleCalculo } from '@/types/escala';

export interface ResultadoCalculo {
  nota: number;
  detalle: DetalleCalculo;
}

/**
 * Calcula la nota para un puntaje dado y devuelve además el detalle
 * del cálculo (fórmula sustituida) para poder explicárselo al usuario.
 *
 * Precondición: 0 <= e < 1 (validada en validarParametros). Si e === 1,
 * el denominador de la rama "aprobado" sería 0; por eso NO se permite
 * exigencia = 100% en la validación de parámetros.
 */
export function calcularNotaConDetalle(
  p: number,
  pmax: number,
  e: number, // exigencia en tanto por uno (0.6)
  nmin: number,
  napr: number,
  nmax: number
): ResultadoCalculo {
  const umbral = e * pmax;

  if (p < umbral) {
    const nota = (napr - nmin) * (p / umbral) + nmin;
    return {
      nota,
      detalle: {
        puntaje: p,
        umbral,
        rama: 'reprobado',
        formula: `(${napr} − ${nmin}) × (${p} / ${redondear(umbral)}) + ${nmin} = ${redondear(nota)}`,
        resultado: nota,
      },
    };
  }

  const denominador = pmax * (1 - e);
  const nota = (nmax - napr) * ((p - umbral) / denominador) + napr;
  return {
    nota,
    detalle: {
      puntaje: p,
      umbral,
      rama: 'aprobado',
      formula: `(${nmax} − ${napr}) × ((${p} − ${redondear(umbral)}) / ${redondear(denominador)}) + ${napr} = ${redondear(nota)}`,
      resultado: nota,
    },
  };
}

/** Atajo cuando solo se necesita la nota, sin el detalle. */
export function calcularNota(
  p: number,
  pmax: number,
  e: number,
  nmin: number,
  napr: number,
  nmax: number
): number {
  return calcularNotaConDetalle(p, pmax, e, nmin, napr, nmax).nota;
}

function redondear(valor: number): number {
  return Math.round(valor * 100) / 100;
}
