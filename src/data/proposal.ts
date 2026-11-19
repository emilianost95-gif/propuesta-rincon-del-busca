/**
 * Datos de la propuesta.
 *
 * - Los valores comerciales (inversión, cuotas, mantenimiento, plazos) son los
 *   definidos para esta cotización.
 * - TODO lo que alimenta las maquetas (productos, puestos, movimientos,
 *   alertas, proveedores) es FICTICIO y existe sólo para ilustrar el sistema.
 */

// ── Datos comerciales ───────────────────────────────────────────────────────
export const PROPOSAL = {
  client: 'El Rincón del Busca',
  product: 'Sistema Integral de Gestión Comercial',
  /** Fecha de emisión mostrada en la propuesta. Actualizar al reenviarla. */
  issuedAt: new Date(2026, 10, 19),
  validityDays: 7,
  /** Facturación mensual informada por el cliente — sólo contexto de escala. */
  reportedMonthlyRevenue: 200_000_000,
  development: 4_500_000,
  maintenance: 250_000,
  payments: [
    { pct: 40, label: 'Inicio del proyecto', detail: 'Al firmar y comenzar el relevamiento.' },
    { pct: 30, label: 'Versión funcional', detail: 'Al entregar la versión funcional para validación.' },
    { pct: 30, label: 'Entrega final', detail: 'Con la puesta en marcha acordada.' },
  ],
} as const;

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });

export const validUntil = () => {
  const d = new Date(PROPOSAL.issuedAt);
  d.setDate(d.getDate() + PROPOSAL.validityDays);
  return d;
};

// ── Datos ficticios de demostración ─────────────────────────────────────────
export type StockStatus = 'ok' | 'bajo' | 'critico' | 'agotado';

export interface DemoProduct {
  sku: string;
  name: string;
  category: 'Limpieza' | 'Bazar' | 'Consumo' | 'Mercadería';
  cost: number;
  price: number;
  stock: number;
  min: number;
}

export const DEMO_PRODUCTS: DemoProduct[] = [
  { sku: 'LIM-0142', name: 'Lavandina 2 L', category: 'Limpieza', cost: 1150, price: 1890, stock: 340, min: 120 },
  { sku: 'LIM-0210', name: 'Detergente concentrado 750 ml', category: 'Limpieza', cost: 1420, price: 2350, stock: 64, min: 80 },
  { sku: 'BAZ-0318', name: 'Set de vasos de vidrio x6', category: 'Bazar', cost: 5200, price: 8900, stock: 22, min: 30 },
  { sku: 'BAZ-0455', name: 'Recipiente hermético 1,5 L', category: 'Bazar', cost: 2100, price: 3600, stock: 0, min: 25 },
  { sku: 'CON-0107', name: 'Papel higiénico x4', category: 'Consumo', cost: 1980, price: 3100, stock: 512, min: 150 },
  { sku: 'LIM-0388', name: 'Esponja doble faz x3', category: 'Limpieza', cost: 640, price: 1150, stock: 18, min: 60 },
  { sku: 'BAZ-0520', name: 'Escurridor de platos', category: 'Bazar', cost: 6400, price: 10500, stock: 41, min: 15 },
  { sku: 'CON-0233', name: 'Servilletas x100', category: 'Consumo', cost: 890, price: 1450, stock: 96, min: 80 },
  { sku: 'LIM-0461', name: 'Limpiador multiuso 900 ml', category: 'Limpieza', cost: 1310, price: 2190, stock: 12, min: 50 },
  { sku: 'BAZ-0602', name: 'Balde plástico 10 L', category: 'Bazar', cost: 2750, price: 4600, stock: 37, min: 20 },
  { sku: 'MER-0711', name: 'Pilas AA x4', category: 'Mercadería', cost: 2300, price: 3900, stock: 0, min: 40 },
  { sku: 'CON-0390', name: 'Rollo de cocina x3', category: 'Consumo', cost: 1760, price: 2850, stock: 75, min: 90 },
  { sku: 'MER-0745', name: 'Cinta adhesiva x3', category: 'Mercadería', cost: 980, price: 1690, stock: 128, min: 40 },
  { sku: 'BAZ-0688', name: 'Tabla de picar', category: 'Bazar', cost: 3100, price: 5200, stock: 9, min: 12 },
];

