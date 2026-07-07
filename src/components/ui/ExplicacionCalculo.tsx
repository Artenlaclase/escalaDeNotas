// components/ui/ExplicacionCalculo.tsx
import { FilaTabla } from '@/types/escala';

interface ExplicacionCalculoProps {
  fila: FilaTabla | null;
}

export function ExplicacionCalculo({ fila }: ExplicacionCalculoProps) {
  if (!fila) {
    return (
      <div className="rounded-lg border border-dashed border-tinta/20 p-4 text-sm text-tinta/50">
        Selecciona una fila de la tabla para ver cómo se calculó esa nota, paso a paso.
      </div>
    );
  }

  const { detalle } = fila;
  const aprobado = detalle.rama === 'aprobado';

  return (
    <div className="rounded-lg border border-tinta/15 bg-white p-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-tinta/60">
        Detalle del cálculo — puntaje {detalle.puntaje}
      </p>

      <p className="mt-2 text-sm text-tinta/70">
        Umbral de aprobación (exigencia × puntaje máximo):{' '}
        <span className="font-mono font-semibold">{detalle.umbral.toFixed(2)}</span>
      </p>

      <p className="mt-1 text-sm text-tinta/70">
        Este puntaje queda en el tramo{' '}
        <span className={`font-semibold ${aprobado ? 'text-emerald-700' : 'text-lapiz'}`}>
          {aprobado ? 'aprobado' : 'reprobado'}
        </span>
        , por lo que se usa la fórmula correspondiente a ese tramo:
      </p>

      <pre className="mt-2 overflow-x-auto rounded-md bg-tinta/5 p-3 font-mono text-sm text-tinta">
        {detalle.formula}
      </pre>

      <p className="mt-2 text-sm text-tinta/70">
        Nota resultante:{' '}
        <span className="font-mono font-bold">{fila.nota.toFixed(1)}</span>
      </p>
    </div>
  );
}
