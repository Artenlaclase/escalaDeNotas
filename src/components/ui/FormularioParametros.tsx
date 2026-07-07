// components/ui/FormularioParametros.tsx
import { ParametrosEscala } from '@/types/escala';
import { INCREMENTOS_FIJOS } from '@/utils/constants';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';

interface FormularioParametrosProps {
  parametros: ParametrosEscala;
  onChange: (campo: keyof ParametrosEscala, valor: number | string) => void;
  error: string | null;
}

export function FormularioParametros({ parametros, onChange, error }: FormularioParametrosProps) {
  return (
    <fieldset className="rounded-lg border border-tinta/15 bg-white p-5">
      <legend className="px-2 text-sm font-semibold uppercase tracking-wide text-tinta/60">
        Parámetros de la escala
      </legend>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Input
          id="pmax"
          label="Puntaje máximo"
          value={parametros.pmax}
          step={1}
          min={1}
          onChange={(v) => onChange('pmax', v)}
        />
        <Input
          id="exigencia"
          label="Exigencia (%)"
          value={parametros.exigencia}
          step={1}
          min={0}
          max={99.9}
          onChange={(v) => onChange('exigencia', v)}
        />
        <Input
          id="nmin"
          label="Nota mínima"
          value={parametros.nmin}
          step={0.1}
          onChange={(v) => onChange('nmin', v)}
        />
        <Input
          id="napr"
          label="Nota de aprobación"
          value={parametros.napr}
          step={0.1}
          onChange={(v) => onChange('napr', v)}
        />
        <Input
          id="nmax"
          label="Nota máxima"
          value={parametros.nmax}
          step={0.1}
          onChange={(v) => onChange('nmax', v)}
        />
        <Select
          id="incremento"
          label="Incremento"
          value={parametros.incremento}
          opciones={INCREMENTOS_FIJOS.map((v) => ({ label: String(v), value: v }))}
          onChange={(v) => onChange('incremento', parseFloat(v))}
        />
        <Select
          id="orden"
          label="Orden de la tabla"
          value={parametros.orden}
          opciones={[
            { label: 'Ascendente', value: 'asc' },
            { label: 'Descendente', value: 'desc' },
          ]}
          onChange={(v) => onChange('orden', v)}
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-md bg-lapiz/10 px-3 py-2 text-sm font-medium text-lapiz">
          {error}
        </p>
      )}
    </fieldset>
  );
}
