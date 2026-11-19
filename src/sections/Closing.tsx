import { ArrowUp, CalendarCheck, FileDown, ListChecks, Rocket } from 'lucide-react';
import { ButtonLink, Reveal } from '@/components/ui';
import { Brand } from '@/components/Nav';
import { PROPOSAL, fmtDate, validUntil } from '@/data/proposal';

const STEPS = [
  { icon: CalendarCheck, t: 'Solicitar reunión', d: 'Recorremos juntos la propuesta y resolvemos dudas.' },
  { icon: ListChecks, t: 'Definir alcance', d: 'Relevamos la operación real y cerramos el alcance funcional.' },
  { icon: Rocket, t: 'Iniciar proyecto', d: 'Arrancamos con la Fase 01 y el cronograma acordado.' },
];

export function Closing() {
  return (
    <section id="cierre" aria-label="Cierre" className="relative overflow-hidden border-t border-line py-28 sm:py-36">
      <div aria-hidden className="decor pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <div className="glow-accent absolute left-1/2 top-1/3 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="shell relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">10 · Próximo paso</p>
          <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-6xl">
            El crecimiento necesita información.
            <span className="block text-dim">La información necesita control.</span>
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-pretty text-lg leading-relaxed text-mute">
            <p>
              El Rincón del Busca cuenta con una operación comercial que merece herramientas capaces de acompañar su
              crecimiento.
            </p>
            <p>
              La propuesta consiste en construir una plataforma personalizada que permita centralizar la información,
              mejorar el control de mercadería, organizar los movimientos y facilitar las decisiones de gestión.
            </p>
            <p className="text-ink">Una solución diseñada alrededor de la operación real del negocio.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-16 max-w-4xl">
          <ol className="grid gap-3 sm:grid-cols-3">
            {STEPS.map(({ icon: I, t, d }, i) => (
              <li key={t} className="panel avoid-break relative p-6 text-left">
                <div className="flex items-center justify-between">
                  <I className="size-5 text-accent" strokeWidth={1.6} aria-hidden />
                  <span className="font-mono text-xs text-dim">0{i + 1}</span>
                </div>
                <p className="mt-5 font-medium text-ink">{t}</p>
                <p className="mt-1.5 text-sm text-dim">{d}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.15} className="mt-14 text-center">
          <p className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Construyamos el sistema de gestión de El Rincón del Busca.
          </p>
          <div className="no-print mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink onClick={() => window.print()}>
              <FileDown className="size-4" aria-hidden /> Guardar propuesta en PDF
            </ButtonLink>
            <ButtonLink href="#inicio" variant="secondary">
              <ArrowUp className="size-4" aria-hidden /> Volver al inicio
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <Brand />
        <div className="max-w-xl text-xs leading-relaxed text-dim md:text-right">
          <p>
            Propuesta comercial · {PROPOSAL.product} para {PROPOSAL.client}. Emitida el {fmtDate(PROPOSAL.issuedAt)} ·
            válida hasta el {fmtDate(validUntil())}. Valores en pesos argentinos.
          </p>
          <p className="mt-2">
            Las pantallas del sistema son maquetas conceptuales con datos ficticios: no representan información real del
            negocio ni un sistema en funcionamiento.
          </p>
        </div>
      </div>
    </footer>
  );
}
