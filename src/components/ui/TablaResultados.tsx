// components/ui/TablaResultados.tsx
import { FilaTabla } from '@/types/escala';

interface TablaResultadosProps {
  datos: FilaTabla[];
  visible: boolean;
  filaSeleccionada: FilaTabla | null;
  onSeleccionarFila: (fila: FilaTabla) => void;
}

// Helper to chunk array
const chunk = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export function TablaResultados({
  datos,
  visible,
  filaSeleccionada,
  onSeleccionarFila,
}: TablaResultadosProps) {
  if (!visible) return null;

  // Chunk the results into groups of 10 rows to display them side-by-side
  const subTablas = chunk(datos, 10);

  return (
    <div className="flex flex-wrap gap-4 items-start justify-start">
      {subTablas.map((subTabla, colIdx) => (
        <div key={colIdx} className="overflow-hidden rounded border border-tinta/10 shadow-sm bg-white min-w-[120px]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-tinta/5 border-b border-tinta/10">
                <th scope="col" className="px-2 py-1 text-xs font-semibold text-tinta/70 border-r border-tinta/10">Puntaje</th>
                <th scope="col" className="px-2 py-1 text-xs font-semibold text-tinta/70">Nota</th>
              </tr>
            </thead>
            <tbody>
              {subTabla.map((fila, idx) => {
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
                    className={`cursor-pointer border-b border-tinta/10 last:border-b-0 transition-colors text-xs
                      ${seleccionada ? 'bg-lapiz/10 font-semibold' : 'hover:bg-tinta/5'}`}
                  >
                    <td className="px-2 py-1 font-mono text-tinta border-r border-tinta/10">
                      {fila.puntaje.toFixed(1)}
                    </td>
                    <td
                      className={`px-2 py-1 font-mono font-medium
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
      ))}
    </div>
  );
}
