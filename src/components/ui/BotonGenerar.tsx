// components/ui/BotonGenerar.tsx
import { Button } from '@/components/shared/Button';

interface BotonGenerarProps {
  onClick: () => void;
}

export function BotonGenerar({ onClick }: BotonGenerarProps) {
  return (
    <Button variant="primary" onClick={onClick}>
      Generar tabla
    </Button>
  );
}
