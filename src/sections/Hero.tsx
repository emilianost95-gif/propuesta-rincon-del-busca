import { motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  Boxes,
  LayoutDashboard,
  Package,
  Settings2,
  ShoppingCart,
  Store,
  Users,
  Warehouse,
} from 'lucide-react';
import { ButtonLink, Chip, DemoBadge, cx } from '@/components/ui';
import { ChartLegend, MovementsChart } from '@/components/Charts';
import { DEMO_MOVEMENTS, PROPOSAL, fmtDate } from '@/data/proposal';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section id="inicio" aria-label="Portada" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      <div aria-hidden className="decor pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <div className="glow-accent absolute -top-40 right-[-10%] h-[620px] w-[820px] opacity-70" />
      </div>

      {/* Encabezado sólo para la versión impresa */}
      <div className="print-only shell mb-8">
        <p className="eyebrow">Propuesta comercial · {fmtDate(PROPOSAL.issuedAt)}</p>
      </div>

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-10">
        <div>
          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="eyebrow text-mute">El Rincón del Busca</span>
            <span aria-hidden className="h-3 w-px bg-line-2" />
            <span className="eyebrow">Sistema Integral de Gestión Comercial</span>
          </motion.div>

          <motion.h1
            data-reveal
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
            className="mt-7 text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.4rem]"
          >
            El control de tu negocio.
            <span className="block text-dim">En un solo lugar.</span>
          </motion.h1>

          <motion.p
            data-reveal
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
            className="mt-7 font-mono text-sm tracking-tight text-accent"
          >
            Cada producto. Cada puesto. Cada movimiento.
          </motion.p>

          <motion.p
            data-reveal
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
            className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-mute"
          >
            Una solución digital diseñada para centralizar la operación comercial, controlar inventarios, administrar
            puestos, organizar compras y transformar la información del negocio en decisiones inteligentes.
          </motion.p>

          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.32 }}
            className="no-print mt-10 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#desafio">
              Explorar la propuesta
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#inversion" variant="secondary">
              Ver inversión
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
          </motion.div>

          <motion.dl
            data-reveal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-6"
          >
            {[
              ['9', 'módulos integrados'],
              ['6–8', 'semanas estimadas'],
              ['1', 'plataforma central'],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="sr-only">{v}</dt>
                <dd className="num text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{k}</dd>
                <dd className="mt-1 text-sm leading-snug text-dim">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          data-reveal
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          style={{ transformPerspective: 1400 }}
          className="relative"
        >
          <HeroConsole />
          <p className="mt-4 text-center text-xs text-dim lg:text-left">
            Demostración visual conceptual. El sistema se desarrollará a medida tras el relevamiento; las cifras mostradas
            son ficticias.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const SIDE = [
  { icon: LayoutDashboard, label: 'Dashboard', on: true },
  { icon: Package, label: 'Inventario' },
  { icon: Warehouse, label: 'Central' },
  { icon: Store, label: 'Puestos' },
  { icon: ArrowRightLeft, label: 'Transferencias' },
  { icon: ShoppingCart, label: 'Compras' },
  { icon: BarChart3, label: 'Reportes' },
  { icon: Users, label: 'Usuarios' },
];

function HeroConsole() {
  return (
    <figure className="screen relative overflow-hidden" aria-label="Maqueta conceptual del panel principal con datos ficticios">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <span className="font-mono text-xs text-dim">
          rincón / <span className="text-mute">dashboard</span>
        </span>
        <DemoBadge />
      </div>
      <div className="flex">
        <aside className="hidden w-44 shrink-0 border-r border-line p-3 sm:block" aria-hidden>
          <ul className="grid gap-0.5">
            {SIDE.map(({ icon: I, label, on }) => (
              <li
                key={label}
                className={cx(
                  'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.8rem]',
                  on ? 'bg-surface-3 text-ink' : 'text-dim',
                )}
              >
                <I className={cx('size-4', on && 'text-accent')} strokeWidth={1.8} />
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-2 rounded-lg px-2.5 text-[0.8rem] text-dim">
            <Settings2 className="size-4" strokeWidth={1.8} /> Configuración
          </div>
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-2.5 2xl:grid-cols-4">
            {[
              { k: 'Productos activos', v: '2.418', icon: Boxes },
              { k: 'Unidades en stock', v: '48.920', icon: Package },
              { k: 'Alertas abiertas', v: '12', icon: AlertTriangle, warn: true },
              { k: 'Transf. en curso', v: '4', icon: ArrowRightLeft },
            ].map(({ k, v, icon: I, warn }) => (
              <div key={k} className="min-w-0 rounded-xl bg-bg-2/60 p-3 ring-1 ring-line">
                <div className="flex items-center justify-between">
                  <span className="truncate text-[0.7rem] text-dim">{k}</span>
                  <I className={cx('size-3.5', warn ? 'text-warn' : 'text-dim')} strokeWidth={1.8} />
                </div>
                <div className="num mt-2 text-lg font-semibold tracking-tight text-ink">{v}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl bg-bg-2/60 p-3.5 ring-1 ring-line">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-mute">Movimientos · últimos 14 días</span>
              <ChartLegend
                items={[
                  { color: 'var(--color-accent)', label: 'Entradas' },
                  { color: 'var(--color-info)', label: 'Salidas' },
                  { color: 'var(--color-warn)', label: 'Transf.' },
                ]}
              />
            </div>
            <MovementsChart data={DEMO_MOVEMENTS} height={150} />
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="rounded-xl bg-bg-2/60 p-3.5 ring-1 ring-line">
              <div className="mb-2.5 text-xs font-medium text-mute">Stock por ubicación</div>
              {[
                ['Central', 78],
                ['Puesto 01', 54],
                ['Puesto 02', 33],
                ['Puesto 03', 42],
              ].map(([l, v]) => (
                <div key={l} className="mb-2 flex items-center gap-2.5 last:mb-0">
                  <span className="w-16 shrink-0 text-[0.72rem] text-dim">{l}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                    <motion.div
                      data-anim
                      className="h-full rounded-full bg-accent/80"
                      style={{ width: `${v}%` }}
                      initial={{ clipPath: 'inset(0 100% 0 0)' }}
                      animate={{ clipPath: 'inset(0 0% 0 0)' }}
                      transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-bg-2/60 p-3.5 ring-1 ring-line">
              <div className="mb-2.5 flex items-center justify-between text-xs font-medium text-mute">
                Alertas
                <span className="pulse-soft size-1.5 rounded-full bg-warn" aria-hidden />
              </div>
              <ul className="grid grid-cols-1 gap-2">
                {[
                  { t: 'Pilas AA x4 · agotado', l: 'Puesto 03', tone: 'crit' as const, c: 'Crítica' },
                  { t: 'Esponja doble faz · bajo mínimo', l: 'Puesto 01', tone: 'warn' as const, c: 'Alta' },
                  { t: 'TR-0148 en tránsito', l: 'Central → P01', tone: 'info' as const, c: 'Info' },
                ].map((a) => (
                  <li key={a.t} className="flex items-center justify-between gap-2">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.75rem] text-ink">{a.t}</span>
                      <span className="block text-[0.68rem] text-dim">{a.l}</span>
                    </span>
                    <Chip tone={a.tone}>{a.c}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
