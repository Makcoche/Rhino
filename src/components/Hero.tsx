import React, { useRef } from "react";
import { MessageSquare, ArrowDown, ShieldCheck, CheckCircle2, Upload, Edit3 } from "lucide-react";
import { useCMS } from "../context/CMSContext";

interface HeroProps {
  onOrderClick: () => void;
  onExploreClick: () => void;
  onOpenAdminToHero?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOrderClick,
  onExploreClick,
  onOpenAdminToHero,
}) => {
  const { data, isAdmin, processImageFile, updateData } = useCMS();
  const { hero } = data;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processImageFile(file);
      updateData((prev) => ({
        ...prev,
        hero: { ...prev.hero, image: dataUrl },
      }));
    } catch (err) {
      alert("Error al cargar la imagen: " + (err as Error).message);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-neutral-800/80">
      {/* Hidden file input for quick image upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleHeroImageUpload}
        className="hidden"
      />

      {/* Background radial atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[400px] bg-red-600/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition & Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4">
              <span>{hero.kicker}</span>
              {isAdmin && onOpenAdminToHero && (
                <button
                  onClick={onOpenAdminToHero}
                  className="ml-2 text-neutral-400 hover:text-amber-300 p-1 rounded hover:bg-neutral-900 cursor-pointer"
                  title="Editar textos del Hero"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight uppercase text-white leading-[1.05] text-balance mb-5">
              {hero.titleLine1}
              <span className="block mt-2 text-gold-gradient">
                {hero.titleLine2}
              </span>
            </h1>

            {/* Master Body Copy */}
            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed mb-8">
              {hero.body}
            </p>

            {/* Primary Action Button & Reassurance */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                onClick={onOrderClick}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-base sm:text-lg tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-amber-500/25 cursor-pointer whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-5 h-5 fill-black" />
                <span>{hero.ctaPrimary}</span>
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{hero.ctaSecondary}</span>
                <ArrowDown className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Reassurance text */}
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{hero.reassuranceText}</span>
            </div>

            {/* Verified packaging strip */}
            <div className="mt-10 pt-6 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="block text-xs uppercase tracking-wider text-neutral-500 font-medium">Contenido Neto</span>
                <span className="font-display text-lg font-bold text-white tracking-wide">{data.size}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-neutral-500 font-medium">Rendimiento</span>
                <span className="font-display text-lg font-bold text-white tracking-wide">{data.servingsPerContainer} Porciones</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-neutral-500 font-medium">Base</span>
                <span className="font-display text-lg font-bold text-amber-400 tracking-wide">Agua con Borojó</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-neutral-500 font-medium">Normativa</span>
                <span className="font-display text-sm font-bold text-neutral-300 tracking-wide">Sello Minsalud</span>
              </div>
            </div>
          </div>

          {/* Right Column: Original Product Photo Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              {/* Gold frame halo glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-red-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

              <div className="relative bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
                {/* Product image container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 flex items-center justify-center p-3">
                  <img
                    src={hero.image}
                    alt={`${data.brand} ${data.line} Borojó - Empaque de ${data.size}`}
                    className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />

                  {/* Admin Quick Upload Button Overlay */}
                  {isAdmin && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute top-4 left-4 bg-amber-400 hover:bg-amber-300 text-black px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1.5 cursor-pointer z-10 transition-transform active:scale-95"
                      title="Subir foto para el Hero desde tu PC"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Cambiar foto (PC)</span>
                    </button>
                  )}

                  {/* Official Octagon Badge overlay tag */}
                  <div className="absolute top-4 right-4 bg-black/90 border border-neutral-600 rounded-lg p-2 text-center backdrop-blur-sm shadow-lg max-w-[120px]">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-white leading-tight">
                      CONTIENE EDULCORANTES
                    </span>
                    <span className="block text-[8px] text-neutral-400 mt-0.5 uppercase">
                      MINSALUD
                    </span>
                  </div>

                  {/* Packaging label strip at the bottom of the card */}
                  <div className="absolute bottom-3 inset-x-3 bg-neutral-950/90 border border-neutral-800 rounded-xl p-3 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <span className="block text-[11px] font-bold text-white uppercase tracking-wider">
                        {data.brand} · {data.line}
                      </span>
                      <span className="block text-[10px] text-amber-400">
                        {data.denomination}
                      </span>
                    </div>
                    <span className="font-display font-bold text-sm bg-amber-400/10 text-amber-400 px-2.5 py-1 rounded-md border border-amber-400/20">
                      {data.size}
                    </span>
                  </div>
                </div>

                {/* Subtitle caption */}
                <div className="p-4 bg-neutral-900/60 border-t border-neutral-800/80 text-xs text-neutral-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Fotografía del empaque
                  </span>
                  <span className="text-[11px] text-neutral-500">{data.servingsPerContainer} porciones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
