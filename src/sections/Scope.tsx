import { Check, Layers, Minus, Smartphone, Sparkles } from 'lucide-react';
import { Chip, Reveal, Section, SectionHeader } from '@/components/ui';

const IN = [
  'Sistema web',
  'Dashboard',
  'Productos',
  'Inventario',
  'Central',
  'Puestos',
  'Transferencias',
  'Compras y proveedores',
  'Alertas de stock',
  'Reportes definidos',
  'Usuarios y permisos',
  'Importación inicial desde Excel, según formato y calidad de datos',
  'Capacitación inicial',
  'Implementación acordada',
];

const OUT = [
  'Facturación electrónica ARCA',
  'Contabilidad completa',
  'Liquidación de sueldos',
  'Integración bancaria',
  'POS avanzado',
  'Aplicación móvil nativa',
  'Integraciones con sistemas externos no especificados',
  'Hardware',
  'Funciones adicionales no incluidas en el alcance',
];

export function Scope() {
  return (
    <Section id="alcance" label="Alcance y exclusiones" className="print-break border-t border-line bg-bg-2">
      <div className="shell">
        <SectionHeader
          index="08"
          eyebrow="Alcance y exclusiones"
          title="Qué incluye esta primera etapa, con total claridad."
          lead="Definir bien el alcance protege la inversión y el cronograma. Lo que no forma parte de esta etapa puede contemplarse en etapas futuras."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="panel avoid-break p-7 ring-1 ring-accent/20 sm:p-9">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-accent">Incluido en la primera etapa</p>
              <span className="num font-mono text-xs text-dim">{IN.length} ítems</span>
            </div>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {IN.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[0.95rem] text-ink">
                  <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
                    <Check className="size-3" strokeWidth={2.6} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="panel avoid-break p-7 sm:p-9">
            <div className="flex items-center justify-between">
              <p className="eyebrow">No incluido inicialmente</p>
              <span className="num font-mono text-xs text-dim">{OUT.length} ítems</span>
            </div>
            <ul className="mt-6 grid gap-3">
              {OUT.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[0.95rem] text-mute">
                  <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-surface-3 text-dim">
                    <Minus className="size-3" strokeWidth={2.6} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-dim">Se pueden contemplar como futuras etapas, con presupuesto independiente.</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

const STAGES = [
  {
    tag: 'Etapa 1',
    icon: Layers,
    t: 'Base de gestión',
    current: true,
    items: ['Inventario, central y puestos', 'Transferencias y trazabilidad', 'Compras y proveedores', 'Alertas, reportes y usuarios'],
  },
  {
    tag: 'Etapa 2',
    icon: Sparkles,
    t: 'Ventas y rentabilidad',
    items: ['Ventas', 'Caja', 'Cierres', 'Rendición por puesto', 'Análisis de ventas', 'Rentabilidad', 'Integraciones'],
  },
  {
    tag: 'Etapa 3',
    icon: Smartphone,
    t: 'Movilidad e inteligencia',
    items: ['Aplicación móvil', 'Lectura de códigos de barras', 'Automatizaciones', 'Predicción de reposición', 'Inteligencia de negocios', 'Analítica avanzada'],
  },
];

export function Future() {
  return (
    <Section id="futuro" label="Futuro del proyecto" className="border-t border-line">
      <div className="shell">
        <SectionHeader
          index="09"
          eyebrow="Futuro del proyecto"
          title="Una base que puede crecer con el negocio."
          lead="La primera etapa construye los cimientos. Sobre ellos, el sistema puede evolucionar en etapas opcionales, cuando el negocio lo decida."
        />
        <div className="relative mt-14 grid gap-4 lg:grid-cols-3">
          <div aria-hidden className="decor absolute left-0 right-0 top-[2.15rem] hidden h-px bg-gradient-to-r from-accent/60 via-line-2 to-line lg:block" />
          {STAGES.map(({ tag, icon: I, t, items, current }, i) => (
            <Reveal key={tag} delay={i * 0.08} className={`panel avoid-break relative p-7 ${current ? 'ring-1 ring-accent/30' : ''}`}>
              <div className="flex items-center justify-between gap-3">
                <span className={`grid size-9 place-items-center rounded-xl ring-1 ${current ? 'bg-accent text-accent-ink ring-accent' : 'bg-surface-2 text-mute ring-line-2'}`}>
                  <I className="size-4" strokeWidth={1.8} aria-hidden />
                </span>
                {current ? <Chip tone="accent">Esta propuesta</Chip> : <Chip>Opcional</Chip>}
              </div>
              <p className="mt-6 font-mono text-xs text-dim">{tag}</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-ink">{t}</h3>
              <p className="mt-1 text-xs text-dim">{current ? 'Incluida en la inversión de esta propuesta.' : 'No incluida en la inversión actual. Se presupuesta por separado.'}</p>
              <ul className="mt-5 grid gap-2 text-sm text-mute">
                {items.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span aria-hidden className={`mt-2 size-1 shrink-0 rounded-full ${current ? 'bg-accent' : 'bg-dim'}`} />
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
