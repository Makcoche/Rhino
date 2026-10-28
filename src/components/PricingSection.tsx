import React from "react";
import { MessageSquare, Check, Sparkles, HelpCircle, Edit3 } from "lucide-react";
import { useCMS } from "../context/CMSContext";
import { ProductPackageCMS } from "../types/cms";
import { formatCOP } from "../config/product";

interface PricingSectionProps {
  onSelectPackage: (pkg: ProductPackageCMS) => void;
  onOpenAdminToPricing?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPackage,
  onOpenAdminToPricing,
}) => {
  const { data, isAdmin } = useCMS();
  const { pricing } = data;

  return (
    <section id="precios" className="py-16 lg:py-24 bg-[#09090b] border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Admin shortcut */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">
              <span>{pricing.kicker}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">TARIFAS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              {pricing.titleLine1}
              <span className="block text-gold-gradient">{pricing.titleLine2}</span>
            </h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
              {pricing.subtitle}
            </p>
          </div>

          {isAdmin && onOpenAdminToPricing && (
            <button
              onClick={onOpenAdminToPricing}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20 transition-colors cursor-pointer shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modificar Precios y Paquetes</span>
            </button>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricing.packages.map((pkg) => {
            const isCustom = pkg.price === null || pkg.price === undefined;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-2xl p-7 transition-all ${
                  pkg.highlighted
                    ? "bg-neutral-950 border-2 border-amber-400/80 shadow-2xl shadow-amber-500/10 -translate-y-1"
                    : "bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700"
                }`}
              >
                {/* Badge if featured */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-7">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-md">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Card Title & Subtitle */}
                  <div className="mb-4">
                    <h3 className="font-display font-bold text-2xl uppercase tracking-wider text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">{pkg.subtitle}</p>
                  </div>

                  {/* Price display */}
                  <div className="my-6 pb-6 border-b border-neutral-800/80">
                    {isCustom ? (
                      <div className="space-y-1">
                        <span className="block text-xs uppercase tracking-wider text-amber-400 font-semibold">
                          Precio a confirmar
                        </span>
                        <div className="text-xl sm:text-2xl font-display font-bold text-white">
                          Consulta por WhatsApp
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-1">
                          El asesor te confirmará el valor vigente y disponibilidad.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                          Inversión
                        </span>
                        <div className="text-3xl sm:text-4xl font-display font-bold text-white tabular-nums">
                          {formatCOP(pkg.price)}
                        </div>
                        <p className="text-[11px] text-amber-400 mt-1">
                          {pkg.units === 1
                            ? "Por 1 botella de 550 ml"
                            : `Equivalente a ${formatCOP(Math.round((pkg.price || 0) / pkg.units))} por unidad`}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Package breakdown list */}
                  <ul className="space-y-3 text-xs text-neutral-300 mb-8">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{pkg.description}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        {pkg.units * data.servingsPerContainer} porciones totales estimadas (envases sellados)
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Empaque original con sello de seguridad intacto</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Envío asegurado a nivel nacional</span>
                    </li>
                  </ul>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3.5 px-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    pkg.highlighted
                      ? "bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-black hover:brightness-110 shadow-lg shadow-amber-500/20"
                      : "bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/80"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Pedir {pkg.units} {pkg.units === 1 ? "Unidad" : "Unidades"}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Note on wholesale terms */}
        <div className="mt-10 p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{pricing.wholesaleNote}</span>
          </div>
          {isAdmin && (
            <span className="text-[11px] text-amber-400 font-mono">
              Valores editables desde el Panel Admin
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
