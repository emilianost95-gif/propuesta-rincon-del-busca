import { ArrowRightLeft, BarChart3, Package, Store, Warehouse } from 'lucide-react';
import { motion } from 'motion/react';
import { Reveal, Section, SectionHeader } from '@/components/ui';

const NODES = [
  { icon: Warehouse, t: 'Central', d: 'Recepción y depósito principal: el origen del abastecimiento.' },
  { icon: Package, t: 'Inventario', d: 'Catálogo único con stock, costos, precios y mínimos.' },
  { icon: Store, t: 'Puestos', d: 'Cada ubicación con su propio stock y su responsable.' },
  { icon: ArrowRightLeft, t: 'Movimientos', d: 'Entradas, salidas, transferencias y ajustes registrados.' },
  { icon: BarChart3, t: 'Reportes', d: 'Información consolidada para controlar y decidir.' },
];

const QUESTIONS = [
  ['¿Qué mercadería existe?', 'Catálogo y stock centralizados.'],
  ['¿Dónde se encuentra?', 'Stock por central y por puesto.'],
  ['¿Qué movimientos hubo?', 'Historial con fecha y responsable.'],
  ['¿Qué hay que reponer?', 'Alertas por stock mínimo.'],
];

export function Solution() {
  return (
    <Section id="solucion" label="La solución" className="border-t border-line bg-bg-2">
      <div className="shell">
        <SectionHeader
          index="02"
          eyebrow="La solución"
          title="Una plataforma central para toda la operación."
          lead="Un sistema diseñado para que el propietario y los responsables puedan conocer qué mercadería existe, dónde se encuentra, qué movimientos se realizaron y qué necesidades de reposición pueden surgir. No es una planilla digitalizada: es el centro de control del negocio."
        />

        <Reveal className="mt-16">
          <ol className="relative grid gap-3 lg:grid-cols-5 lg:gap-0">
            {NODES.map(({ icon: I, t, d }, i) => (
              <li key={t} className="relative flex lg:block">
                {/* conector */}
                {i < NODES.length - 1 && (
                  <svg
                    aria-hidden
                    className="decor absolute left-[1.9rem] top-16 h-[calc(100%-2rem)] w-px overflow-visible lg:left-[calc(50%+2.25rem)] lg:top-[2.2rem] lg:h-px lg:w-[calc(100%-4.5rem)]"
                    preserveAspectRatio="none"
                  >
                    <line x1="0" y1="0" x2="100%" y2="0" className="hidden lg:block" stroke="var(--color-line-2)" />
                    <line x1="0" y1="0" x2="100%" y2="0" className="flow-dash hidden lg:block" stroke="var(--color-accent)" strokeOpacity="0.7" />
                    <line x1="0" y1="0" x2="0" y2="100%" className="lg:hidden" stroke="var(--color-line-2)" />
                    <line x1="0" y1="0" x2="0" y2="100%" className="flow-dash lg:hidden" stroke="var(--color-accent)" strokeOpacity="0.7" />
                  </svg>
                )}
                <div className="flex w-full items-start gap-5 rounded-2xl p-3 lg:flex-col lg:items-center lg:px-4 lg:text-center">
                  <motion.span
                    className="relative grid size-[3.75rem] shrink-0 place-items-center rounded-2xl bg-surface ring-1 ring-line-2 lg:size-[4.4rem]"
                    whileHover={{ y: -3 }}
                  >
                    <I className="size-6 text-accent" strokeWidth={1.6} aria-hidden />
                    <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-bg font-mono text-[0.6rem] text-dim ring-1 ring-line-2">
                      {i + 1}
                    </span>
                  </motion.span>
                  <div className="pt-1 lg:pt-2">
                    <h3 className="text-lg font-semibold tracking-tight text-ink">{t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-dim lg:mx-auto lg:max-w-[14rem]">{d}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUESTIONS.map(([q, a], i) => (
            <Reveal key={q} delay={i * 0.06} className="panel avoid-break p-6">
              <p className="text-lg font-medium tracking-tight text-ink">{q}</p>
              <p className="mt-2 text-sm text-mute">{a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
