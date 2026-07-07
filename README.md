# Calculadora de Escala de Notas (Chile)

Aplicación 100% frontend (Next.js 14 + TypeScript + Tailwind) que convierte puntajes de una
evaluación en notas chilenas (1,0 a 7,0), según el porcentaje de exigencia.

## Instalación

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Pruebas

```bash
npm run test
```

## Cambios respecto al documento de arquitectura original

Este scaffold incorpora las correcciones acordadas tras la revisión:

1. **`exigencia = 100%` rechazada explícitamente** en `validarParametros.ts`, evitando la
   división por cero que ocurría en el borde `p = pmax = umbral`.
2. **Explicación paso a paso del cálculo** (`ExplicacionCalculo.tsx`): cada fila de la tabla es
   clickeable y muestra la fórmula sustituida con los valores reales, tal como en
   escaladenotas.cl.
3. **Generación de tabla sin drift de punto flotante**: se itera por número de pasos entero
   (`Math.round(pmax / incremento)`) en vez de acumular `p += incremento`, evitando errores de
   redondeo con incrementos como 0.01 o 0.05.
4. **CSV en formato chileno**: separador `;` y coma como separador decimal, con BOM UTF-8 para
   que Excel en configuración regional de Chile lo abra correctamente.
5. **Advertencia de rendimiento**: si la tabla generada supera ~2000 filas (incrementos
   pequeños con `pmax` grande), se muestra un aviso no bloqueante al usuario.
6. **Tipos consistentes**: `ParametrosEscala.incremento` ahora usa `IncrementoValido` en vez de
   `number` genérico.

## Estructura

Se mantiene la estructura de carpetas propuesta en el documento original
(`lib/calculos`, `lib/validaciones`, `hooks`, `components/ui`, `components/shared`, `types`,
`utils`), con la adición de `components/ui/ExplicacionCalculo.tsx`.

## Pendientes sugeridos (no incluidos en este MVP)

- Exportar a Excel con fórmulas incrustadas (no solo valores).
- Persistencia de parámetros en `localStorage`.
- Modo oscuro.
- Virtualización de la tabla para incrementos muy pequeños (>5000 filas).
