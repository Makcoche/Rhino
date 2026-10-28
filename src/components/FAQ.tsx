import React, { useState } from "react";
import { ChevronDown, MessageSquare, HelpCircle, Edit3 } from "lucide-react";
import { useCMS } from "../context/CMSContext";

interface FAQProps {
  onContactClick: () => void;
  onOpenAdminToFAQ?: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onContactClick, onOpenAdminToFAQ }) => {
  const { data, isAdmin } = useCMS();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#070709] border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-14 text-center sm:text-left">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3 justify-center sm:justify-start">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>RESOLVEMOS TUS DUDAS</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">TRANSPARENCIA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              PREGUNTAS FRECUENTES.
              <span className="block text-gold-gradient">INFORMACIÓN CLARA Y SIN PROMESAS FALSAS.</span>
            </h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
              Respuestas directas con total apego a la etiqueta física del envase y recomendaciones oficiales.
            </p>
          </div>

          {isAdmin && onOpenAdminToFAQ && (
            <button
              onClick={onOpenAdminToFAQ}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20 transition-colors cursor-pointer shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Preguntas</span>
            </button>
          )}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {data.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-neutral-950/90 border border-neutral-800 rounded-xl overflow-hidden transition-colors hover:border-neutral-700"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-white uppercase tracking-wide">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-amber-400/10" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-neutral-300 leading-relaxed border-t border-neutral-900 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Question Footer */}
        <div className="mt-10 text-center p-6 bg-neutral-950/60 border border-neutral-800/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="font-semibold text-sm text-white block">
              ¿Tienes otra duda específica sobre el producto?
            </span>
            <span className="text-xs text-neutral-400 block mt-0.5">
              Nuestro equipo comercial responde directamente en WhatsApp en horario laboral.
            </span>
          </div>

          <button
            onClick={onContactClick}
            className="px-5 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Preguntar por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};
