import React from "react";
import { MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { useCMS } from "../context/CMSContext";

interface FinalCTAProps {
  onOrderClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOrderClick }) => {
  const { data } = useCMS();
  const { finalCTA } = data;

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-neutral-950 border-b border-neutral-800">
      {/* Background radial gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-amber-500/15 via-red-600/10 to-amber-500/15 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{finalCTA.badge}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase text-white tracking-tight leading-tight">
          {finalCTA.titleLine1}
          <span className="block text-gold-gradient mt-2">
            {finalCTA.titleLine2}
          </span>
        </h2>

        <p className="mt-5 text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {finalCTA.subtitle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOrderClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-bold text-base sm:text-lg uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-3 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 fill-black" />
            <span>{finalCTA.buttonText}</span>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Atención rápida · Despacho en empaque sellado original</span>
        </div>
      </div>
    </section>
  );
};
