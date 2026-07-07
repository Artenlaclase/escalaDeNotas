// lib/calculos/generadorTabla.ts
import { ParametrosEscala, FilaTabla } from '@/types/escala';
import { calcularNotaConDetalle } from './escalaNotas';
import { formatearUnDecimal } from './formateador';

export function generarTabla(params: ParametrosEscala): FilaTabla[] {
  const { pmax, exigencia, nmin, napr, nmax, incremento, orden } = params;
  const e = exigencia / 100;
  const filas: FilaTabla[] = [];

  // Iteramos por número de pasos (entero) en vez de sumar `incremento`
  // repetidamente sobre un float, para evitar el drift típico de punto
  // flotante en JS (ej. 0.1 + 0.2 !== 0.3) cuando incremento es 0.01, 0.05, etc.
  const pasos = Math.round(pmax / incremento);

  for (let i = 0; i <= pasos; i++) {
    const p = i === pasos ? pmax : Math.min(i * incremento, pmax);
    const { nota, detalle } = calcularNotaConDetalle(p, pmax, e, nmin, napr, nmax);
    filas.push({
      puntaje: formatearUnDecimal(p),
      nota: formatearUnDecimal(nota),
      detalle,
    });
  }

  // El loop ya genera las filas en orden ascendente por puntaje,
  // así que para "desc" basta con invertir el arreglo (más barato que sort).
  return orden === 'desc' ? filas.reverse() : filas;
}
