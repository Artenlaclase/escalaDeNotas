// components/ui/BotonDescargar.tsx
import { FilaTabla } from '@/types/escala';
import { Button } from '@/components/shared/Button';
import { useDescargarCSV } from '@/hooks/useDescargarCSV';

interface BotonDescargarProps {
  datos: FilaTabla[];
}

export function BotonDescargar({ datos }: BotonDescargarProps) {
  const { descargar } = useDescargarCSV();

  return (
    <Button
      variant="secondary"
      disabled={datos.length === 0}
      onClick={() => descargar(datos)}
      className="disabled:cursor-not-allowed disabled:opacity-40"
    >
      Descargar CSV
    </Button>
  );
}
