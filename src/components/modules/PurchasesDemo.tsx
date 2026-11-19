import { useState } from 'react';
import { Building2, FileText, Lightbulb } from 'lucide-react';
import { Chip, Screen, cx } from '@/components/ui';
import { ars } from '@/lib/format';

const SUPPLIERS = [
  {
    id: 'a',
    name: 'Proveedor A',
    cat: 'Limpieza',
    orders: [
      { code: 'OC-0311', date: '19/11', items: 6, total: 486000, st: 'Ingresada' },
      { code: 'OC-0296', date: '05/11', items: 9, total: 712500, st: 'Ingresada' },
    ],
  },
  {
    id: 'b',
    name: 'Proveedor B',
    cat: 'Bazar',
    orders: [
      { code: 'OC-0308', date: '15/11', items: 4, total: 318400, st: 'Parcial' },
      { code: 'OC-0287', date: '28/10', items: 7, total: 541200, st: 'Ingresada' },
    ],
  },
  {
    id: 'c',
    name: 'Proveedor C',
    cat: 'Consumo',
    orders: [{ code: 'OC-0314', date: '20/11', items: 5, total: 274900, st: 'Pendiente' }],
  },
];

const SUGGEST = [
  { n: 'Limpiador multiuso 900 ml', s: 12, m: 50, q: 60, p: 'Proveedor A' },
  { n: 'Esponja doble faz x3', s: 18, m: 60, q: 72, p: 'Proveedor A' },
  { n: 'Recipiente hermético 1,5 L', s: 0, m: 25, q: 36, p: 'Proveedor B' },
  { n: 'Rollo de cocina x3', s: 75, m: 90, q: 48, p: 'Proveedor C' },
];

export function PurchasesDemo() {
  const [sel, setSel] = useState('a');
  const sup = SUPPLIERS.find((s) => s.id === sel) ?? SUPPLIERS[0]!;

  return (
    <Screen title="compras">
      <div className="grid gap-3 p-4 sm:p-5 md:grid-cols-5">
        <div className="rounded-xl bg-bg-2/60 p-3 ring-1 ring-line md:col-span-2">
          <div className="px-1 pb-2 text-xs font-medium text-mute">Proveedores</div>
          <ul className="grid gap-1" role="listbox" aria-label="Proveedores">
            {SUPPLIERS.map((s) => (
              <li key={s.id}>
                <button
                  role="option"
                  aria-selected={s.id === sel}
                  onClick={() => setSel(s.id)}
                  className={cx(
                    'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors',
                    s.id === sel ? 'bg-surface-3 ring-1 ring-line-2' : 'hover:bg-surface-2',
                  )}
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-2 ring-1 ring-line">
                    <Building2 className={cx('size-4', s.id === sel ? 'text-accent' : 'text-dim')} strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.82rem] text-ink">{s.name}</span>
                    <span className="block text-[0.7rem] text-dim">{s.cat}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-bg-2/60 p-4 ring-1 ring-line md:col-span-3">
          <div className="flex items-center justify-between text-xs font-medium text-mute">
            Historial de compras · {sup.name}
          </div>
          <ul className="mt-3 grid gap-2">
            {sup.orders.map((o) => (
              <li key={o.code} className="flex items-center gap-3 rounded-lg bg-surface-2 px-3 py-2.5 ring-1 ring-line">
                <FileText className="size-4 shrink-0 text-dim" strokeWidth={1.6} aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.8rem] text-ink">
                    <span className="font-mono text-dim">{o.code}</span> · {o.items} productos
                  </span>
                  <span className="block text-[0.7rem] text-dim">Fecha {o.date} · factura adjunta</span>
                </span>
                <span className="num text-right text-[0.8rem] text-ink">{ars(o.total)}</span>
                <Chip tone={o.st === 'Ingresada' ? 'ok' : o.st === 'Parcial' ? 'warn' : 'neutral'} desktopOnly>
                  {o.st}
                </Chip>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-bg-2/60 ring-1 ring-line md:col-span-5">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-3.5 pb-2">
            <span className="flex items-center gap-2 text-xs font-medium text-mute">
              <Lightbulb className="size-3.5 text-accent" aria-hidden /> Reposición sugerida
            </span>
            <span className="text-[0.68rem] text-dim">Regla: stock por debajo del mínimo configurado</span>
          </div>
          <div className="scroll-x">
            <table className="w-full min-w-[520px] text-left text-[0.78rem]">
              <thead className="text-[0.66rem] uppercase tracking-wider text-dim">
                <tr>
                  <th scope="col" className="px-4 py-2 font-medium">Producto</th>
                  <th scope="col" className="px-4 py-2 text-right font-medium">Stock / mín.</th>
                  <th scope="col" className="px-4 py-2 text-right font-medium">Sugerido</th>
                  <th scope="col" className="px-4 py-2 font-medium">Proveedor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {SUGGEST.map((r) => (
                  <tr key={r.n}>
                    <td className="px-4 py-2.5 text-ink">{r.n}</td>
                    <td className="num px-4 py-2.5 text-right">
                      <span className={r.s === 0 ? 'text-crit' : 'text-warn'}>{r.s}</span>
                      <span className="text-dim"> / {r.m}</span>
                    </td>
                    <td className="num px-4 py-2.5 text-right font-medium text-accent">+{r.q}</td>
                    <td className="px-4 py-2.5 text-mute">{r.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Screen>
  );
}
