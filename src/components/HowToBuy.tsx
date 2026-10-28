import React from "react";
import { MessageSquare, PackageCheck, Truck, CreditCard, ArrowRight } from "lucide-react";
import { product } from "../config/product";

interface HowToBuyProps {
  onStartOrder: () => void;
}

export const HowToBuy: React.FC<HowToBuyProps> = ({ onStartOrder }) => {
  const steps = [
    {
      number: "01",
      title: "Elige tu cantidad",
      description: "Selecciona si deseas 1 unidad para prueba, packs x 3 para consumo regular o pedido por lotes mayoristas.",
      icon: PackageCheck,
    },
    {
      number: "02",
      title: "Escríbenos a WhatsApp",
      description: "El enlace abre directamente la conversación con el detalle de tu solicitud precargado, sin fricción ni registros.",
      icon: MessageSquare,
    },
    {
      number: "03",
      title: "Confirma precio y destino",
      description: "El asesor te proporciona la tarifa vigente para tu ciudad, costo de envío y medios de pago disponibles.",
      icon: CreditCard,
    },
    {
      number: "04",
      title: "Recibe tu producto sellado",
      description: "Tu pedido se despacha en empaque protegido con guía de rastreo y tiempos de entrega estimados de 24 a 72 horas.",
      icon: Truck,
    },
  ];

  return (
    <section id="como-comprar" className="py-16 lg:py-24 bg-[#08080a] border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">
            <span>PASO A PASO</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">PROCESO DE COMPRA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
            CÓMO ADQUIRIR INKANA BOROJÓ.
            <span className="block text-gold-gradient">ATENCIÓN DIRECTA Y SIN INTERMEDIARIOS.</span>
          </h2>
          <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
            Un proceso ágil y transparente diseñado para responder tus inquietudes de inmediato y garantizar una compra segura.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-all relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-display font-bold text-3xl text-neutral-600 group-hover:text-amber-400 transition-colors tabular-nums">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center gap-1 text-[11px] font-semibold text-neutral-500 group-hover:text-amber-400 transition-colors">
                  <span>Paso {idx + 1} de 4</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment & Logistics Trust Box */}
        <div className="mt-12 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">
              Medios de pago y logística
            </span>
            <h4 className="font-display font-bold text-xl text-white uppercase">
              Transferencias bancarias, Nequi, Daviplata y envíos nacionales
            </h4>
            <p className="text-xs text-neutral-400 max-w-xl">
              Consulta con el asesor si tu municipio califica para entrega contraentrega o despacho prioritario con guía.
            </p>
          </div>

          <button
            onClick={onStartOrder}
            className="px-6 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Iniciar Pedido Ahora
          </button>
        </div>
      </div>
    </section>
  );
};
