// lib/validaciones/validarParametros.ts
import { ParametrosEscala } from '@/types/escala';

export function validarParametros(params: ParametrosEscala): string | null {
  const { pmax, exigencia, nmin, napr, nmax, incremento } = params;

  if (
    isNaN(pmax) ||
    isNaN(exigencia) ||
    isNaN(nmin) ||
    isNaN(napr) ||
    isNaN(nmax) ||
    isNaN(incremento)
  ) {
    return 'Todos los parámetros deben ser valores numéricos válidos.';
  }

  if (pmax <= 0) return 'El puntaje máximo debe ser mayor a 0.';

  // exigencia = 100% se rechaza explícitamente: haría que el denominador
  // de la rama "aprobado" sea 0 (pmax * (1 - e) = 0), produciendo NaN
  // justo en el puntaje máximo.
  if (exigencia < 0 || exigencia >= 100) {
    return 'La exigencia debe estar entre 0 y 99,9%.';
  }

  if (incremento <= 0) return 'El incremento debe ser mayor a 0.';
  if (incremento > pmax) return 'El incremento no puede ser mayor que el puntaje máximo.';

  if (!(nmin < napr && napr < nmax)) {
    return 'Debe cumplirse: Nota mínima < Nota aprobación < Nota máxima.';
  }

  return null;
}
