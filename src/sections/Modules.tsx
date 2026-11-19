import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRightLeft,
  BarChart3,
  Bell,
  LayoutDashboard,
  Package,
  ShieldCheck,
  ShoppingCart,
  Store,
  Warehouse,
  type LucideIcon,
} from 'lucide-react';
import { CheckList, Reveal, Section, SectionHeader, cx } from '@/components/ui';
import { useActiveSection } from '@/components/Nav';
import { DashboardDemo } from '@/components/modules/DashboardDemo';
import { InventoryDemo } from '@/components/modules/InventoryDemo';
import { CentralDemo } from '@/components/modules/CentralDemo';
import { StandsDemo } from '@/components/modules/StandsDemo';
import { TransferDemo } from '@/components/modules/TransferDemo';
import { PurchasesDemo } from '@/components/modules/PurchasesDemo';
import { AlertsDemo } from '@/components/modules/AlertsDemo';
import { ReportsDemo } from '@/components/modules/ReportsDemo';
import { SecurityDemo } from '@/components/modules/SecurityDemo';

interface ModuleDef {
  id: string;
  icon: LucideIcon;
  short: string;
  title: string;
  pitch: string;
  functions: string[];
  benefits: string[];
  note?: string;
  visual: ReactNode;
}

const MODULES: ModuleDef[] = [
  {
    id: 'm-dashboard',
    icon: LayoutDashboard,
    short: 'Dashboard',
    title: 'Dashboard',
    pitch: 'La primera pantalla del día: el estado del negocio en una sola vista, sin abrir múltiples archivos.',
    functions: [
      'Resumen general de la operación',
      'Stock total consolidado',
      'Alertas activas',
      'Movimientos recientes',
      'Productos con stock crítico',
      'Actividad de los puestos',
      'Indicadores de gestión',
      'Evolución de movimientos',
    ],
    benefits: [
      'Obtener una visión general sin revisar múltiples archivos.',
      'Identificar rápidamente las situaciones que requieren atención.',
      'Ahorrar tiempo administrativo.',
      'Tomar decisiones con información centralizada.',
    ],
    visual: <DashboardDemo />,
  },
  {
    id: 'm-inventario',
    icon: Package,
    short: 'Inventario',
    title: 'Inventario inteligente',
    pitch: 'Un catálogo único y ordenado, preparado para miles de productos, con búsqueda inmediata y estados de stock visibles.',
    functions: [
      'Catálogo centralizado de productos',
      'SKU o código interno',
      'Categorías',
      'Costos y precios',
      'Stock disponible y stock mínimo',
      'Historial de movimientos por producto',
      'Búsqueda rápida y filtros',
      'Importación desde Excel y exportación',
    ],
    benefits: [
      'Saber qué productos están disponibles.',
      'Reducir errores de identificación.',
      'Organizar miles de productos.',
      'Detectar necesidades de reposición.',
      'Mantener la información ordenada.',
      'Mejorar el control de existencias.',
    ],
    visual: <InventoryDemo />,
  },
  {
    id: 'm-central',
    icon: Warehouse,
    short: 'Central',
    title: 'Central y depósito',
    pitch: 'El punto de abastecimiento bajo control: todo lo que entra, sale, se ajusta o se distribuye queda registrado.',
    functions: [
      'Registro de mercadería recibida',
      'Inventario del depósito principal',
      'Entradas y salidas',
      'Ajustes de stock',
      'Transferencias a puestos',
      'Historial y control de movimientos',
    ],
    benefits: [
      'Controlar el punto central de abastecimiento.',
      'Saber qué mercadería permanece disponible.',
      'Organizar la distribución.',
      'Registrar cada movimiento.',
      'Reducir errores de administración.',
    ],
    visual: <CentralDemo />,
  },
  {
    id: 'm-puestos',
    icon: Store,
    short: 'Puestos',
    title: 'Gestión de puestos',
    pitch: 'Cada puesto con su propio inventario, sus movimientos y sus pendientes, consultable sin llamar ni preguntar.',
    functions: [
      'Registro individual de cada puesto',
      'Stock asociado a cada ubicación',
      'Transferencias desde la central',
      'Recepción de mercadería',
      'Registro de devoluciones',
      'Ajustes e historial de movimientos',
      'Consulta del stock por puesto',
    ],
    benefits: [
      'Saber qué productos tiene cada puesto.',
      'Dejar de depender de consultas manuales.',
      'Mejorar la distribución.',
      'Detectar diferencias.',
      'Mayor responsabilidad y trazabilidad.',
      'Organizar las reposiciones.',
    ],
    visual: <StandsDemo />,
  },
  {
    id: 'm-transferencias',
    icon: ArrowRightLeft,
    short: 'Transferencias',
    title: 'Transferencias y trazabilidad',
    pitch: 'Cada envío de mercadería tiene origen, destino, responsable y estado. Nada se mueve sin quedar registrado.',
    functions: [
      'Creación de transferencias',
      'Origen y destino',
      'Productos y cantidades',
      'Fecha y responsable',
      'Confirmación de recepción',
      'Estados: pendiente, en preparación, en tránsito, recibida u observada',
      'Historial completo',
    ],
    benefits: [
      'Conocer dónde se encuentra la mercadería.',
      'Evitar movimientos sin registro.',
      'Mejorar el control de entregas.',
      'Reconstruir el historial.',
      'Identificar responsables de cada movimiento.',
    ],
    visual: <TransferDemo />,
  },
  {
    id: 'm-compras',
    icon: ShoppingCart,
    short: 'Compras',
    title: 'Compras y proveedores',
    pitch: 'Proveedores, compras e ingresos de mercadería conectados con el inventario, para comprar con información.',
    functions: [
      'Registro de proveedores',
      'Historial de compras',
      'Productos adquiridos y costos',
      'Fecha de compra',
      'Ingreso de mercadería al stock',
      'Registro de facturas o documentos asociados, según el alcance definido',
      'Reposición sugerida según stock mínimo',
    ],
    benefits: [
      'Organizar las compras.',
      'Consultar proveedores rápidamente.',
      'Mantener un historial confiable.',
      'Mejorar el seguimiento de costos.',
      'Identificar productos que requieren reposición.',
      'Facilitar la planificación de compras.',
    ],
    note: 'La reposición sugerida de la primera versión se basa en reglas de stock mínimo configurables. Los modelos predictivos se contemplan como evolución futura.',
    visual: <PurchasesDemo />,
  },
  {
    id: 'm-alertas',
    icon: Bell,
    short: 'Alertas',
    title: 'Alertas y reposición',
    pitch: 'El sistema avisa antes de que el faltante llegue al mostrador, con prioridades claras por ubicación.',
    functions: [
      'Stock mínimo configurable por producto',
      'Alertas de productos críticos',
      'Productos agotados',
      'Necesidades de reposición',
      'Visualización por central y por puesto',
    ],
    benefits: [
      'Anticiparse a los faltantes.',
      'Reducir ventas perdidas por falta de mercadería.',
      'Mejorar la planificación.',
      'Evitar compras desorganizadas.',
    ],
    visual: <AlertsDemo />,
  },
  {
    id: 'm-reportes',
    icon: BarChart3,
    short: 'Reportes',
    title: 'Reportes y analítica',
    pitch: 'Información organizada y exportable para controlar, analizar movimientos y planificar.',
    functions: [
      'Stock por ubicación',
      'Movimientos de productos',
      'Entradas y salidas',
      'Transferencias',
      'Productos con stock crítico',
      'Valorización del inventario según costos registrados',
      'Historial',
      'Exportación a Excel',
    ],
    benefits: [
      'Obtener información organizada.',
      'Analizar movimientos.',
      'Facilitar controles.',
      'Mejorar la planificación.',
      'Identificar tendencias.',
    ],
    note: 'Las estadísticas de ventas y rentabilidad requieren incorporar datos reales de ventas y costos; se proponen para la Etapa 2. Los reportes iniciales se calculan sobre los registros que el sistema administra.',
    visual: <ReportsDemo />,
  },
  {
    id: 'm-usuarios',
    icon: ShieldCheck,
    short: 'Usuarios',
    title: 'Usuarios y seguridad',
    pitch: 'Cada persona accede a lo que necesita, y cada acción queda registrada con su autor.',
    functions: [
      'Usuarios',
      'Roles y permisos',
      'Administrador',
      'Encargados',
      'Responsables de puestos',
      'Historial de acciones',
      'Registro de movimientos por usuario',
    ],
    benefits: [
      'Controlar los accesos.',
      'Organizar responsabilidades.',
      'Limitar acciones según cada rol.',
      'Mejorar la seguridad administrativa.',
      'Facilitar auditorías internas.',
    ],
    visual: <SecurityDemo />,
  },
];

