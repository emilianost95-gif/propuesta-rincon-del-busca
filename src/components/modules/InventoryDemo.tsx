import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Download, FileUp, Search, X } from 'lucide-react';
import { Chip, Screen, cx } from '@/components/ui';
import { DEMO_PRODUCTS, STATUS_META, statusOf, type StockStatus } from '@/data/proposal';
import { ars, n0 } from '@/lib/format';

const CATS = ['Todas', 'Limpieza', 'Bazar', 'Consumo', 'Mercadería'] as const;
const STATES: { id: 'all' | StockStatus | 'alerta'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'ok', label: 'Disponible' },
  { id: 'alerta', label: 'Bajo / crítico' },
  { id: 'agotado', label: 'Agotado' },
];

export function InventoryDemo() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<(typeof CATS)[number]>('Todas');
  const [st, setSt] = useState<(typeof STATES)[number]['id']>('all');
  const [notice, setNotice] = useState<string | null>(null);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DEMO_PRODUCTS.filter((p) => {
      const s = statusOf(p);
      if (cat !== 'Todas' && p.category !== cat) return false;
      if (st === 'alerta' && !(s === 'bajo' || s === 'critico')) return false;
      if (st !== 'all' && st !== 'alerta' && s !== st) return false;
      if (term && !`${p.name} ${p.sku}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [q, cat, st]);

  const flash = (msg: string) => {
    setNotice(msg);
    window.setTimeout(() => setNotice(null), 2600);
  };

  return (
    <Screen title="inventario">
      <div className="p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-medium text-mute">Catálogo de productos</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => flash('Importación desde Excel: se configura según el formato real de las planillas.')}
              className="inline-flex items-center gap-1.5 rounded-md bg-surface-3 px-2.5 py-1 text-[0.72rem] text-mute ring-1 ring-line-2 hover:text-ink"
            >
              <FileUp className="size-3.5" aria-hidden /> Importar Excel
            </button>
            <button
              onClick={() => flash('Exportación: descarga del listado filtrado en formato Excel.')}
              className="inline-flex items-center gap-1.5 rounded-md bg-surface-3 px-2.5 py-1 text-[0.72rem] text-mute ring-1 ring-line-2 hover:text-ink"
            >
              <Download className="size-3.5" aria-hidden /> Exportar
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Buscar producto o SKU</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dim" aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre o SKU… (probá “lim”)"
              className="w-full rounded-lg bg-bg-2 py-2 pl-9 pr-8 text-sm text-ink ring-1 ring-line placeholder:text-dim focus:outline-none focus:ring-accent/60"
            />
            {q && (
              <button
                onClick={() => setQ('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-dim hover:text-ink"
              >
                <X className="size-3.5" />
              </button>
            )}
          </label>
          <label className="sm:w-48">
            <span className="sr-only">Categoría</span>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value as (typeof CATS)[number])}
              className="w-full rounded-lg bg-bg-2 px-3 py-2 text-sm text-ink ring-1 ring-line focus:outline-none focus:ring-accent/60"
            >
              {CATS.map((c) => (
                <option key={c} value={c} className="bg-surface">
                  {c === 'Todas' ? 'Todas las categorías' : c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="no-scrollbar mt-2.5 flex gap-1 overflow-x-auto" role="group" aria-label="Estado de stock">
          {STATES.map((s) => (
            <button
              key={s.id}
              aria-pressed={st === s.id}
              onClick={() => setSt(s.id)}
              className={cx(
                'shrink-0 rounded-full px-3 py-1 text-xs ring-1 transition-colors',
                st === s.id ? 'bg-accent/12 text-accent ring-accent/30' : 'text-dim ring-line hover:text-mute',
              )}
            >
              {s.label}
            </button>
          ))}
          <span className="num ml-auto shrink-0 self-center pl-3 font-mono text-[0.7rem] text-dim">
            {rows.length} de {DEMO_PRODUCTS.length}
          </span>
        </div>

        <div className="scroll-x mt-3 rounded-xl ring-1 ring-line">
          <table className="w-full min-w-[640px] text-left text-[0.8rem]">
            <thead className="bg-bg-2/70 text-[0.68rem] uppercase tracking-wider text-dim">
              <tr>
                <th scope="col" className="px-3 py-2.5 font-medium">SKU</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Producto</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Categoría</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Costo</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Precio</th>
                <th scope="col" className="whitespace-nowrap px-3 py-2.5 text-right font-medium">Stock / mín.</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((p) => {
                  const s = statusOf(p);
                  const meta = STATUS_META[s];
                  return (
                    <tr key={p.sku} className="row-in hover:bg-surface-2/60">
                      <td className="whitespace-nowrap px-3 py-2.5 font-mono text-[0.72rem] text-dim">{p.sku}</td>
                      <td className="px-3 py-2.5 text-ink">{p.name}</td>
                      <td className="px-3 py-2.5 text-mute">{p.category}</td>
                      <td className="num px-3 py-2.5 text-right text-mute">{ars(p.cost)}</td>
                      <td className="num px-3 py-2.5 text-right text-mute">{ars(p.price)}</td>
                      <td className="num whitespace-nowrap px-3 py-2.5 text-right">
                        <span className={cx(s === 'ok' ? 'text-ink' : s === 'bajo' ? 'text-warn' : 'text-crit')}>{n0(p.stock)}</span>
                        <span className="text-dim"> / {n0(p.min)}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <Chip tone={meta.tone} dot>
                          {meta.label}
                        </Chip>
                      </td>
                    </tr>
                  );
                })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-sm text-dim">
                    Sin resultados para ese filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-2 min-h-5 text-xs" aria-live="polite">
          <AnimatePresence>
            {notice && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-accent">
                {notice}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Screen>
  );
}
