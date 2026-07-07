// hooks/useDescargarCSV.ts
import { FilaTabla } from '@/types/escala';
import { formatoChileno } from '@/lib/calculos/formateador';

export function useDescargarCSV() {
  const descargar = (datos: FilaTabla[], nombreArchivo = 'escala-notas.csv') => {
    if (datos.length === 0) return;

    // Excel en configuración regional chilena espera ";" como separador
    // de columnas (porque "," ya se usa como separador decimal).
    const encabezado = 'Puntaje;Nota';
    const filas = datos.map(
      (fila) => `${formatoChileno(fila.puntaje)};${formatoChileno(fila.nota)}`
    );
    const contenido = [encabezado, ...filas].join('\r\n');

    // BOM UTF-8 para que Excel reconozca tildes/acentos correctamente.
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return { descargar };
}
