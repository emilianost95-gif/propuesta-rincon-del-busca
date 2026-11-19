const num = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });
const dec = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1, minimumFractionDigits: 1 });

/** "$4.500.000" — pesos argentinos sin decimales. */
export const ars = (n: number) => `${n < 0 ? '−' : ''}$${num.format(Math.abs(Math.round(n)))}`;
export const n0 = (n: number) => num.format(Math.round(n));
export const n1 = (n: number) => dec.format(n);