const MODULE_IDS = MODULES.map((m) => m.id);

export function Modules() {
  const active = useActiveSection(MODULE_IDS, '-35% 0px -60% 0px');
  const railRef = useRef<HTMLDivElement>(null);

  // Mantiene visible el chip activo en el rail horizontal
  useEffect(() => {
    if (!active || !railRef.current) return;
    const el = railRef.current.querySelector<HTMLElement>(`[data-mod="${active}"]`);
    if (!el) return;
    const rail = railRef.current;
    const left = el.offsetLeft - rail.clientWidth / 2 + el.clientWidth / 2;
    rail.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  return (
    <Section id="modulos" label="Módulos del sistema" className="border-t border-line pb-10 sm:pb-16">
      <div className="shell">
        <SectionHeader
          index="03"
          eyebrow="Módulos del sistema"
          title="Nueve módulos. Una sola fuente de verdad."
          lead="Cada módulo resuelve una parte de la operación y comparte la misma base de información con el resto. Las pantallas que siguen son maquetas conceptuales con datos ficticios, pensadas para mostrar cómo funcionaría el sistema en el negocio."
        />

        <Reveal className="mt-12">
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
            {MODULES.map((m, i) => (
              <li key={m.id}>
                <a
                  href={`#${m.id}`}
                  className="group flex h-full flex-col gap-3 rounded-xl bg-surface p-3.5 ring-1 ring-line transition-colors hover:bg-surface-2 hover:ring-line-2"
                >
                  <span className="flex items-center justify-between">
                    <m.icon className="size-[1.1rem] text-accent" strokeWidth={1.7} aria-hidden />
                    <span className="font-mono text-[0.65rem] text-dim">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <span className="text-[0.82rem] font-medium leading-tight text-mute group-hover:text-ink">{m.short}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Rail de navegación de módulos (sticky dentro de la sección) */}
      <div className="no-print sticky top-16 z-30 mt-16">
        <div className="glass border-x-0">
          <div ref={railRef} className="shell no-scrollbar flex gap-1 overflow-x-auto py-2.5">
            {MODULES.map((m, i) => (
              <a
                key={m.id}
                data-mod={m.id}
                href={`#${m.id}`}
                aria-current={active === m.id ? 'true' : undefined}
                className={cx(
                  'relative flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-colors',
                  active === m.id ? 'text-accent-ink' : 'text-dim hover:text-ink',
                )}
              >
                {active === m.id && (
                  <motion.span
                    layoutId="mod-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="font-mono text-[0.68rem] opacity-70">{String(i + 1).padStart(2, '0')}</span>
                {m.short}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="shell">
        {MODULES.map((m, i) => (
          <ModuleBlock key={m.id} m={m} index={i} />
        ))}
      </div>
    </Section>
  );
}

function ModuleBlock({ m, index }: { m: ModuleDef; index: number }) {
  return (
    <article
      id={m.id}
      aria-labelledby={`${m.id}-t`}
      className={cx('grid scroll-mt-28 gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-14', index > 0 && 'border-t border-line', index > 0 && index % 3 === 0 && 'print-break')}
    >
      <div className="lg:col-span-5">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">Módulo {String(index + 1).padStart(2, '0')}</span>
            <span aria-hidden className="h-px w-6 bg-line-2" />
            <m.icon className="size-3.5" aria-hidden />
          </p>
          <h3 id={`${m.id}-t`} className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-[2.3rem]">
            {m.title}
          </h3>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-mute">{m.pitch}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-9">
          <p className="eyebrow mb-4 text-accent">Lo que gana el negocio</p>
          <CheckList items={m.benefits} />
        </Reveal>

        <Reveal delay={0.12} className="mt-9">
          <p className="eyebrow mb-3">Funciones incluidas</p>
          <ul className="flex flex-wrap gap-1.5">
            {m.functions.map((f) => (
              <li key={f} className="rounded-md bg-surface-2 px-2.5 py-1 text-[0.8rem] text-mute ring-1 ring-line">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        {m.note && (
          <Reveal delay={0.14} className="mt-6">
            <p className="rounded-xl border border-info/25 bg-info/[0.06] p-4 text-sm leading-relaxed text-mute">
              <span className="font-medium text-info">Alcance: </span>
              {m.note}
            </p>
          </Reveal>
        )}
      </div>

      <Reveal delay={0.1} className="min-w-0 lg:col-span-7 lg:pt-2">
        {m.visual}
      </Reveal>
    </article>
  );
}
