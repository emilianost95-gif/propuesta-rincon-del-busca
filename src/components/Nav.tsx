import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { FileDown, Menu, X } from 'lucide-react';
import { cx } from './ui';

export const NAV_ITEMS = [
  { id: 'desafio', label: 'Desafío' },
  { id: 'solucion', label: 'Solución' },
  { id: 'modulos', label: 'Módulos' },
  { id: 'beneficios', label: 'Beneficios' },
  { id: 'implementacion', label: 'Implementación' },
  { id: 'inversion', label: 'Inversión' },
  { id: 'retorno', label: 'Retorno' },
  { id: 'alcance', label: 'Alcance' },
] as const;
const NAV_IDS = NAV_ITEMS.map((i) => i.id);

export function useActiveSection(ids: readonly string[], rootMargin = '-40% 0px -55% 0px') {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, rootMargin]);
  return active;
}

export function Brand({ compact }: { compact?: boolean }) {
  return (
    <a href="#inicio" className="flex items-center gap-3 rounded-lg" aria-label="El Rincón del Busca — volver al inicio">
      <span aria-hidden className="grid size-8 shrink-0 grid-cols-2 gap-[3px] rounded-[9px] bg-surface-2 p-[7px] ring-1 ring-line-2">
        <span className="rounded-[2px] bg-accent" />
        <span className="rounded-[2px] bg-accent" />
        <span className="rounded-[2px] bg-accent" />
        <span className="rounded-[2px] bg-accent/35" />
      </span>
      <span className="leading-none">
        <span className="block text-[0.82rem] font-semibold tracking-[0.08em] text-ink">EL RINCÓN DEL BUSCA</span>
        {!compact && <span className="mt-1 block font-mono text-[0.65rem] tracking-[0.1em] text-dim">PROPUESTA · SISTEMA DE GESTIÓN</span>}
      </span>
    </a>
  );
}

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const active = useActiveSection(NAV_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50">
      <div
        className={cx(
          'transition-[background,border-color] duration-300',
          scrolled || open ? 'glass border-x-0 border-t-0' : 'border-b border-transparent',
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Brand compact={false} />
          <nav aria-label="Secciones de la propuesta" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((it) => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    aria-current={active === it.id ? 'true' : undefined}
                    className={cx(
                      'relative rounded-full px-3 py-1.5 text-sm transition-colors',
                      active === it.id ? 'text-ink' : 'text-dim hover:text-mute',
                    )}
                  >
                    {active === it.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-3 ring-1 ring-line-2"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="hidden items-center gap-2 rounded-full bg-surface-2 px-4 py-2 text-sm text-ink ring-1 ring-line-2 transition-colors hover:bg-surface-3 sm:inline-flex"
            >
              <FileDown className="size-4" aria-hidden />
              Guardar PDF
            </button>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full bg-surface-2 ring-1 ring-line-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Secciones" className="shell pb-5 lg:hidden">
            <ul className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((it, i) => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    onClick={() => setOpen(false)}
                    className={cx(
                      'flex items-center gap-3 rounded-xl px-3 py-3 text-[0.95rem] ring-1 ring-line',
                      active === it.id ? 'bg-surface-3 text-ink' : 'bg-surface text-mute',
                    )}
                  >
                    <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, '0')}</span>
                    {it.label}
                  </a>
                </li>
              ))}
              <li className="col-span-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    window.print();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-3 py-3 font-medium text-accent-ink"
                >
                  <FileDown className="size-4" aria-hidden /> Guardar o imprimir en PDF
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
