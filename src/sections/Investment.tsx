import { motion } from 'motion/react';
import { Info, LifeBuoy } from 'lucide-react';
import { CheckList, Reveal, Section, SectionHeader } from '@/components/ui';
import { PROPOSAL, fmtDate, validUntil } from '@/data/proposal';
import { ars } from '@/lib/format';

const INCLUDES = [
  'Sistema web a medida, accesible desde navegador',
  'Los 9 módulos descriptos en esta propuesta',
  'Importación inicial desde Excel, según formato y calidad de los datos',
  'Configuración de central, puestos, usuarios y roles',
  'Capacitación inicial e implementación acordada',
];

const MAINT = ['Soporte técnico', 'Corrección de errores', 'Supervisión básica', 'Actualizaciones', 'Copias de seguridad, según la infraestructura acordada', 'Asistencia'];

const NOTES = [
  'Valores expresados en pesos argentinos (ARS).',
  `Cotización sujeta a revisión, con vigencia de ${PROPOSAL.validityDays} días desde su emisión.`,
  'Hosting, dominio, servicios externos y licencias se especificarán según las necesidades técnicas.',
  'El presupuesto está sujeto al alcance definitivo acordado en el relevamiento.',
  'El mantenimiento mensual es opcional.',
  'Las nuevas funcionalidades y ampliaciones se presupuestan por separado.',
];

export function Investment() {
  const pctOfRevenue = (PROPOSAL.development / PROPOSAL.reportedMonthlyRevenue) * 100;

  return (
    <Section id="inversion" label="Inversión" className="print-break border-t border-line bg-bg-2">
      <div className="shell">
        <SectionHeader
          index="06"
          eyebrow="Inversión"
          title="Una inversión clara, sin letra chica."
          lead="Un valor cerrado para la primera versión del sistema, con pagos vinculados a entregas concretas."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          {/* Desarrollo */}
          <Reveal className="panel avoid-break relative overflow-hidden p-7 ring-1 ring-accent/20 sm:p-10 lg:col-span-7">
            <div aria-hidden className="decor glow-accent absolute -right-40 -top-40 size-[30rem] opacity-60" />
            <div className="relative">
              <p className="eyebrow text-accent">Desarrollo del sistema</p>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-3">
                <span className="num text-5xl font-semibold tracking-[-0.04em] text-ink sm:text-7xl">{ars(PROPOSAL.development)}</span>
                <span className="font-mono text-sm text-dim">ARS</span>
              </p>
              <p className="mt-3 text-mute">Incluye el desarrollo de la primera versión según el alcance definido.</p>

              <div className="mt-10">
                <p className="eyebrow mb-4">Forma de pago</p>
                <div className="flex h-2.5 overflow-hidden rounded-full bg-surface-3" aria-hidden>
                  {PROPOSAL.payments.map((p, i) => (
                    <motion.div
                      key={p.label}
                      data-anim
                      className="h-full border-r-2 border-surface last:border-r-0"
                      style={{ width: `${p.pct}%`, background: i === 0 ? 'var(--color-accent)' : `color-mix(in oklab, var(--color-accent) ${70 - i * 20}%, var(--color-surface-3))` }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.15 }}
                    />
                  ))}
                </div>
                <ol className="mt-5 grid gap-3 sm:grid-cols-3">
                  {PROPOSAL.payments.map((p, i) => (
                    <li key={p.label} className="rounded-xl bg-surface-2 p-4 ring-1 ring-line">
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono text-xs text-dim">0{i + 1}</span>
                        <span className="num font-mono text-sm text-accent">{p.pct}%</span>
                      </div>
                      <div className="num mt-3 text-xl font-semibold tracking-tight text-ink">{ars((PROPOSAL.development * p.pct) / 100)}</div>
                      <div className="mt-1 text-sm font-medium text-mute">{p.label}</div>
                      <div className="mt-1 text-xs leading-snug text-dim">{p.detail}</div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10">
                <p className="eyebrow mb-4">Qué obtenés</p>
                <CheckList items={INCLUDES} />
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 lg:col-span-5">
            {/* Mantenimiento */}
            <Reveal delay={0.08} className="panel avoid-break p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="eyebrow">Mantenimiento opcional</p>
                <LifeBuoy className="size-5 text-dim" strokeWidth={1.5} aria-hidden />
              </div>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
                <span className="num text-4xl font-semibold tracking-[-0.03em] text-ink">{ars(PROPOSAL.maintenance)}</span>
                <span className="text-sm text-dim">ARS / mes</span>
              </p>
              <p className="mt-2 text-sm text-dim">Valor de referencia inicial.</p>
              <CheckList items={MAINT} tone="mute" className="mt-6" />
              <p className="mt-5 text-sm text-dim">Las nuevas funcionalidades y ampliaciones se presupuestan por separado.</p>
            </Reveal>

            {/* Escala */}
            <Reveal delay={0.12} className="panel avoid-break p-7 sm:p-8">
              <p className="eyebrow">En perspectiva</p>
              <p className="mt-4 text-pretty text-lg leading-snug text-ink">
                La inversión de desarrollo equivale aproximadamente al{' '}
                <span className="num font-semibold text-accent">{pctOfRevenue.toLocaleString('es-AR', { maximumFractionDigits: 2 })}%</span> de la facturación mensual
                informada por el negocio.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-dim">
                Cálculo de referencia sobre la facturación mensual aproximada informada por el cliente (
                {ars(PROPOSAL.reportedMonthlyRevenue)}). No representa margen ni ganancia.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="panel avoid-break mt-4 p-7 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-medium text-ink">
              <Info className="size-4 text-info" aria-hidden /> Aclaraciones
            </p>
            <p className="font-mono text-xs text-dim">
              Emisión {fmtDate(PROPOSAL.issuedAt)} · válida hasta {fmtDate(validUntil())}
            </p>
          </div>
          <ul className="mt-5 grid gap-x-10 gap-y-2.5 text-sm text-mute md:grid-cols-2">
            {NOTES.map((n) => (
              <li key={n} className="flex gap-2.5">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-dim" />
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
