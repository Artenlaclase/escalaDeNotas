// components/shared/Input.tsx
interface InputProps {
  id: string;
  label: string;
  value: number;
  onChange: (valor: number) => void;
  step?: number;
  min?: number;
  max?: number;
}

export function Input({ id, label, value, onChange, step = 0.1, min, max }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-tinta/80">
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="rounded-md border border-tinta/20 bg-papel px-3 py-2 text-tinta
                   focus:outline-none focus:ring-2 focus:ring-lapiz/60 focus:border-lapiz"
      />
    </div>
  );
}
