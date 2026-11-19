import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, ArrowRightLeft, Clock, Store } from 'lucide-react';
import { Chip, Screen, cx } from '@/components/ui';
import { DEMO_STANDS } from '@/data/proposal';
import { n0 } from '@/lib/format';

export function StandsDemo() {
  const [id, setId] = useState(DEMO_STANDS[0]!.id);
  const s = DEMO_STANDS.find((x) => x.id === id) ?? DEMO_STANDS[0]!;

  return (
    <Screen title="puestos">
      <div className="p-4 sm:p-5">
        <div role="tablist" aria-label="Seleccionar puesto" className="grid grid-cols-3 gap-2">
          {DEMO_STANDS.map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={x.id === id}
              aria-controls="stand-panel"
              onClick={() => setId(x.id)}
              className={cx(
                'relative rounded-xl p-3 text-left ring-1 transition-colors',
                x.id === id ? 'bg-surface-3 ring-accent/40' : 'bg-bg-2/60 ring-line hover:ring-line-2',
              )}
            >
              <span className="flex items-center justify-between">
                <Store className={cx('size-4', x.id === id ? 'text-accent' : 'text-dim')} strokeWidth={1.7} aria-hidden />
                {x.critical.length > 0 && (
                  <span className="num rounded-full bg-crit/15 px-1.5 font-mono text-[0.62rem] text-crit">{x.critical.length}</span>
                )}
              </span>
              <span className="mt-3 block text-sm font-medium text-ink">{x.name}</span>
              <span className="num block font-mono text-[0.68rem] text-dim">{n0(x.units)} u.</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            id="stand-panel"
            role="tabpanel"
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-3 grid gap-3 md:grid-cols-2"
          >
            <div className="rounded-xl bg-bg-2/60 p-4 ring-1 ring-line md:col-span-2">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-xs text-dim">Stock del {s.name}</div>
                  <div className="num mt-1 text-3xl font-semibold tracking-tight text-ink">
                    {n0(s.units)} <span className="text-base font-normal text-dim">unidades</span>
                  </div>
                </div>
                <div className="flex gap-6 text-right">
                  <div>
                    <div className="text-[0.7rem] text-dim">Productos</div>
                    <div className="num text-lg font-semibold text-ink">{n0(s.products)}</div>
                  </div>
                  <div>
                    <div className="text-[0.7rem] text-dim">Críticos</div>
                    <div className={cx('num text-lg font-semibold', s.critical.length ? 'text-crit' : 'text-ok')}>{s.critical.length}</div>
                  </div>
                  <div>
                    <div className="text-[0.7rem] text-dim">Pendientes</div>
                    <div className="num text-lg font-semibold text-ink">{s.pending.length}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-bg-2/60 p-4 ring-1 ring-line">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-mute">
                <AlertTriangle className="size-3.5 text-warn" aria-hidden /> Productos críticos
              </div>
              <ul className="grid grid-cols-1 gap-2.5">
                {s.critical.map((c) => (
                  <li key={c.name}>
                    <div className="flex items-center justify-between gap-2 text-[0.78rem]">
                      <span className="truncate text-ink">{c.name}</span>
                      <span className="num shrink-0 font-mono text-[0.7rem] text-dim">
                        <span className={c.stock === 0 ? 'text-crit' : 'text-warn'}>{c.stock}</span> / {c.min}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-3">
                      <div className={cx('h-full rounded-full', c.stock === 0 ? 'bg-crit' : 'bg-warn')} style={{ width: `${Math.max(3, (c.stock / c.min) * 100)}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-bg-2/60 p-4 ring-1 ring-line">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-mute">
                <ArrowRightLeft className="size-3.5 text-info" aria-hidden /> Transferencias pendientes
              </div>
              {s.pending.length === 0 ? (
                <p className="text-[0.78rem] text-dim">Sin transferencias pendientes.</p>
              ) : (
                <ul className="grid grid-cols-1 gap-2">
                  {s.pending.map((p) => (
                    <li key={p.code} className="flex items-center justify-between gap-2 rounded-lg bg-surface-2 px-3 py-2 ring-1 ring-line">
                      <span className="text-[0.78rem] text-ink">
                        <span className="font-mono text-dim">{p.code}</span> · {p.items} ítems
                      </span>
                      <Chip tone={p.status === 'En tránsito' ? 'warn' : p.status === 'Pendiente' ? 'neutral' : 'info'}>{p.status}</Chip>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-xl bg-bg-2/60 p-4 ring-1 ring-line md:col-span-2">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-mute">
                <Clock className="size-3.5 text-dim" aria-hidden /> Últimos movimientos
              </div>
              <ol className="relative grid gap-3 border-l border-line-2 pl-4">
                {s.recent.map((r) => (
                  <li key={r.detail} className="relative">
                    <span aria-hidden className="absolute -left-[1.3rem] top-1.5 size-2 rounded-full bg-accent ring-4 ring-surface" />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <span className="text-[0.8rem] text-ink">
                        <span className="text-mute">{r.type}</span> · {r.detail}
                      </span>
                      <span className="font-mono text-[0.68rem] text-dim">{r.when}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Screen>
  );
}
