import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Calculadora de Escala de Notas (Chile)',
  description:
    'Convierte puntajes a notas chilenas (1,0 a 7,0) según el porcentaje de exigencia. Genera y descarga tu tabla de conversión.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-papel text-tinta antialiased">{children}</body>
    </html>
  );
}
