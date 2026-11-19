import {
  ArrowRight,
  Clock,
  FileSpreadsheet,
  Files,
  Gauge,
  Hand,
  History,
  PackageSearch,
  PackageX,
  RefreshCcw,
  Scale,
  Store,
  Bell,
  BarChart3,
  Database,
  MapPin,
  Route,
} from 'lucide-react';
import { Reveal, Section, SectionHeader, cx } from '@/components/ui';
import { PROPOSAL } from '@/data/proposal';

const RISKS = [
  { icon: Files, t: 'Información distribuida', d: 'Datos repartidos en distintos archivos, versiones y personas.' },
  { icon: PackageSearch, t: 'Stock real incierto', d: 'Dificultad para saber cuánta mercadería hay realmente disponible.' },
  { icon: Store, t: 'Mercadería distribuida sin visibilidad', d: 'Poca claridad sobre qué tiene cada puesto en cada momento.' },
  { icon: Scale, t: 'Diferencias de inventario', d: 'Desajustes entre lo registrado y las existencias físicas.' },
  { icon: PackageX, t: 'Faltantes difíciles de detectar', d: 'Productos que se agotan sin que nadie lo advierta a tiempo.' },
  { icon: RefreshCcw, t: 'Reposición poco organizada', d: 'Compras y envíos decididos sin información consolidada.' },
  { icon: Hand, t: 'Dependencia de carga manual', d: 'La información depende de que alguien la registre y la pase.' },
  { icon: History, t: 'Movimientos difíciles de reconstruir', d: 'Cuesta saber qué salió, hacia dónde, cuándo y quién lo hizo.' },
  { icon: Clock, t: 'Tiempo en consolidar datos', d: 'Horas dedicadas a buscar, copiar y unificar planillas.' },
  { icon: Gauge, t: 'Indicadores desactualizados', d: 'Decisiones tomadas con información parcial o atrasada.' },
];

export function Challenge() {
  return (
    <Section id="desafio" label="El desafío actual" className="border-t border-line">
      <div className="shell">
        <SectionHeader
          index="01"
          eyebrow="El desafío actual"
          title="Cuando el negocio crece, administrar manualmente se vuelve cada vez más complejo."
          lead={
            <>
              Excel es una herramienta valiosa para empezar, pero no fue pensada para coordinar una central, múltiples
              puestos y miles de movimientos. Con una facturación mensual informada cercana a los{' '}
              <span className="text-ink">${(PROPOSAL.reportedMonthlyRevenue / 1_000_000).toLocaleString('es-AR')} millones</span>
              , cada diferencia de stock y cada hora de consolidación manual tienen un peso real en la operación.
            </>
          }
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {RISKS.map(({ icon: I, t, d }, i) => (
            <Reveal key={t} delay={(i % 5) * 0.05} className="avoid-break bg-bg p-6 transition-colors hover:bg-surface">
              <I className="size-5 text-dim" strokeWidth={1.6} aria-hidden />
              <h3 className="mt-5 text-[0.98rem] font-medium leading-snug text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">{d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-dim">
            Se trata de desafíos habituales en operaciones con abastecimiento central y varios puntos de venta. No
            describen necesariamente la situación actual de El Rincón del Busca: su incidencia real se confirmará durante
            el relevamiento, y el sistema se orienta a prevenirlos o resolverlos.
          </p>
        </Reveal>

        <Compare />
      </div>
    </Section>
  );
}

function Compare() {
  const manual = [
    { icon: FileSpreadsheet, t: 'Excel y planillas' },
    { icon: Files, t: 'Registros dispersos' },
    { icon: Clock, t: 'Información desactualizada' },
    { icon: Hand, t: 'Procesos manuales' },
    { icon: History, t: 'Difícil seguimiento' },
  ];
  const central = [
    { icon: Database, t: 'Información unificada' },
    { icon: Route, t: 'Movimientos trazables' },
    { icon: MapPin, t: 'Stock por ubicación' },
    { icon: Bell, t: 'Alertas automáticas de stock' },
    { icon: BarChart3, t: 'Reportes' },
  ];
  return (
    <div className="mt-24 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
      <Reveal className="panel avoid-break relative overflow-hidden p-7 sm:p-9">
        <p className="eyebrow">Gestión manual</p>
        <p className="mt-3 text-xl font-medium text-mute">La información existe, pero está fragmentada.</p>
        <div aria-hidden className="decor relative my-8 h-28">
          {[
            ['left-[4%] top-2 -rotate-6', 'stock_central_v3.xlsx'],
            ['left-[34%] top-10 rotate-3', 'puesto02_final.xlsx'],
            ['left-[10%] top-[4.5rem] rotate-2', 'compras_oct (2).xlsx'],
            ['right-[4%] top-1 -rotate-2', 'transferencias.xlsx'],
            ['right-[10%] top-[4.2rem] rotate-6', 'faltantes?.xlsx'],
          ].map(([pos, name]) => (
            <span
              key={name}
              className={cx(
                'absolute inline-flex items-center gap-1.5 rounded-md bg-surface-2 px-2.5 py-1.5 font-mono text-[0.7rem] text-dim ring-1 ring-line-2',
                pos,
              )}
            >
              <FileSpreadsheet className="size-3.5" /> {name}
            </span>
          ))}
        </div>
        <ul className="grid gap-3">
          {manual.map(({ icon: I, t }) => (
            <li key={t} className="flex items-center gap-3 text-mute">
              <I className="size-4 text-dim" strokeWidth={1.7} aria-hidden /> {t}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="flex items-center justify-center py-2" aria-hidden>
        <span className="grid size-12 place-items-center rounded-full bg-surface-2 ring-1 ring-line-2">
          <ArrowRight className="size-5 rotate-90 text-accent lg:rotate-0" />
        </span>
      </div>

      <Reveal delay={0.1} className="panel avoid-break relative overflow-hidden p-7 ring-1 ring-accent/25 sm:p-9">
        <div aria-hidden className="decor glow-accent absolute -right-24 -top-24 size-72" />
        <p className="eyebrow text-accent">Gestión centralizada</p>
        <p className="mt-3 text-xl font-medium text-ink">Una sola fuente de información confiable.</p>
        <div aria-hidden className="decor relative my-8 grid h-28 place-items-center">
          <div className="flex items-center gap-3">
            {['Central', 'Inventario', 'Puestos'].map((x, i) => (
              <div key={x} className="flex items-center gap-3">
                <span className="rounded-lg bg-surface-2 px-3 py-2 text-xs text-ink ring-1 ring-accent/30">{x}</span>
                {i < 2 && <span className="h-px w-5 bg-accent/50 sm:w-8" />}
              </div>
            ))}
          </div>
        </div>
        <ul className="grid gap-3">
          {central.map(({ icon: I, t }) => (
            <li key={t} className="flex items-center gap-3 text-ink">
              <I className="size-4 text-accent" strokeWidth={1.7} aria-hidden /> {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
