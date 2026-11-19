import { motion } from 'motion/react';
import { Check, FlaskConical } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Tone } from '@/data/proposal';

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

const EASE = [0.16, 1, 0.3, 1] as const;

/** Aparición suave al entrar en pantalla. En impresión se fuerza visible. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className,
  label,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <section id={id} aria-label={label} className={cx('relative py-24 sm:py-32', className)}>
      {children}
    </section>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <Reveal className={cx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <p className={cx('eyebrow flex items-center gap-3', align === 'center' && 'justify-center')}>
        {index && <span className="text-accent">{index}</span>}
        {index && <span aria-hidden className="h-px w-6 bg-line-2" />}
        <span>{eyebrow}</span>
      </p>
      <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[3.15rem]">
        {title}
      </h2>
      {lead && <p className="mt-6 text-pretty text-lg leading-relaxed text-mute">{lead}</p>}
    </Reveal>
  );
}

const TONES: Record<Tone, string> = {
  ok: 'text-ok bg-ok/10 ring-ok/25',
  warn: 'text-warn bg-warn/10 ring-warn/25',
  crit: 'text-crit bg-crit/10 ring-crit/25',
  info: 'text-info bg-info/10 ring-info/25',
  accent: 'text-accent bg-accent/10 ring-accent/25',
  neutral: 'text-mute bg-surface-3 ring-line-2',
};

export function Chip({
  tone = 'neutral',
  children,
  dot,
  className,
  desktopOnly,
}: {
  tone?: Tone;
  children: ReactNode;
  dot?: boolean;
  className?: string;
  desktopOnly?: boolean;
}) {
  return (
    <span
      className={cx(
        desktopOnly ? 'hidden sm:inline-flex' : 'inline-flex',
        'items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        TONES[tone],
        className,
      )}
    >
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

/** Sello que identifica toda maqueta y todo número ficticio. */
export function DemoBadge({ children = 'Maqueta conceptual · datos ficticios', className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-md border border-dashed border-warn/40 bg-warn/[0.06] px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-warn',
        className,
      )}
    >
      <FlaskConical aria-hidden className="size-3" strokeWidth={2} />
      {children}
    </span>
  );
}

export function CheckList({ items, className, tone = 'accent' }: { items: readonly string[]; className?: string; tone?: 'accent' | 'mute' }) {
  return (
    <ul className={cx('grid gap-2.5', className)}>
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-[0.95rem] leading-snug text-mute">
          <span
            aria-hidden
            className={cx(
              'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full',
              tone === 'accent' ? 'bg-accent/12 text-accent' : 'bg-surface-3 text-dim',
            )}
          >
            <Check className="size-3" strokeWidth={2.6} />
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  onClick,
  className,
}: {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  className?: string;
}) {
  const cls = cx(
    'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.95rem] font-medium transition-[background,color,box-shadow,transform] duration-200 active:scale-[0.98]',
    variant === 'primary' &&
      'bg-accent text-accent-ink shadow-[0_0_0_1px_rgb(181_242_91/0.4),0_10px_30px_-10px_rgb(181_242_91/0.5)] hover:bg-[#c5f777]',
    variant === 'secondary' && 'bg-surface-2 text-ink ring-1 ring-line-2 hover:bg-surface-3',
    variant === 'ghost' && 'text-mute hover:text-ink',
    className,
  );
  if (href)
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

/** Marco de "ventana de aplicación" para las maquetas. */
export function Screen({
  title,
  children,
  className,
  actions,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <figure className={cx('screen overflow-hidden', className)} aria-label={`Maqueta conceptual: ${title}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-[5px] bg-accent/15">
            <span className="size-2 rounded-[2px] bg-accent" />
          </span>
          <span className="truncate font-mono text-xs text-dim">
            rincón / <span className="text-mute">{title}</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {actions}
          <span className="hidden sm:block">
            <DemoBadge />
          </span>
        </div>
      </div>
      <div className="px-4 pt-3 sm:hidden">
        <DemoBadge />
      </div>
      {children}
    </figure>
  );
}
