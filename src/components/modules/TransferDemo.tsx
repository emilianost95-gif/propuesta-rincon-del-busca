import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Check, PackageCheck, Pause, Play, RotateCcw, Store, Truck, Warehouse } from 'lucide-react';
import { Chip, Screen, cx } from '@/components/ui';

const STEPS = [
  { icon: Warehouse, t: 'Central', s: 'En preparación', d: 'Se arma el pedido y se registran productos y cantidades.' },
  { icon: Truck, t: 'En tránsito', s: 'En tránsito', d: 'La mercadería salió de la central: el stock queda “en camino”.' },
  { icon: Store, t: 'Puesto 02', s: 'Llegada', d: 'El responsable del puesto controla lo recibido.' },
  { icon: PackageCheck, t: 'Recepción confirmada', s: 'Recibida', d: 'Se confirma y el stock se suma al puesto, con fecha y usuario.' },
];

const STATES = [
  { l: 'Pendiente', tone: 'neutral' as const },
  { l: 'En preparación', tone: 'info' as const },
  { l: 'En tránsito', tone: 'warn' as const },
  { l: 'Recibida', tone: 'ok' as const },
  { l: 'Observada', tone: 'crit' as const },
];

const ITEMS = [
  ['Detergente concentrado 750 ml', 12],
  ['Esponja doble faz x3', 24],
  ['Set de vasos de vidrio x6', 6],
  ['Rollo de cocina x3', 18],
] as const;

export function TransferDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || !inView || reduce) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % (STEPS.length + 1)), 1900);
    return () => window.clearInterval(t);
  }, [playing, inView, reduce]);

  const current = Math.min(step, STEPS.length - 1);
  const done = step >= STEPS.length;
  const progress = done ? 1 : step / (STEPS.length - 1);

  return (
    <Screen
      title="transferencias / TR-0149"
      actions={
        <div className="no-print flex gap-1">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pausar animación' : 'Reproducir animación'}
            className="grid size-6 place-items-center rounded-md bg-surface-3 text-mute ring-1 ring-line-2 hover:text-ink"
          >
            {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
          </button>
          <button
            onClick={() => {
              setStep(0);
              setPlaying(true);
            }}
            aria-label="Reiniciar"
            className="grid size-6 place-items-center rounded-md bg-surface-3 text-mute ring-1 ring-line-2 hover:text-ink"
          >
            <RotateCcw className="size-3" />
          </button>
        </div>
      }
    >
      <div ref={ref} className="p-4 sm:p-5">
        <div className="rounded-xl bg-bg-2/60 p-5 ring-1 ring-line">
          <ol className="relative grid grid-cols-4 gap-2">
            <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-6 h-0.5 rounded-full bg-surface-3">
              <motion.div
                data-anim
                className="h-full origin-left rounded-full bg-accent"
                animate={{ scaleX: progress }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute -top-[5px] grid size-3 -translate-x-1/2 place-items-center rounded-full bg-accent shadow-[0_0_0_4px_rgb(181_242_91/0.18)]"
                animate={{ left: `${progress * 100}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            {STEPS.map(({ icon: I, t }, i) => {
              const reached = i <= current || done;
              const isNow = i === current && !done;
              return (
                <li key={t} className="relative flex flex-col items-center text-center">
                  <button
                    onClick={() => {
                      setPlaying(false);
                      setStep(i === STEPS.length - 1 ? STEPS.length : i);
                    }}
                    aria-label={`Ver etapa: ${t}`}
                    className={cx(
                      'relative z-10 grid size-12 place-items-center rounded-2xl ring-1 transition-colors duration-300',
                      reached ? 'bg-accent/12 ring-accent/50' : 'bg-surface-2 ring-line-2',
                    )}
                  >
                    {reached && !isNow && i < current ? (
                      <Check className="size-5 text-accent" strokeWidth={2.2} aria-hidden />
                    ) : (
                      <I className={cx('size-5', reached ? 'text-accent' : 'text-dim')} strokeWidth={1.6} aria-hidden />
                    )}
                    {isNow && <span aria-hidden className="pulse-soft absolute -inset-1 rounded-[1.1rem] ring-1 ring-accent/40" />}
                  </button>
                  <span className={cx('mt-3 text-[0.72rem] font-medium leading-tight sm:text-xs', reached ? 'text-ink' : 'text-dim')}>{t}</span>
                </li>
              );
            })}
          </ol>
          <p className="mt-5 min-h-10 text-center text-sm text-mute" aria-live="polite">
            {done ? 'Recepción confirmada por el responsable del Puesto 02. El movimiento queda en el historial.' : STEPS[current]!.d}
          </p>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-5">
          <div className="rounded-xl bg-bg-2/60 p-4 ring-1 ring-line md:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-mute">Detalle de la transferencia</span>
              <Chip tone={done ? 'ok' : current === 0 ? 'info' : 'warn'} dot>
                {done ? 'Recibida' : STEPS[current]!.s}
              </Chip>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.78rem]">
              {[
                ['Origen', 'Central'],
                ['Destino', 'Puesto 02'],
                ['Fecha', '19/11 · 08:40'],
                ['Responsable', 'Encargado Central'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.68rem] text-dim">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-4 divide-y divide-line border-t border-line">
              {ITEMS.map(([n, q]) => (
                <li key={n} className="flex items-center justify-between py-2 text-[0.78rem]">
                  <span className="text-mute">{n}</span>
                  <span className="num font-mono text-ink">{q} u.</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-bg-2/60 p-4 ring-1 ring-line md:col-span-2">
            <span className="text-xs font-medium text-mute">Estados posibles</span>
            <ul className="mt-3 grid gap-2">
              {STATES.map((s) => (
                <li key={s.l} className="flex items-center justify-between">
                  <Chip tone={s.tone} dot>
                    {s.l}
                  </Chip>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.72rem] leading-relaxed text-dim">
              “Observada” se usa cuando lo recibido no coincide con lo enviado: la diferencia queda registrada para revisar.
            </p>
          </div>
        </div>
      </div>
    </Screen>
  );
}
