import React from "react";
import { Star, ShieldCheck, CheckCircle2, MessageSquare, Edit3 } from "lucide-react";
import { useCMS } from "../context/CMSContext";

interface ReviewsSectionProps {
  onOpenAdminToReviews?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenAdminToReviews }) => {
  const { data, isAdmin } = useCMS();
  const { ratings } = data;

  if (!ratings.enabled) return null;

  return (
    <section id="valoraciones" className="py-16 lg:py-24 bg-[#08080b] border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">
              <span>{ratings.kicker}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">CALIDAD COMPROBADA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              {ratings.title}
              <span className="block text-gold-gradient">SATISFACCIÓN Y CONFIANZA.</span>
            </h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
              {ratings.subtitle}
            </p>
          </div>

          {/* Quick Admin Shortcut if logged in */}
          {isAdmin && onOpenAdminToReviews && (
            <button
              onClick={onOpenAdminToReviews}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20 transition-colors cursor-pointer shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Calificaciones y Reseñas</span>
            </button>
          )}
        </div>

        {/* Global Rating Banner */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-neutral-900 border border-amber-500/30 flex flex-col items-center justify-center shrink-0">
              <span className="font-display font-extrabold text-3xl text-white tabular-nums">
                {ratings.averageScore.toFixed(1)}
              </span>
              <span className="text-[10px] text-amber-400 uppercase font-semibold">de 5.0</span>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="font-semibold text-sm text-white block">
                Calificación destacada por compradores
              </span>
              <span className="text-xs text-neutral-400 block mt-0.5">
                Basado en {ratings.totalReviews} pedidos verificados entregados
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 divide-x divide-neutral-800">
            <div className="text-center px-4">
              <span className="font-display font-bold text-2xl text-white block tabular-nums">
                {ratings.satisfactionRate}%
              </span>
              <span className="text-[11px] text-neutral-400 uppercase tracking-wide">
                Recomendación
              </span>
            </div>
            <div className="text-center pl-6">
              <span className="font-display font-bold text-2xl text-emerald-400 block tabular-nums">
                100%
              </span>
              <span className="text-[11px] text-neutral-400 uppercase tracking-wide">
                Empaque Sellado
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ratings.reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                {/* Stars and verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.verifiedBuyer && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verificado</span>
                    </span>
                  )}
                </div>

                {/* Comment */}
                <p className="text-xs text-neutral-300 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-semibold text-white block">{rev.name}</span>
                  <span className="text-neutral-500 block">{rev.city}</span>
                </div>
                <span className="text-neutral-500 text-[10px]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
