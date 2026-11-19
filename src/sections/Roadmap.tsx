import { ClipboardList, Code2, FlaskConical, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { Reveal, Section, SectionHeader, cx } from '@/components/ui';

const PHASES = [
  {
    n: '01',
    icon: ClipboardList,
    t: 'Relevamiento y planificación',
    dur: '1 semana',
    weeks: [1, 1],
    items: ['Reunión con el cliente', 'Relevamiento de procesos', 'Análisis de las planillas Excel', 'Identificación de puestos', 'Definición de roles', 'Definición de alcance', 'Organización de la información'],
    out: 'Documento funcional y planificación.',
  },
  {
    n: '02',
    icon: Code2,
    t: 'Desarrollo',
    dur: '3 a 5 semanas',
    weeks: [3, 5],
    items: ['Arquitectura', 'Diseño de interfaz', 'Desarrollo de módulos', 'Base de datos', 'Integración', 'Pruebas internas'],
    out: 'Versión funcional para validar.',
  },
  {
    n: '03',
    icon: FlaskConical,
    t: 'Validación',
    dur: '1 semana',
    weeks: [1, 1],
    items: ['Pruebas con datos de ejemplo', 'Validación de procesos', 'Corrección de errores', 'Ajustes acordados'],
    out: 'Sistema validado por el cliente.',
  },
  {
    n: '04',
    icon: Rocket,
    t: 'Implementación',
    dur: '1 semana',
    weeks: [1, 1],
    items: ['Preparación de datos', 'Importación inicial acordada', 'Configuración', 'Capacitación', 'Puesta en marcha'],
    out: 'Sistema en funcionamiento.',
  },
];

// Ubicación en el cronograma (semanas, escenario mínimo / máximo)
const GANTT = [
  { label: 'Relevamiento', start: 0, min: 1, max: 1 },
  { label: 'Desarrollo', start: 1, min: 3, max: 5 },
  { label: 'Validación', start: 4, min: 1, max: 1, shift: 2 },
  { label: 'Implementación', start: 5, min: 1, max: 1, shift: 2 },
];

export function Roadmap() {
  return (
    <Section id="implementacion" label="Propuesta de implementación" className="border-t border-line">
      <div className="shell">
        <SectionHeader
          index="05"
          eyebrow="Propuesta de implementación"
          title="Un camino claro, en cuatro fases."
          lead="Un proceso ordenado, con entregables concretos y validación del cliente antes de la puesta en marcha. Plazo global estimado: 6 a 8 semanas."
        />

        <div role="list" className="mt-16 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {PHASES.map(({ n, icon: I, t, dur, items, out }, i) => (
            <Reveal key={n} delay={i * 0.07} className="panel avoid-break relative flex flex-col p-6">
              <div role="listitem" className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-accent">Fase {n}</span>
                  <span className="rounded-full bg-surface-3 px-2.5 py-0.5 font-mono text-[0.7rem] text-mute ring-1 ring-line-2">{dur}</span>
                </div>
                <I className="mt-6 size-6 text-ink" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">{t}</h3>
                <ul className="mt-4 grid gap-1.5 text-sm text-mute">
                  {items.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-dim" />
                      {x}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <div className="hairline mb-4" />
                  <p className="text-[0.7rem] uppercase tracking-[0.12em] text-dim">Entregable</p>
                  <p className="mt-1 text-sm text-ink">{out}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="panel avoid-break mt-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Cronograma estimado</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
                6 a 8 semanas <span className="text-base font-normal text-dim">en total</span>
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-dim">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-4 rounded-sm bg-accent" /> escenario base
              </span>
              <span className="flex items-center gap-1.5">
                <span className="hatch h-2 w-4 rounded-sm ring-1 ring-accent/40" /> margen según alcance
              </span>
            </div>
          </div>

          <div className="scroll-x mt-8">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-[7.5rem_repeat(8,1fr)] text-center font-mono text-[0.68rem] text-dim">
                <span />
                {Array.from({ length: 8 }, (_, i) => (
                  <span key={i} className={cx('border-l border-line pb-2', i >= 6 && 'text-dim/70')}>
                    S{i + 1}
                  </span>
                ))}
              </div>
              <div className="grid gap-2.5">
                {GANTT.map((g, i) => (
                  <div key={g.label} className="grid grid-cols-[7.5rem_repeat(8,1fr)] items-center">
                    <span className="pr-3 text-sm text-mute">{g.label}</span>
                    <div className="relative col-span-8 h-7 rounded-md bg-surface-2/60">
                      {/* base */}
                      <motion.div
                        data-anim
                        className="absolute inset-y-1 rounded bg-accent"
                        style={{ left: `${(g.start / 8) * 100}%`, width: `${(g.min / 8) * 100}%` }}
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                      />
                      {/* margen */}
                      {g.max > g.min && (
                        <div
                          className="hatch absolute inset-y-1 rounded ring-1 ring-inset ring-accent/40"
                          style={{ left: `${((g.start + g.min) / 8) * 100}%`, width: `${((g.max - g.min) / 8) * 100}%` }}
                        />
                      )}
                      {g.shift && (
                        <div
                          className="absolute inset-y-1 rounded border border-dashed border-accent/80"
                          style={{ left: `${((g.start + g.shift) / 8) * 100}%`, width: `${(g.min / 8) * 100}%` }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-dim">
            El cronograma depende de la disponibilidad de información, de los tiempos de validación y del alcance
            definitivo acordado en la Fase 01. Si el desarrollo requiere 5 semanas, validación e implementación se
            desplazan en consecuencia (recuadros punteados).
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
