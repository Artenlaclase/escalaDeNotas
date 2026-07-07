// lib/calculos/formateador.ts

/** Redondea a 1 decimal (redondeo estándar: hacia arriba desde x.x5). */
export function formatearUnDecimal(valor: number): number {
  return Math.round(valor * 10) / 10;
}

/** Formatea un número con 1 decimal usando coma como separador (formato chileno). */
export function formatoChileno(valor: number): string {
  return valor.toFixed(1).replace('.', ',');
}
