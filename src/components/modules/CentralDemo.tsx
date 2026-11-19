import { useState } from 'react';
import { ArrowDownLeft, ArrowRightLeft, ArrowUpRight, SlidersHorizontal, Store, Warehouse } from 'lucide-react';
import { Chip, Screen, cx } from '@/components/ui';
import type { Tone } from '@/data/proposal';

type Kind = 'Entrada' | 'Salida' | 'Ajuste' | 'Transferencia';
const KIND_META: Record<Kind, { icon: typeof ArrowDownLeft; tone: Tone }> = {
  Entrada: { icon: ArrowDownLeft, tone: 'accent' },
  Salida: { icon: ArrowUpRight, tone: 'info' },
  Ajuste: { icon: SlidersHorizontal, tone: 'neutral' },
  Transferencia: { icon: ArrowRightLeft, tone: 'warn' },
};

const LEDGER: { k: Kind; d: string; q: string; u: string; h: string }[] = [
  { k: 'Entrada', d: 'Recepción OC-0311 · Proveedor A', q: '+120', u: 'Encargado Central', h: '10:24' },
  { k: 'Transferencia', d: 'TR-0148 → Puesto 01', q: '−18', u: 'Encargado Central', h: '09:58' },
  { k: 'Ajuste', d: 'Recuento · Servilletas x100', q: '+6', u: 'Administrador', h: '09:30' },
  { k: 'Salida', d: 'Devolución a proveedor', q: '−12', u: 'Encargado Central', h: 'Ayer' },
  { k: 'Entrada', d: 'Devolución desde Puesto 03', q: '+3', u: 'Resp. Puesto 03', h: 'Ayer' },
  { k: 'Transferencia', d: 'TR-0147 → Puesto 02', q: '−32', u: 'Encargado Central', h: 'Ayer' },
];

const FILTERS = ['Todos', 'Entrada', 'Salida', 'Ajuste', 'Transferencia'] as const;

export function CentralDemo() {
  const [f, setF] = useState<(typeof FILTERS)[number]>('Todos');
  const rows = LEDGER.filter((r) => f === 'Todos' || r.k === f);

  return (
    <Screen title="central">
      <div className="p-4 sm:p-5">
        {/* Diagrama de distribución */}
        <div className="relative rounded-xl bg-bg-2/60 p-5 ring-1 ring-line">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
            <div className="flex flex-col items-center gap-2">
              <span className="relative grid size-16 place-items-center rounded-2xl bg-accent/10 ring-1 ring-accent/40 sm:size-20">
                <Warehouse className="size-7 text-accent" strokeWidth={1.5} aria-hidden />
                <span aria-hidden className="pulse-soft absolute -inset-1.5 rounded-[1.2rem] ring-1 ring-accent/20" />
              </span>
              <span className="text-xs font-medium text-ink">Central</span>
              <span className="num font-mono text-[0.65rem] text-dim">32.475 u.</span>
            </div>
            <svg viewBox="0 0 200 120" className="h-28 w-full" preserveAspectRatio="none" aria-hidden>
              {[20, 60, 100].map((y) => (
                <g key={y}>
                  <path d={`M0,60 C90,60 110,${y} 200,${y}`} fill="none" stroke="var(--color-line-2)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  <path
                    d={`M0,60 C90,60 110,${y} 200,${y}`}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    className="flow-dash"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}
            </svg>
            <ul className="grid gap-2.5">
              {['Puesto 01', 'Puesto 02', 'Puesto 03'].map((p) => (
                <li key={p} className="flex items-center gap-2 rounded-lg bg-surface-2 px-2.5 py-1.5 ring-1 ring-line">
                  <Store className="size-3.5 text-mute" strokeWidth={1.7} aria-hidden />
                  <span className="text-[0.75rem] text-mute">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-center text-[0.72rem] text-dim">La central como origen de la distribución hacia cada puesto</p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            ['Entradas hoy', '+123', 'text-accent'],
            ['Salidas hoy', '−12', 'text-info'],
            ['Ajustes', '1', 'text-mute'],
            ['Transferencias', '2', 'text-warn'],
          ].map(([k, v, c]) => (
            <div key={k} className="rounded-xl bg-bg-2/60 p-3 ring-1 ring-line">
              <div className="text-[0.7rem] text-dim">{k}</div>
              <div className={cx('num mt-1 text-lg font-semibold', c)}>{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl bg-bg-2/60 ring-1 ring-line">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-3.5 pb-2">
            <span className="text-xs font-medium text-mute">Registro de movimientos</span>
            <div className="no-scrollbar flex gap-1 overflow-x-auto" role="group" aria-label="Tipo de movimiento">
              {FILTERS.map((x) => (
                <button
                  key={x}
                  aria-pressed={f === x}
                  onClick={() => setF(x)}
                  className={cx('shrink-0 rounded-md px-2 py-1 text-[0.7rem]', f === x ? 'bg-surface-3 text-ink' : 'text-dim hover:text-mute')}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <ul className="divide-y divide-line">
            {rows.map((r) => {
              const M = KIND_META[r.k];
              return (
                <li key={r.d} className="flex items-center gap-3 px-4 py-2.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-surface-3">
                    <M.icon className="size-3.5 text-mute" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.8rem] text-ink">{r.d}</span>
                    <span className="block truncate text-[0.7rem] text-dim">{r.u}</span>
                  </span>
                  <Chip tone={M.tone} desktopOnly>
                    {r.k}
                  </Chip>
                  <span className="num w-10 text-right font-mono text-[0.75rem] text-ink">{r.q}</span>
                  <span className="hidden w-10 text-right font-mono text-[0.68rem] text-dim sm:inline">{r.h}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Screen>
  );
}
