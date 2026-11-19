import { useState } from 'react';
import { ArrowRightLeft, Boxes, Coins, Download, FileClock, MapPin, PackageX, TrendingUp } from 'lucide-react';
import { Screen, cx } from '@/components/ui';
import { HBars, MovementsChart } from '@/components/Charts';
import { DEMO_MOVEMENTS } from '@/data/proposal';
import { ars } from '@/lib/format';

const REPORTS = [
  { id: 'ubic', icon: MapPin, t: 'Stock por ubicación' },
  { id: 'mov', icon: TrendingUp, t: 'Entradas y salidas' },
  { id: 'val', icon: Coins, t: 'Valorización del inventario' },
  { id: 'crit', icon: PackageX, t: 'Stock crítico' },
  { id: 'tr', icon: ArrowRightLeft, t: 'Transferencias' },
  { id: 'hist', icon: FileClock, t: 'Historial' },
] as const;

type Id = (typeof REPORTS)[number]['id'];

export function ReportsDemo() {
  const [r, setR] = useState<Id>('ubic');
  const [exported, setExported] = useState(false);

  return (
    <Screen title="reportes">
      <div className="grid gap-3 p-4 sm:p-5 md:grid-cols-[13rem_1fr]">
        <ul className="no-scrollbar flex gap-1 overflow-x-auto md:flex-col md:overflow-visible" role="tablist" aria-label="Reportes">
          {REPORTS.map(({ id, icon: I, t }) => (
            <li key={id} className="shrink-0">
              <button
                role="tab"
                aria-selected={r === id}
                onClick={() => {
                  setR(id);
                  setExported(false);
                }}
                className={cx(
                  'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[0.8rem] transition-colors',
                  r === id ? 'bg-surface-3 text-ink ring-1 ring-line-2' : 'text-dim hover:text-mute',
                )}
              >
                <I className={cx('size-4 shrink-0', r === id && 'text-accent')} strokeWidth={1.7} aria-hidden />
                {t}
              </button>
            </li>
          ))}
        </ul>

        <div className="min-w-0 rounded-xl bg-bg-2/60 p-4 ring-1 ring-line" role="tabpanel">
          <div className="mb-4 flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-ink">{REPORTS.find((x) => x.id === r)!.t}</span>
            <button
              onClick={() => setExported(true)}
              className="inline-flex items-center gap-1.5 rounded-md bg-surface-3 px-2.5 py-1 text-[0.72rem] text-mute ring-1 ring-line-2 hover:text-ink"
            >
              <Download className="size-3.5" aria-hidden /> {exported ? 'Listo (demo)' : 'Exportar a Excel'}
            </button>
          </div>
          {r === 'ubic' && (
            <HBars
              rows={[
                { label: 'Central', value: 32475 },
                { label: 'Puesto 01', value: 6840, tone: 'var(--color-info)' },
                { label: 'Puesto 02', value: 4215, tone: 'var(--color-info)' },
                { label: 'Puesto 03', value: 5390, tone: 'var(--color-info)' },
              ]}
            />
          )}
          {r === 'mov' && <MovementsChart data={DEMO_MOVEMENTS} height={190} series={['in', 'out']} />}
          {r === 'val' && (
            <div>
              <div className="text-xs text-dim">Valor del inventario a costo registrado</div>
              <div className="num mt-1 text-3xl font-semibold tracking-tight text-ink">{ars(87_430_000)}</div>
              <div className="mt-5">
                <HBars
                  unit=""
                  rows={[
                    { label: 'Limpieza', value: 31_200_000 },
                    { label: 'Bazar', value: 27_850_000 },
                    { label: 'Consumo', value: 18_940_000 },
                    { label: 'Mercadería', value: 9_440_000 },
                  ].map((x) => ({ ...x, label: `${x.label} · ${ars(x.value)}` }))}
                />
              </div>
            </div>
          )}
          {r === 'crit' && (
            <HBars
              rows={[
                { label: 'Agotados', value: 2, tone: 'var(--color-crit)' },
                { label: 'Críticos (≤ 50 % del mínimo)', value: 3, tone: 'var(--color-crit)' },
                { label: 'Bajo el mínimo', value: 4, tone: 'var(--color-warn)' },
              ]}
              unit="productos"
            />
          )}
          {r === 'tr' && (
            <HBars
              rows={[
                { label: 'Recibidas', value: 41, tone: 'var(--color-ok)' },
                { label: 'En tránsito', value: 3, tone: 'var(--color-warn)' },
                { label: 'En preparación', value: 2, tone: 'var(--color-info)' },
                { label: 'Observadas', value: 1, tone: 'var(--color-crit)' },
              ]}
              unit="transf."
            />
          )}
          {r === 'hist' && (
            <ul className="divide-y divide-line text-[0.78rem]">
              {[
                ['19/11 10:24', 'Entrada OC-0311 · +120 u.', 'Encargado Central'],
                ['19/11 09:58', 'Transferencia TR-0148 · 18 ítems', 'Encargado Central'],
                ['19/11 09:42', 'Recepción TR-0145 confirmada', 'Resp. Puesto 01'],
                ['18/11 18:10', 'Ajuste · Set de vasos x6 · −1', 'Resp. Puesto 01'],
                ['18/11 16:55', 'Recepción TR-0139 observada', 'Resp. Puesto 03'],
              ].map(([h, d, u]) => (
                <li key={`${h}${d}`} className="grid grid-cols-[6.5rem_1fr] gap-3 py-2">
                  <span className="font-mono text-[0.7rem] text-dim">{h}</span>
                  <span>
                    <span className="block text-ink">{d}</span>
                    <span className="block text-[0.7rem] text-dim">{u}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 flex items-center gap-1.5 text-[0.7rem] text-dim">
            <Boxes className="size-3" aria-hidden /> Valores ficticios de demostración.
          </p>
        </div>
      </div>
    </Screen>
  );
}
