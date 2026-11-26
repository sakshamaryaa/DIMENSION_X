import React, { useState } from 'react';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import { ScientificCore3D } from '@/components/three/ScientificCore3D';
import { Badge, Button } from '@/components/ui/Primitives';

export function SecretPage() {
  const quotes = [
    '“Science is a way of thinking much more than it is a body of knowledge.” – Carl Sagan',
    '“The important thing is not to stop questioning.” – Albert Einstein',
    '“We are made of star‑stuff.” – Neil deGrasse Tyson',
  ];
  const [quote, setQuote] = useState<string>();
  const [solar, setSolar] = useState(false);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        solar ? 'bg-[#2b1a0a] text-[#ffb86c]' : 'bg-[#080D18] text-iceWhite'
      }`}
    >
      <h1 className="text-4xl font-extrabold mb-4">
        {solar ? '🌞 Solar Core' : '👾 Secret Unlocked!'} 🎉
      </h1>

      {/* 3‑D core visual */}
      <div className="mb-6">
        <ScientificCore3D className="h-[200px] w-[200px]" />
      </div>

      {/* Quote reveal button */}
      <Button
        size="lg"
        onClick={() => setQuote(quotes[Math.floor(Math.random() * quotes.length)])}
        className="mb-4"
      >
        Reveal a Secret Quote <ArrowRight className="h-4 w-4" />
      </Button>
      {quote && <p className="max-w-xl text-center">{quote}</p>}

      {/* Palette toggle */}
      <Button variant="secondary" size="sm" onClick={() => setSolar(!solar)} className="mt-4">
        {solar ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        {solar ? ' Switch to Nebula' : ' Switch to Solar'}
      </Button>

      {/* Easter‑egg link */}
      <a
        href="https://github.com/sakshamaryaa/DIMENSION_X/tree/main/easter-egg"
        target="_blank"
        className="absolute bottom-4 right-4 opacity-10 hover:opacity-80 transition-opacity"
      >
        ↗︎
      </a>
    </div>
  );
}

