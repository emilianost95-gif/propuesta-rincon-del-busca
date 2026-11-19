import { Clock, Eye, FolderKanban, LineChart, Route, ShieldAlert, SlidersHorizontal, TrendingUp } from 'lucide-react';
import { Reveal, Section, SectionHeader } from '@/components/ui';

const CARDS = [
  { icon: Eye, t: 'Visibilidad', d: 'Consultar el stock de la central y de los diferentes puestos desde una sola plataforma.' },
  { icon: SlidersHorizontal, t: 'Control', d: 'Registrar entradas, salidas, transferencias y ajustes.' },
  { icon: FolderKanban, t: 'Organización', d: 'Centralizar productos, proveedores y movimientos.' },
  { icon: Clock, t: 'Tiempo', d: 'Reducir tareas manuales de búsqueda y consolidación de datos.' },
  { icon: ShieldAlert, t: 'Prevención', d: 'Detectar faltantes, errores y diferencias de inventario.' },
  { icon: LineChart, t: 'Planificación', d: 'Organizar compras y reposiciones con mayor información.' },
  { icon: Route, t: 'Trazabilidad', d: 'Consultar qué movimiento se realizó, cuándo y quién lo registró.' },
  { icon: TrendingUp, t: 'Escalabilidad', d: 'Una base tecnológica que puede acompañar el crecimiento del negocio.' },
];

const BEFORE_AFTER = [
  ['Saber el stock de un puesto', 'Consultar al responsable o revisar su planilla.', 'Se consulta al instante, por ubicación.'],
  ['Enviar mercadería a un puesto', 'Aviso informal y anotación posterior.', 'Transferencia registrada con estado y confirmación.'],
  ['Detectar un faltante', 'Cuando ya ocurrió en el mostrador.', 'Alerta al cruzar el stock mínimo configurado.'],
  ['Preparar una compra', 'Revisar varias planillas y estimar.', 'Lista de reposición sugerida e historial del proveedor.'],
  ['Reconstruir qué pasó', 'Buscar entre archivos y mensajes.', 'Historial con fecha, ubicación y usuario.'],
];

export function Benefits() {
  return (
    <Section id="beneficios" label="Beneficios" className="border-t border-line bg-bg-2">
      <div className="shell">
        <SectionHeader
          index="04"
          eyebrow="Transformación"
          title="Lo que cambia cuando tenés el control."
          lead="El valor del sistema no está en sus pantallas, sino en cómo cambia el día a día: menos búsqueda de información, más certeza para decidir."
        />

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ icon: I, t, d }, i) => (
            <Reveal key={t} delay={(i % 4) * 0.06} className="panel avoid-break group relative overflow-hidden p-6 transition-colors hover:border-line-2">
              <div aria-hidden className="decor glow-accent absolute -right-16 -top-16 size-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="grid size-10 place-items-center rounded-xl bg-accent/10 ring-1 ring-accent/25">
                <I className="size-5 text-accent" strokeWidth={1.6} aria-hidden />
              </span>
              <h3 className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-ink">{t}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-mute">{d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <h3 className="text-2xl font-semibold tracking-tight text-ink">Antes y después, en tareas concretas</h3>
          <p className="mt-2 text-mute">Situaciones típicas de una gestión manual frente a la gestión centralizada propuesta.</p>
        </Reveal>
        <Reveal delay={0.05} className="panel avoid-break mt-8 overflow-hidden">
          <div className="hidden grid-cols-[1.1fr_1fr_1fr] border-b border-line bg-surface-2 px-6 py-3 md:grid">
            <span className="eyebrow">Tarea</span>
            <span className="eyebrow">Gestión manual</span>
            <span className="eyebrow text-accent">Con el sistema</span>
          </div>
          <ul className="divide-y divide-line">
            {BEFORE_AFTER.map(([task, before, after]) => (
              <li key={task} className="grid gap-2 px-6 py-5 md:grid-cols-[1.1fr_1fr_1fr] md:items-center md:gap-6">
                <span className="font-medium text-ink">{task}</span>
                <span className="text-sm text-dim">
                  <span className="mr-2 font-mono text-[0.68rem] uppercase text-dim md:hidden">Antes</span>
                  {before}
                </span>
                <span className="text-sm text-mute">
                  <span className="mr-2 font-mono text-[0.68rem] uppercase text-accent md:hidden">Después</span>
                  {after}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
