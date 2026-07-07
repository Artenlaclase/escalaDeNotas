// hooks/useEscalaNotas.ts
import { useState } from 'react';
import { ParametrosEscala, FilaTabla } from '@/types/escala';
import { generarTabla } from '@/lib/calculos/generadorTabla';
import { validarParametros } from '@/lib/validaciones/validarParametros';
import { PARAMETROS_POR_DEFECTO, UMBRAL_FILAS_ADVERTENCIA } from '@/utils/constants';

export function useEscalaNotas() {
  const [parametros, setParametros] = useState<ParametrosEscala>(PARAMETROS_POR_DEFECTO);
  const [datos, setDatos] = useState<FilaTabla[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [advertencia, setAdvertencia] = useState<string | null>(null);

  const actualizarParametro = (campo: keyof ParametrosEscala, valor: number | string) => {
    setParametros((prev) => ({ ...prev, [campo]: valor }));
  };

  const generar = () => {
    const nuevoError = validarParametros(parametros);
    if (nuevoError) {
      setError(nuevoError);
      setDatos([]);
      setAdvertencia(null);
      return;
    }

    setError(null);

    const cantidadEsperada = Math.round(parametros.pmax / parametros.incremento) + 1;
    setAdvertencia(
      cantidadEsperada > UMBRAL_FILAS_ADVERTENCIA
        ? `La tabla tendrá ${cantidadEsperada.toLocaleString('es-CL')} filas. Podría tardar un momento en renderizarse.`
        : null
    );

    try {
      const filas = generarTabla(parametros);
      setDatos(filas);
    } catch (err) {
      setError('Error al generar la tabla. Revisa los parámetros ingresados.');
      setDatos([]);
    }
  };

  return {
    parametros,
    datos,
    error,
    advertencia,
    actualizarParametro,
    generar,
  };
}
