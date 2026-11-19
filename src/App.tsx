import { MotionConfig } from 'motion/react';
import { Nav } from '@/components/Nav';
import { Hero } from '@/sections/Hero';
import { Challenge } from '@/sections/Challenge';
import { Solution } from '@/sections/Solution';
import { Modules } from '@/sections/Modules';
import { Benefits } from '@/sections/Benefits';
import { Roadmap } from '@/sections/Roadmap';
import { Investment } from '@/sections/Investment';
import { Roi } from '@/sections/Roi';
import { Future, Scope } from '@/sections/Scope';
import { Closing, Footer } from '@/sections/Closing';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#desafio"
        className="no-print sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Saltar al contenido
      </a>
      <Nav />
      <main>
        <Hero />
        <Challenge />
        <Solution />
        <Modules />
        <Benefits />
        <Roadmap />
        <Investment />
        <Roi />
        <Scope />
        <Future />
        <Closing />
      </main>
      <Footer />
    </MotionConfig>
  );
}
