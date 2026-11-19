import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, ArrowDownLeft, ArrowRightLeft, ArrowUpRight, Boxes, Package } from 'lucide-react';
import { Chip, Screen, cx } from '@/components/ui';
import { ChartLegend, MovementsChart } from '@/components/Charts';
import { DEMO_MOVEMENTS } from '@/data/proposal';
import { n0 } from '@/lib/format';

const LOCS = ['Todas', 'Central', 'Puesto 01', 'Puesto 02', 'Puesto 03'] as const;
type Loc = (typeof LOCS)[number];
const FACTOR: Record<Loc, number> = { Todas: 1, Central: 0.66, 'Puesto 01': 0.14, 'Puesto 02': 0.09, 'Puesto 03': 0.11 };

const RECENT = [
  { t: 'Entrada', d: 'Compra OC-0311 · 120 u.', l: 'Central', h: '10:24', icon: ArrowDownLeft, tone: 'accent' as const },
  { t: 'Transferencia', d: 'TR-0148 · 18 ítems', l: 'Central → Puesto 01', h: '09:58', icon: ArrowRightLeft, tone: 'warn' as const },
  { t: 'Recepción', d: 'TR-0145 confirmada', l: 'Puesto 01', h: '09:42', icon: ArrowDownLeft, tone: 'ok' as const },
  { t: 'Salida', d: 'Ajuste por rotura · 2 u.', l: 'Puesto 02', h: '09:15', icon: ArrowUpRight, tone: 'info' as const },
];

export function DashboardDemo() {
  const [range, setRange] = useState<7 | 14>(14);
  const [loc, setLoc] = useState<Loc>('Todas');
  const f = FACTOR[loc];

  const data = useMemo(
    () =>
      DEMO_MOVEMENTS.slice(-range).map((p) => ({
        ...p,
        in: Math.round(p.in * (loc === 'Todas' || loc === 'Central' ? f : f * 0.4)),
        out: Math.round(p.out * f),
        tr: Math.round(p.tr * (loc === 'Central' ? 1 : f * 2.2)),
      })),
    [range, loc, f],
  );

  const kpis = [
    { k: 'Unidades en stock', v: n0(48920 * f), icon: Package },
    { k: 'Productos con stock', v: n0(2418 * Math.min(1, f * 1.6)), icon: Boxes },
    { k: 'Productos críticos', v: n0(Math.max(2, 37 * f)), icon: AlertTriangle, tone: 'warn' },
    { k: 'Transferencias activas', v: loc === 'Todas' || loc === 'Central' ? '4' : '1', icon: ArrowRightLeft },
  ];

  return (
    <Screen title="dashboard">
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div role="tablist" aria-label="Ubicación" className="no-scrollbar -mx-1 flex max-w-full gap-1 overflow-x-auto px-1">
            {LOCS.map((l) => (
              <button
                key={l}
                role="tab"
                aria-selected={loc === l}
                onClick={() => setLoc(l)}
                className={cx(
                  'shrink-0 rounded-lg px-2.5 py-1.5 text-xs transition-colors',
                  loc === l ? 'bg-surface-3 text-ink ring-1 ring-line-2' : 'text-dim hover:text-mute',
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex rounded-lg bg-bg-2 p-0.5 ring-1 ring-line" role="group" aria-label="Período">
            {([7, 14] as const).map((r) => (
              <button
                key={r}
                aria-pressed={range === r}
                onClick={() => setRange(r)}
                className={cx('rounded-md px-2.5 py-1 font-mono text-[0.7rem]', range === r ? 'bg-surface-3 text-ink' : 'text-dim')}
              >
                {r}d
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {kpis.map(({ k, v, icon: I, tone }) => (
            <div key={k} className="rounded-xl bg-bg-2/60 p-3.5 ring-1 ring-line">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[0.72rem] leading-tight text-dim">{k}</span>
                <I className={cx('size-3.5 shrink-0', tone === 'warn' ? 'text-warn' : 'text-dim')} strokeWidth={1.8} />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={v}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="num mt-2 text-xl font-semibold tracking-tight text-ink"
                >
                  {v}
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl bg-bg-2/60 p-4 ring-1 ring-line">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-medium text-mute">Evolución de movimientos · {loc}</span>
            <ChartLegend
              items={[
                { color: 'var(--color-accent)', label: 'Entradas' },
                { color: 'var(--color-info)', label: 'Salidas' },
                { color: 'var(--color-warn)', label: 'Transferencias' },
              ]}
            />
          </div>
          <MovementsChart key={`${range}-${loc}`} data={data} height={170} />
        </div>

        <div className="mt-3 rounded-xl bg-bg-2/60 ring-1 ring-line">
          <div className="flex items-center justify-between px-4 pt-3.5 pb-2 text-xs font-medium text-mute">
            Movimientos recientes <span className="font-mono text-[0.68rem] text-dim">hoy</span>
          </div>
          <ul className="divide-y divide-line">
            {RECENT.map(({ t, d, l, h, icon: I, tone }) => (
              <li key={d} className="flex items-center gap-3 px-4 py-2.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-surface-3">
                  <I className="size-3.5 text-mute" strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.8rem] text-ink">{d}</span>
                  <span className="block truncate text-[0.7rem] text-dim">{l}</span>
                </span>
                <Chip tone={tone} desktopOnly>
                  {t}
                </Chip>
                <span className="num font-mono text-[0.7rem] text-dim">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Screen>
  );
}
