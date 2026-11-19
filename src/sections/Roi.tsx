import { useId, useMemo, useState } from 'react';
import { AlertTriangle, Clock, PackageMinus, RotateCcw, Scale, TrendingUp } from 'lucide-react';
import { Reveal, Section, SectionHeader, cx } from '@/components/ui';
import { PROPOSAL } from '@/data/proposal';
import { ars, n0, n1 } from '@/lib/format';

const IMPACT = [
  'Reducción de diferencias de inventario',
  'Menos tiempo dedicado a tareas manuales',
  'Mejor planificación de compras',
  'Menor riesgo de faltantes',
  'Mayor control de movimientos',
  'Mejor información para decidir',
  'Reducción de errores administrativos',
];

const EXAMPLE = { hours: 40, rate: 6000, losses: 300_000, pct: 30, maint: false };

export function Roi() {
  const [v, setV] = useState(EXAMPLE);
  const set = <K extends keyof typeof v>(k: K, val: (typeof v)[K]) => setV((s) => ({ ...s, [k]: val }));

  const r = useMemo(() => {
    const timeValue = v.hours * v.rate;
    const timeSaving = timeValue * (v.pct / 100);
    const lossSaving = v.losses * (v.pct / 100);
    const gross = timeSaving + lossSaving;
    const net = gross - (v.maint ? PROPOSAL.maintenance : 0);
    const payback = net > 0 ? PROPOSAL.development / net : null;
    return { timeValue, timeSaving, lossSaving, gross, net, payback };
  }, [v]);

  return (
    <Section id="retorno" label="Retorno de la inversión" className="border-t border-line">
      <div className="shell">
        <SectionHeader
          index="07"
          eyebrow="Retorno de la inversión"
          title="Una inversión en control, organización y eficiencia."
          lead="El valor de un sistema de gestión no se mide solamente por su costo de desarrollo, sino por el impacto que puede tener sobre la operación diaria."
        />

        <Reveal className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {IMPACT.map((x) => (
              <li key={x} className="rounded-full bg-surface px-3.5 py-1.5 text-sm text-mute ring-1 ring-line">
                {x}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="panel avoid-break mt-12 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4 sm:px-8">
            <div>
              <p className="text-base font-semibold text-ink">Simulador de retorno</p>
              <p className="text-sm text-dim">Valores de ejemplo, hipotéticos y editables. Reemplazalos por estimaciones propias.</p>
            </div>
            <button
              type="button"
              onClick={() => setV(EXAMPLE)}
              className="no-print inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3.5 py-1.5 text-sm text-mute ring-1 ring-line-2 hover:text-ink"
            >
              <RotateCcw className="size-3.5" aria-hidden /> Restablecer ejemplo
            </button>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            <div className="grid gap-7 p-6 sm:p-8">
              <Field
                icon={Clock}
                label="Horas mensuales destinadas a control manual"
                help="Búsqueda, carga, consolidación y verificación de planillas."
                value={v.hours}
                onChange={(x) => set('hours', x)}
                min={0}
                max={300}
                step={5}
                suffix="h / mes"
              />
              <Field
                icon={Scale}
                label="Costo estimado por hora"
                help="Costo laboral aproximado de quien realiza esas tareas."
                value={v.rate}
                onChange={(x) => set('rate', x)}
                min={0}
                max={40000}
                step={500}
                prefix="$"
                suffix="/ hora"
              />
              <Field
                icon={PackageMinus}
                label="Pérdidas mensuales estimadas por diferencias de stock"
                help="Faltantes, roturas no registradas, errores de carga o mercadería no ubicada."
                value={v.losses}
                onChange={(x) => set('losses', x)}
                min={0}
                max={5_000_000}
                step={50_000}
                prefix="$"
                suffix="/ mes"
              />
              <Field
                icon={TrendingUp}
                label="Porcentaje hipotético de mejora"
                help="Qué parte de ese tiempo y de esas pérdidas podría reducirse."
                value={v.pct}
                onChange={(x) => set('pct', x)}
                min={0}
                max={100}
                step={5}
                suffix="%"
              />
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-surface-2 p-4 ring-1 ring-line">
                <span>
                  <span className="block text-sm font-medium text-ink">Descontar mantenimiento mensual</span>
                  <span className="block text-xs text-dim">Resta {ars(PROPOSAL.maintenance)} por mes al impacto estimado.</span>
                </span>
                <input
                  type="checkbox"
                  checked={v.maint}
                  onChange={(e) => set('maint', e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className="relative h-6 w-11 shrink-0 rounded-full bg-surface-3 ring-1 ring-line-2 transition-colors peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-ink after:transition-transform peer-checked:after:translate-x-5 peer-checked:after:bg-accent-ink"
                />
              </label>
            </div>

            <div className="border-t border-line bg-bg-2/60 p-6 sm:p-8 lg:border-l lg:border-t-0" aria-live="polite">
              <div className="grid grid-cols-2 gap-3">
                <Out label="Tiempo valorizado" sub="horas × costo por hora" value={ars(r.timeValue)} />
                <Out label="Ahorro hipotético de tiempo" sub={`${v.pct}% del tiempo valorizado`} value={ars(r.timeSaving)} />
                <Out label="Reducción hipotética de pérdidas" sub={`${v.pct}% de las pérdidas estimadas`} value={ars(r.lossSaving)} />
                <Out
                  label="Impacto potencial mensual"
                  sub={v.maint ? 'neto de mantenimiento' : 'ahorro + reducción'}
                  value={ars(r.net)}
                  strong
                />
              </div>

              <div className="mt-3 rounded-2xl bg-surface p-5 ring-1 ring-accent/25">
                <p className="text-sm text-mute">Tiempo hipotético de recuperación de la inversión</p>
                {r.payback ? (
                  <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
                    <span className="num text-4xl font-semibold tracking-[-0.03em] text-accent">
                      {r.payback < 10 ? n1(r.payback) : n0(r.payback)}
                    </span>
                    <span className="text-mute">meses</span>
                    <span className="text-sm text-dim">
                      sobre una inversión de {ars(PROPOSAL.development)}
                    </span>
                  </p>
                ) : (
                  <p className="mt-2 text-lg text-dim">No calculable con estos valores (impacto mensual nulo o negativo).</p>
                )}
                <PaybackChart monthly={r.net} />
              </div>

              <p className="mt-4 flex gap-2.5 rounded-xl border border-warn/30 bg-warn/[0.06] p-4 text-sm leading-relaxed text-mute">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warn" aria-hidden />
                <span>
                  El resultado es una simulación orientativa. El retorno real dependerá de los procesos actuales, los datos
                  disponibles, la adopción del sistema y las mejoras efectivamente obtenidas.
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  icon: I,
  label,
  help,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  icon: typeof Clock;
  label: string;
  help: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  const id = useId();
  const clamp = (n: number) => Math.max(min, Math.min(n, max * 10));
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <label htmlFor={id} className="flex items-start gap-2.5">
          <I className="mt-0.5 size-4 shrink-0 text-dim" strokeWidth={1.7} aria-hidden />
          <span>
            <span className="block text-sm font-medium text-ink">{label}</span>
            <span className="mt-0.5 block text-xs text-dim">{help}</span>
          </span>
        </label>
        <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-bg-2 px-2.5 py-1.5 ring-1 ring-line focus-within:ring-accent/60">
          {prefix && <span className="text-sm text-dim">{prefix}</span>}
          <input
            id={id}
            type="text"
            inputMode="numeric"
            value={n0(value)}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, '');
              onChange(clamp(digits ? Number(digits) : 0));
            }}
            className="num w-24 bg-transparent text-right text-sm font-medium text-ink focus:outline-none"
          />
          {suffix && <span className="whitespace-nowrap text-xs text-dim">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={Math.min(value, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="no-print mt-3 w-full"
      />
    </div>
  );
}

function Out({ label, sub, value, strong }: { label: string; sub: string; value: string; strong?: boolean }) {
  return (
    <div className={cx('rounded-xl p-4 ring-1', strong ? 'bg-accent/[0.07] ring-accent/30' : 'bg-surface ring-line')}>
      <p className="text-[0.78rem] leading-snug text-mute">{label}</p>
      <p className={cx('num mt-2 text-xl font-semibold tracking-tight sm:text-2xl', strong ? 'text-accent' : 'text-ink')}>{value}</p>
      <p className="mt-1 text-[0.7rem] text-dim">{sub}</p>
    </div>
  );
}

function PaybackChart({ monthly }: { monthly: number }) {
  const months = 24;
  const W = 560;
  const H = 120;
  const inv = PROPOSAL.development;
  const top = Math.max(inv * 1.25, monthly * months, 1);
  const x = (m: number) => (m / months) * W;
  const y = (val: number) => H - Math.max(0, Math.min(val, top)) / top * (H - 8);
  const cum = Array.from({ length: months + 1 }, (_, m) => Math.max(0, monthly * m));
  const path = cum.map((c, m) => `${m === 0 ? 'M' : 'L'}${x(m)},${y(c)}`).join(' ');

  return (
    <div className="mt-5">
      <svg viewBox={`0 0 ${W} ${H + 18}`} className="block h-auto w-full" role="img" aria-label="Impacto acumulado hipotético frente a la inversión, a 24 meses">
        <line x1="0" x2={W} y1={y(inv)} y2={y(inv)} stroke="var(--color-dim)" strokeDasharray="4 5" />
        <text x={W} y={y(inv) - 6} textAnchor="end" fontSize="11" fill="var(--color-dim)">
          Inversión {ars(inv)}
        </text>
        <path d={`${path} L${W},${H} L0,${H} Z`} fill="var(--color-accent)" opacity="0.1" />
        <path d={path} fill="none" stroke="var(--color-accent)" strokeWidth="2" />
        {[0, 6, 12, 18, 24].map((m) => (
          <text key={m} x={x(m)} y={H + 14} textAnchor={m === 0 ? 'start' : m === months ? 'end' : 'middle'} fontSize="10" fill="var(--color-dim)" fontFamily="var(--font-mono)">
            {m === 0 ? 'mes 0' : m}
          </text>
        ))}
      </svg>
      <p className="mt-1 text-[0.7rem] text-dim">Impacto acumulado hipotético a 24 meses.</p>
    </div>
  );
}
