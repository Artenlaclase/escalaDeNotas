'use client';

import { useState } from 'react';
import { useEscalaNotas } from '@/hooks/useEscalaNotas';
import { FormularioParametros } from '@/components/ui/FormularioParametros';
import { TablaResultados } from '@/components/ui/TablaResultados';
import { ExplicacionCalculo } from '@/components/ui/ExplicacionCalculo';
import { BotonGenerar } from '@/components/ui/BotonGenerar';
import { BotonDescargar } from '@/components/ui/BotonDescargar';
import { FilaTabla } from '@/types/escala';

export default function HomePage() {
  const { parametros, datos, error, advertencia, actualizarParametro, generar } = useEscalaNotas();
  const [filaSeleccionada, setFilaSeleccionada] = useState<FilaTabla | null>(null);

  const generarYReiniciarSeleccion = () => {
    generar();
    setFilaSeleccionada(null);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8 border-b border-tinta/10 pb-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-lapiz">Escala de notas</p>
        <h1 className="mt-1 text-3xl font-bold text-tinta">Calculadora de escala de notas</h1>
        <p className="mt-2 max-w-2xl text-tinta/60">
          Convierte puntajes de una evaluación a notas chilenas (1,0 a 7,0) según el porcentaje
          de exigencia. Ajusta los parámetros, genera la tabla y descárgala en CSV.
        </p>
      </header>

      <FormularioParametros
        parametros={parametros}
        onChange={actualizarParametro}
        error={error}
      />

      <div className="my-5 flex flex-wrap items-center gap-3">
        <BotonGenerar onClick={generarYReiniciarSeleccion} />
        <BotonDescargar datos={datos} />
        {advertencia && (
          <p className="text-sm text-amber-700">{advertencia}</p>
        )}
      </div>

      {datos.length > 0 && (
        <div className="mt-8 flex flex-col gap-6">
          <TablaResultados
            datos={datos}
            visible={datos.length > 0}
            filaSeleccionada={filaSeleccionada}
            onSeleccionarFila={setFilaSeleccionada}
          />
          <ExplicacionCalculo fila={filaSeleccionada} />
        </div>
      )}
    </main>
  );
}
