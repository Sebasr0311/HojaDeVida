"use client";

import { LightboxProvider } from "@/components/media";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Saed } from "@/components/sections/Saed";
import { MobileCommerce } from "@/components/sections/MobileCommerce";
import { Projects } from "@/components/sections/Projects";
import { Contact, Journey, Stack } from "@/components/sections/StackJourneyContact";

export function PortfolioPage() {
  return (
    <LightboxProvider>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <Saed />
        <MobileCommerce />
        <Projects />
        <Stack />
        <Journey />
        <Contact />
      </main>
    </LightboxProvider>
  );
}
