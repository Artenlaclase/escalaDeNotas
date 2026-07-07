// __tests__/escalaNotas.test.ts
import { calcularNota } from '@/lib/calculos/escalaNotas';
import { generarTabla } from '@/lib/calculos/generadorTabla';
import { validarParametros } from '@/lib/validaciones/validarParametros';
import { formatearUnDecimal } from '@/lib/calculos/formateador';
import { ParametrosEscala } from '@/types/escala';

describe('calcularNota', () => {
  test('puntaje 0 debe dar nota mínima', () => {
    const nota = calcularNota(0, 100, 0.6, 1, 4, 7);
    expect(nota).toBe(1);
  });

  test('puntaje máximo debe dar nota máxima', () => {
    const nota = calcularNota(100, 100, 0.6, 1, 4, 7);
    expect(nota).toBe(7);
  });

  test('puntaje en el umbral de exigencia debe dar la nota de aprobación', () => {
    const nota = calcularNota(60, 100, 0.6, 1, 4, 7);
    expect(nota).toBeCloseTo(4, 5);
  });

  test('coincide con el sitio de referencia: 57/100 al 60% de exigencia -> 3.9', () => {
    const nota = calcularNota(57, 100, 0.6, 1, 4, 7);
    expect(formatearUnDecimal(nota)).toBe(3.9);
  });

  test('coincide con el sitio de referencia: 73/100 al 60% de exigencia -> 5.0', () => {
    const nota = calcularNota(73, 100, 0.6, 1, 4, 7);
    expect(formatearUnDecimal(nota)).toBe(5.0);
  });
});

describe('generarTabla - precisión con incrementos decimales', () => {
  test('no debe acumular drift de punto flotante con incremento 0.1', () => {
    const params: ParametrosEscala = {
      pmax: 10,
      exigencia: 60,
      nmin: 1,
      napr: 4,
      nmax: 7,
      incremento: 0.1,
      orden: 'asc',
    };
    const filas = generarTabla(params);
    // 10 / 0.1 = 100 pasos + 1 = 101 filas exactas, sin filas de más por drift
    expect(filas.length).toBe(101);
    expect(filas[filas.length - 1].puntaje).toBe(10);
  });

  test('genera la cantidad correcta de filas según el incremento', () => {
    const params: ParametrosEscala = {
      pmax: 100,
      exigencia: 60,
      nmin: 1,
      napr: 4,
      nmax: 7,
      incremento: 5,
      orden: 'asc',
    };
    const filas = generarTabla(params);
    expect(filas.length).toBe(21); // 0,5,10,...,100
  });

  test('orden desc invierte correctamente la tabla', () => {
    const params: ParametrosEscala = {
      pmax: 10,
      exigencia: 60,
      nmin: 1,
      napr: 4,
      nmax: 7,
      incremento: 1,
      orden: 'desc',
    };
    const filas = generarTabla(params);
    expect(filas[0].puntaje).toBe(10);
    expect(filas[filas.length - 1].puntaje).toBe(0);
  });
});

describe('validarParametros', () => {
  const base: ParametrosEscala = {
    pmax: 100,
    exigencia: 60,
    nmin: 1,
    napr: 4,
    nmax: 7,
    incremento: 1,
    orden: 'asc',
  };

  test('rechaza exigencia = 100%', () => {
    const error = validarParametros({ ...base, exigencia: 100 });
    expect(error).not.toBeNull();
  });

  test('rechaza pmax <= 0', () => {
    const error = validarParametros({ ...base, pmax: 0 });
    expect(error).not.toBeNull();
  });

  test('rechaza nmin >= napr', () => {
    const error = validarParametros({ ...base, nmin: 4, napr: 4 });
    expect(error).not.toBeNull();
  });

  test('acepta parámetros válidos por defecto', () => {
    expect(validarParametros(base)).toBeNull();
  });

  test('rechaza parámetros que sean NaN', () => {
    const error = validarParametros({ ...base, pmax: NaN });
    expect(error).toBe('Todos los parámetros deben ser valores numéricos válidos.');
  });
});

describe('formatearUnDecimal', () => {
  test('redondea correctamente hacia arriba desde x.x5', () => {
    expect(formatearUnDecimal(3.95)).toBe(4.0);
    expect(formatearUnDecimal(4.975)).toBeCloseTo(5.0, 5);
  });
});
