import React from "react";

interface BotaoAcaoProps {
  texto: string;
  cor: string; // define a cor de fundo
  icone?: React.ReactNode; // pode ser qualquer ícone (Lucide, SVG, etc)
  onClick: (() => void) | undefined;
};

export function BotaoAcao({ texto, cor, icone, onClick }: BotaoAcaoProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md ${cor}`}
    >
      {icone && <span>{icone}</span>}
      <span>{texto}</span>
    </button>
  );
}
     