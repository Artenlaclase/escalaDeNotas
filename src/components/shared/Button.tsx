// components/shared/Button.tsx
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const base = 'rounded-md px-4 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const estilos =
    variant === 'primary'
      ? 'bg-lapiz text-white hover:bg-lapiz/90 focus:ring-lapiz/60'
      : 'bg-transparent border border-tinta/30 text-tinta hover:bg-tinta/5 focus:ring-tinta/30';

  return (
    <button className={`${base} ${estilos} ${className}`} {...props}>
      {children}
    </button>
  );
}