export const statusOf = (p: { stock: number; min: number }): StockStatus => {
  if (p.stock <= 0) return 'agotado';
  if (p.stock <= p.min * 0.5) return 'critico';
  if (p.stock < p.min) return 'bajo';
  return 'ok';
};

export const STATUS_META: Record<StockStatus, { label: string; tone: Tone }> = {
  ok: { label: 'Disponible', tone: 'ok' },
  bajo: { label: 'Stock bajo', tone: 'warn' },
  critico: { label: 'Crítico', tone: 'crit' },
  agotado: { label: 'Agotado', tone: 'crit' },
};

export type Tone = 'ok' | 'warn' | 'crit' | 'info' | 'accent' | 'neutral';

export interface DemoStand {
  id: string;
  name: string;
  units: number;
  products: number;
  critical: { name: string; stock: number; min: number }[];
  pending: { code: string; items: number; status: string }[];
  recent: { type: 'Recepción' | 'Devolución' | 'Ajuste' | 'Transferencia'; detail: string; when: string }[];
}

export const DEMO_STANDS: DemoStand[] = [
  {
    id: 'p01',
    name: 'Puesto 01',
    units: 6840,
    products: 412,
    critical: [
      { name: 'Esponja doble faz x3', stock: 4, min: 20 },
      { name: 'Limpiador multiuso 900 ml', stock: 3, min: 15 },
    ],
    pending: [{ code: 'TR-0148', items: 18, status: 'En tránsito' }],
    recent: [
      { type: 'Recepción', detail: 'TR-0145 · 24 ítems confirmados', when: 'Hoy 09:42' },
      { type: 'Ajuste', detail: 'Set de vasos x6 · −1 (rotura)', when: 'Ayer 18:10' },
      { type: 'Devolución', detail: 'Balde 10 L · 2 u. a Central', when: 'Ayer 11:25' },
    ],
  },
  {
    id: 'p02',
    name: 'Puesto 02',
    units: 4215,
    products: 305,
    critical: [{ name: 'Recipiente hermético 1,5 L', stock: 0, min: 10 }],
    pending: [
      { code: 'TR-0149', items: 32, status: 'En preparación' },
      { code: 'TR-0151', items: 9, status: 'Pendiente' },
    ],
    recent: [
      { type: 'Recepción', detail: 'TR-0142 · 41 ítems confirmados', when: 'Hoy 08:15' },
      { type: 'Transferencia', detail: 'Solicitud de reposición enviada', when: 'Hoy 08:02' },
      { type: 'Ajuste', detail: 'Servilletas x100 · +6 (recuento)', when: 'Lun 17:40' },
    ],
  },
  {
    id: 'p03',
    name: 'Puesto 03',
    units: 5390,
    products: 368,
    critical: [
      { name: 'Pilas AA x4', stock: 0, min: 12 },
      { name: 'Rollo de cocina x3', stock: 5, min: 18 },
      { name: 'Tabla de picar', stock: 1, min: 4 },
    ],
    pending: [],
    recent: [
      { type: 'Recepción', detail: 'TR-0139 · recibida con observación', when: 'Ayer 16:55' },
      { type: 'Devolución', detail: 'Detergente 750 ml · 3 u. a Central', when: 'Ayer 10:12' },
      { type: 'Ajuste', detail: 'Lavandina 2 L · −2 (vencimiento)', when: 'Lun 12:30' },
    ],
  },
];

/** Movimientos diarios ficticios (unidades) para los gráficos de la maqueta. */
export const DEMO_MOVEMENTS = [
  { d: 'L', in: 820, out: 640, tr: 310 },
  { d: 'M', in: 410, out: 720, tr: 280 },
  { d: 'X', in: 960, out: 690, tr: 420 },
  { d: 'J', in: 380, out: 810, tr: 350 },
  { d: 'V', in: 1120, out: 930, tr: 510 },
  { d: 'S', in: 520, out: 1180, tr: 260 },
  { d: 'D', in: 140, out: 760, tr: 90 },
  { d: 'L', in: 880, out: 700, tr: 380 },
  { d: 'M', in: 450, out: 760, tr: 300 },
  { d: 'X', in: 1010, out: 740, tr: 460 },
  { d: 'J', in: 420, out: 860, tr: 330 },
  { d: 'V', in: 1180, out: 980, tr: 540 },
  { d: 'S', in: 560, out: 1240, tr: 280 },
  { d: 'D', in: 160, out: 790, tr: 110 },
];
