// components/ui/TablaResultados.tsx
import { FilaTabla } from '@/types/escala';

interface TablaResultadosProps {
  datos: FilaTabla[];
  visible: boolean;
  filaSeleccionada: FilaTabla | null;
  onSeleccionarFila: (fila: FilaTabla) => void;
}

export function TablaResultados({
  datos,
  visible,
  filaSeleccionada,
  onSeleccionarFila,
}: TablaResultadosProps) {
  if (!visible) return null;

  return (
    <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-tinta/15">
      <table className="w-full border-collapse text-left" role="table">
        <thead className="sticky top-0 bg-tinta text-white">
          <tr>
            <th scope="col" className="px-4 py-2 text-sm font-semibold">Puntaje</th>
            <th scope="col" className="px-4 py-2 text-sm font-semibold">Nota</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, idx) => {
            const seleccionada = filaSeleccionada?.puntaje === fila.puntaje;
            const aprobado = fila.detalle.rama === 'aprobado';
            return (
              <tr
                key={idx}
                tabIndex={0}
                role="button"
                aria-pressed={seleccionada}
                onClick={() => onSeleccionarFila(fila)}
                onKeyDown={(e) => e.key === 'Enter' && onSeleccionarFila(fila)}
                className={`cursor-pointer border-t border-tinta/10 transition-colors
                  ${seleccionada ? 'bg-lapiz/10' : 'hover:bg-tinta/5'}`}
              >
                <td className="px-4 py-1.5 font-mono text-sm text-tinta">
                  {fila.puntaje.toFixed(1)}
                </td>
                <td
                  className={`px-4 py-1.5 font-mono text-sm font-semibold
                    ${aprobado ? 'text-emerald-700' : 'text-lapiz'}`}
                >
                  {fila.nota.toFixed(1)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
