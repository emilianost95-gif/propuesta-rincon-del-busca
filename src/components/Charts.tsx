import { motion } from 'motion/react';
import { useId } from 'react';
import { n0 } from '@/lib/format';

type Point = { d: string; in: number; out: number; tr: number };

const smooth = (pts: [number, number][]) => {
  if (pts.length < 2) return '';
  let d = `M${pts[0]![0]},${pts[0]![1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]!;
    const [x1, y1] = pts[i]!;
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
};

/** Gráfico de líneas de movimientos (entradas / salidas / transferencias). */
export function MovementsChart({
  data,
  height = 180,
  showAxis = true,
  series = ['in', 'out', 'tr'],
}: {
  data: Point[];
  height?: number;
  showAxis?: boolean;
  series?: ('in' | 'out' | 'tr')[];
}) {
  const id = useId().replace(/:/g, '');
  const W = 600;
  const H = height;
  const pad = { t: 12, b: showAxis ? 22 : 6, l: 4, r: 4 };
  const max = Math.max(...data.flatMap((p) => series.map((s) => p[s]))) * 1.12;
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / Math.max(1, data.length - 1);
  const y = (v: number) => pad.t + (1 - v / max) * (H - pad.t - pad.b);

  const META = {
    in: { color: 'var(--color-accent)', label: 'Entradas' },
    out: { color: 'var(--color-info)', label: 'Salidas' },
    tr: { color: 'var(--color-warn)', label: 'Transferencias' },
  } as const;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Gráfico ficticio de movimientos diarios">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={0} x2={W} y1={pad.t + f * (H - pad.t - pad.b)} y2={pad.t + f * (H - pad.t - pad.b)} stroke="var(--color-line)" strokeDasharray="2 4" />
      ))}
      {series.map((s) => {
        const pts = data.map((p, i) => [x(i), y(p[s])] as [number, number]);
        const line = smooth(pts);
        return (
          <g key={s}>
            {s === 'in' && (
              <motion.path
                data-anim
                d={`${line} L${x(data.length - 1)},${H - pad.b} L${x(0)},${H - pad.b} Z`}
                fill={`url(#g-${id})`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            )}
            <motion.path
              data-anim
              d={line}
              fill="none"
              stroke={META[s].color}
              strokeWidth={s === 'in' ? 2.2 : 1.6}
              strokeLinecap="round"
              opacity={s === 'in' ? 1 : 0.85}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </g>
        );
      })}
      {showAxis &&
        data.map((p, i) => (
          <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="var(--color-dim)" fontFamily="var(--font-mono)">
            {p.d}
          </text>
        ))}
    </svg>
  );
}

export function ChartLegend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {items.map((it) => (
        <li key={it.label} className="flex items-center gap-1.5 text-xs text-dim">
          <span aria-hidden className="h-0.5 w-3 rounded-full" style={{ background: it.color }} />
          {it.label}
        </li>
      ))}
    </ul>
  );
}

/** Barras horizontales simples. */
export function HBars({ rows, unit = 'u.' }: { rows: { label: string; value: number; tone?: string }[]; unit?: string }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <ul className="grid gap-3">
      {rows.map((r, i) => (
        <li key={r.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="text-mute">{r.label}</span>
            <span className="num font-mono text-xs text-dim">
              {n0(r.value)} {unit}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-3">
            <motion.div
              data-anim
              className="h-full rounded-full"
              style={{ background: r.tone ?? 'var(--color-accent)', width: `${(r.value / max) * 100}%` }}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
