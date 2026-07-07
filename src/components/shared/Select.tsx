// components/shared/Select.tsx
interface OpcionSelect {
  label: string;
  value: string | number;
}

interface SelectProps {
  id: string;
  label: string;
  value: string | number;
  opciones: OpcionSelect[];
  onChange: (valor: string) => void;
}

export function Select({ id, label, value, opciones, onChange }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-tinta/80">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-tinta/20 bg-papel px-3 py-2 text-tinta
                   focus:outline-none focus:ring-2 focus:ring-lapiz/60 focus:border-lapiz"
      >
        {opciones.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
    </div>
  );
}
