import { useState } from 'react';
import { Check, Minus, ShieldCheck, UserCog, UserRound, Users } from 'lucide-react';
import { Screen, cx } from '@/components/ui';

const ROLES = [
  { id: 'admin', icon: ShieldCheck, t: 'Administrador', d: 'Acceso total, configuración y usuarios.' },
  { id: 'enc', icon: UserCog, t: 'Encargado', d: 'Central, compras y transferencias.' },
  { id: 'resp', icon: UserRound, t: 'Responsable de puesto', d: 'Stock y recepciones de su puesto.' },
] as const;
type Role = (typeof ROLES)[number]['id'];

const PERMS: { p: string; r: Record<Role, boolean | 'own'> }[] = [
  { p: 'Ver dashboard general', r: { admin: true, enc: true, resp: false } },
  { p: 'Consultar stock', r: { admin: true, enc: true, resp: 'own' } },
  { p: 'Editar productos, costos y precios', r: { admin: true, enc: false, resp: false } },
  { p: 'Registrar compras e ingresos', r: { admin: true, enc: true, resp: false } },
  { p: 'Crear transferencias', r: { admin: true, enc: true, resp: false } },
  { p: 'Confirmar recepciones', r: { admin: true, enc: true, resp: 'own' } },
  { p: 'Registrar ajustes', r: { admin: true, enc: true, resp: 'own' } },
  { p: 'Ver reportes y valorización', r: { admin: true, enc: false, resp: false } },
  { p: 'Administrar usuarios y roles', r: { admin: true, enc: false, resp: false } },
];

const LOG = [
  ['10:24', 'Encargado Central', 'registró la entrada OC-0311'],
  ['09:42', 'Resp. Puesto 01', 'confirmó la recepción TR-0145'],
  ['09:30', 'Administrador', 'ajustó stock de Servilletas x100 (+6)'],
  ['08:51', 'Administrador', 'modificó el stock mínimo de Pilas AA x4'],
];

export function SecurityDemo() {
  const [role, setRole] = useState<Role>('enc');

  return (
    <Screen title="usuarios y permisos">
      <div className="p-4 sm:p-5">
        <div role="tablist" aria-label="Rol" className="grid gap-2 sm:grid-cols-3">
          {ROLES.map(({ id, icon: I, t, d }) => (
            <button
              key={id}
              role="tab"
              aria-selected={role === id}
              onClick={() => setRole(id)}
              className={cx(
                'rounded-xl p-3 text-left ring-1 transition-colors',
                role === id ? 'bg-surface-3 ring-accent/40' : 'bg-bg-2/60 ring-line hover:ring-line-2',
              )}
            >
              <I className={cx('size-4', role === id ? 'text-accent' : 'text-dim')} strokeWidth={1.7} aria-hidden />
              <span className="mt-2 block text-[0.85rem] font-medium text-ink">{t}</span>
              <span className="block text-[0.7rem] leading-snug text-dim">{d}</span>
            </button>
          ))}
        </div>

        <div className="mt-3 rounded-xl bg-bg-2/60 ring-1 ring-line" role="tabpanel">
          <div className="flex items-center justify-between px-4 pt-3.5 pb-2 text-xs font-medium text-mute">
            Permisos del rol
            <span className="flex items-center gap-3 text-[0.68rem] font-normal text-dim">
              <span className="flex items-center gap-1">
                <Check className="size-3 text-accent" /> permitido
              </span>
              <span className="flex items-center gap-1">
                <Users className="size-3 text-info" /> sólo su puesto
              </span>
            </span>
          </div>
          <ul className="divide-y divide-line">
            {PERMS.map(({ p, r }) => {
              const v = r[role];
              return (
                <li key={p} className="flex items-center justify-between gap-3 px-4 py-2 text-[0.8rem]">
                  <span className={v ? 'text-ink' : 'text-dim'}>{p}</span>
                  <span
                    className={cx(
                      'grid size-6 place-items-center rounded-md transition-colors',
                      v === true ? 'bg-accent/12 text-accent' : v === 'own' ? 'bg-info/12 text-info' : 'bg-surface-3 text-dim',
                    )}
                    aria-label={v === true ? 'Permitido' : v === 'own' ? 'Sólo su puesto' : 'Sin acceso'}
                  >
                    {v === true ? <Check className="size-3.5" /> : v === 'own' ? <Users className="size-3.5" /> : <Minus className="size-3.5" />}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-3 rounded-xl bg-bg-2/60 p-4 ring-1 ring-line">
          <div className="mb-2.5 text-xs font-medium text-mute">Historial de acciones</div>
          <ul className="grid gap-2 text-[0.78rem]">
            {LOG.map(([h, u, a]) => (
              <li key={`${h}${a}`} className="flex gap-3">
                <span className="w-10 shrink-0 font-mono text-[0.7rem] text-dim">{h}</span>
                <span className="text-mute">
                  <span className="text-ink">{u}</span> {a}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Screen>
  );
}
