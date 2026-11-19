import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertOctagon, AlertTriangle, Info, PackageX } from 'lucide-react';
import { Chip, Screen, cx } from '@/components/ui';
import type { Tone } from '@/data/proposal';

type Level = 'Crítica' | 'Alta' | 'Media' | 'Informativa';
const LEVEL: Record<Level, { tone: Tone; icon: typeof Info; bar: string }> = {
  Crítica: { tone: 'crit', icon: PackageX, bar: 'bg-crit' },
  Alta: { tone: 'warn', icon: AlertOctagon, bar: 'bg-warn' },
  Media: { tone: 'info', icon: AlertTriangle, bar: 'bg-info' },
  Informativa: { tone: 'neutral', icon: Info, bar: 'bg-line-2' },
};

const ALERTS: { lv: Level; t: string; d: string; loc: string }[] = [
  { lv: 'Crítica', t: 'Pilas AA x4 — agotado', d: 'Sin stock en el puesto. Disponible en Central: 0 u.', loc: 'Puesto 03' },
  { lv: 'Crítica', t: 'Recipiente hermético 1,5 L — agotado', d: 'Sin stock en central ni en puestos.', loc: 'Central' },
  { lv: 'Alta', t: 'Limpiador multiuso 900 ml', d: '12 u. de un mínimo de 50.', loc: 'Central' },
  { lv: 'Alta', t: 'Esponja doble faz x3', d: '4 u. de un mínimo de 20.', loc: 'Puesto 01' },
  { lv: 'Media', t: 'Rollo de cocina x3', d: '75 u. de un mínimo de 90.', loc: 'Central' },
  { lv: 'Media', t: 'Tabla de picar', d: '1 u. de un mínimo de 4.', loc: 'Puesto 03' },
  { lv: 'Informativa', t: 'TR-0148 lleva 2 h en tránsito', d: 'Pendiente de confirmación de recepción.', loc: 'Puesto 01' },
];

const LOCS = ['Todas', 'Central', 'Puesto 01', 'Puesto 02', 'Puesto 03'] as const;

export function AlertsDemo() {
  const [loc, setLoc] = useState<(typeof LOCS)[number]>('Todas');
  const list = ALERTS.filter((a) => loc === 'Todas' || a.loc === loc);
  const count = (lv: Level) => list.filter((a) => a.lv === lv).length;

  return (
    <Screen title="alertas">
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {(Object.keys(LEVEL) as Level[]).map((lv) => (
            <div key={lv} className="relative overflow-hidden rounded-xl bg-bg-2/60 p-3 ring-1 ring-line">
              <span aria-hidden className={cx('absolute inset-y-0 left-0 w-0.5', LEVEL[lv].bar)} />
              <div className="text-[0.7rem] text-dim">{lv}</div>
              <div className="num mt-1 text-xl font-semibold text-ink">{count(lv)}</div>
            </div>
          ))}
        </div>

        <div className="no-scrollbar mt-3 flex gap-1 overflow-x-auto" role="group" aria-label="Filtrar por ubicación">
          {LOCS.map((l) => (
            <button
              key={l}
              aria-pressed={loc === l}
              onClick={() => setLoc(l)}
              className={cx(
                'shrink-0 rounded-full px-3 py-1 text-xs ring-1 transition-colors',
                loc === l ? 'bg-accent/12 text-accent ring-accent/30' : 'text-dim ring-line hover:text-mute',
              )}
            >
              {l}
            </button>
          ))}
        </div>

        <ul className="mt-3 grid gap-2">
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((a) => {
              const L = LEVEL[a.lv];
              return (
                <motion.li
                  key={a.t}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.22 }}
                  className="flex items-start gap-3 rounded-xl bg-bg-2/60 p-3.5 ring-1 ring-line"
                >
                  <span
                    className={cx(
                      'grid size-8 shrink-0 place-items-center rounded-lg',
                      L.tone === 'crit' ? 'bg-crit/10' : L.tone === 'warn' ? 'bg-warn/10' : L.tone === 'info' ? 'bg-info/10' : 'bg-surface-3',
                    )}
                  >
                    <L.icon
                      className={cx('size-4', L.tone === 'crit' ? 'text-crit' : L.tone === 'warn' ? 'text-warn' : L.tone === 'info' ? 'text-info' : 'text-dim')}
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.82rem] font-medium text-ink">{a.t}</span>
                    <span className="block text-[0.74rem] text-dim">{a.d}</span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1.5">
                    <Chip tone={L.tone}>{a.lv}</Chip>
                    <span className="font-mono text-[0.66rem] text-dim">{a.loc}</span>
                  </span>
                </motion.li>
              );
            })}
          </AnimatePresence>
          {list.length === 0 && <li className="rounded-xl p-6 text-center text-sm text-dim ring-1 ring-line">Sin alertas para esta ubicación.</li>}
        </ul>
      </div>
    </Screen>
  );
}
