// Copia la build (dist/) a la raíz del repo para GitHub Pages en modo "Deploy from a branch".
import { cpSync, existsSync, renameSync, rmSync, writeFileSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url);
const root = new URL('../', import.meta.url);

renameSync(new URL('dev.html', dist), new URL('index.html', dist));
rmSync(new URL('assets', root), { recursive: true, force: true });
cpSync(new URL('assets', dist), new URL('assets', root), { recursive: true });
cpSync(new URL('index.html', dist), new URL('index.html', root));
if (existsSync(new URL('favicon.svg', dist))) cpSync(new URL('favicon.svg', dist), new URL('favicon.svg', root));
writeFileSync(new URL('.nojekyll', root), '');
console.log('Build copiada a la raíz: index.html, assets/, favicon.svg');
