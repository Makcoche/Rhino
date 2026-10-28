import React from "react";
import { MessageSquare } from "lucide-react";
import { useCMS } from "../context/CMSContext";
import { formatCOP } from "../config/product";

interface MobileStickyBarProps {
  onOrderClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOrderClick }) => {
  const { data } = useCMS();
  const basePackage = data.pricing.packages.find((p) => p.units === 1);
  const priceDisplay = basePackage?.price !== null && basePackage?.price !== undefined
    ? `Desde ${formatCOP(basePackage.price)}`
    : `${data.size} · Consulta precio`;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#09090c]/95 border-t border-neutral-800 backdrop-blur-md px-4 py-2.5 shadow-2xl">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
            {data.brand} {data.line}
          </span>
          <span className="text-xs font-semibold text-white truncate max-w-[140px]">
            {priceDisplay}
          </span>
        </div>

        <button
          onClick={onOrderClick}
          className="flex-1 py-2.5 px-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 whitespace-nowrap cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 fill-black" />
          <span>Pedir por WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
