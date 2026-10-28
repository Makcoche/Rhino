import React, { useState, useRef } from "react";
import { ZoomIn, Eye, ShieldCheck, Upload, Sparkles, Check, Info, Edit3 } from "lucide-react";
import { useCMS } from "../context/CMSContext";

interface ProductPresentationProps {
  onOpenAdminToPresentation?: () => void;
}

export const ProductPresentation: React.FC<ProductPresentationProps> = ({
  onOpenAdminToPresentation,
}) => {
  const { data, isAdmin, processImageFile, updateData } = useCMS();
  const { presentation } = data;
  const [selectedImage, setSelectedImage] = useState<"hero" | "detail">("hero");
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const fileInputHeroRef = useRef<HTMLInputElement>(null);
  const fileInputDetailRef = useRef<HTMLInputElement>(null);

  const imagesList = [
    {
      id: "hero" as const,
      src: presentation.imageHero,
      title: presentation.imageHeroTitle,
      description: presentation.imageHeroDesc,
    },
    {
      id: "detail" as const,
      src: presentation.imageDetail,
      title: presentation.imageDetailTitle,
      description: presentation.imageDetailDesc,
    },
  ];

  const currentImg = imagesList.find((i) => i.id === selectedImage) || imagesList[0];

  const handleUploadGallery = async (e: React.ChangeEvent<HTMLInputElement>, slot: "hero" | "detail") => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processImageFile(file);
      updateData((prev) => ({
        ...prev,
        presentation: {
          ...prev.presentation,
          [slot === "hero" ? "imageHero" : "imageDetail"]: dataUrl,
        },
      }));
    } catch (err) {
      alert("Error al procesar imagen: " + (err as Error).message);
    }
  };

  return (
    <section id="presentacion" className="py-16 lg:py-24 bg-[#070709] border-b border-neutral-800 scroll-mt-20">
      <input
        type="file"
        ref={fileInputHeroRef}
        accept="image/*"
        onChange={(e) => handleUploadGallery(e, "hero")}
        className="hidden"
      />
      <input
        type="file"
        ref={fileInputDetailRef}
        accept="image/*"
        onChange={(e) => handleUploadGallery(e, "detail")}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">
              <span>{presentation.kicker}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">EMPAQUE Y DETALLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              {presentation.titleLine1}
              <span className="block text-gold-gradient">{presentation.titleLine2}</span>
            </h2>
            <p className="mt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              {presentation.body}
            </p>
          </div>

          {isAdmin && onOpenAdminToPresentation && (
            <button
              onClick={onOpenAdminToPresentation}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20 transition-colors cursor-pointer shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Fotos y Ficha</span>
            </button>
          )}
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Photography Viewer */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden group">
              <div className="relative aspect-[4/5] bg-neutral-900/90 flex items-center justify-center p-4">
                <img
                  src={currentImg.src}
                  alt={currentImg.title}
                  className="w-full h-full object-contain filter drop-shadow-xl transition-all duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Admin Quick Upload from PC directly over current photo */}
                {isAdmin && (
                  <button
                    onClick={() => {
                      if (selectedImage === "hero") fileInputHeroRef.current?.click();
                      else fileInputDetailRef.current?.click();
                    }}
                    className="absolute top-4 left-4 bg-amber-400 hover:bg-amber-300 text-black px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1.5 cursor-pointer z-10"
                    title="Subir nueva foto para esta vista desde tu PC"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Cambiar esta foto (PC)</span>
                  </button>
                )}

                {/* Interactive Zoom overlay button */}
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-4 right-4 bg-black/80 hover:bg-black text-white p-2.5 rounded-xl border border-neutral-700/80 backdrop-blur-sm transition-all flex items-center gap-2 text-xs font-medium cursor-pointer shadow-lg"
                  title="Ampliar fotografía"
                >
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                  <span>Inspeccionar detalle</span>
                </button>
              </div>

              {/* Caption banner */}
              <div className="p-4 bg-neutral-900/90 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-white">{currentImg.title}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{currentImg.description}</p>
                </div>
                <span className="text-[11px] font-mono text-amber-400/90 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20 shrink-0">
                  {currentImg.src.startsWith("data:") ? "Personalizada" : "Original"}
                </span>
              </div>
            </div>

            {/* Thumbnail switcher buttons */}
            <div className="grid grid-cols-2 gap-3">
              {imagesList.map((img) => {
                const isActive = selectedImage === img.id;
                return (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-neutral-900 border-amber-400/60 shadow-md shadow-amber-500/10"
                        : "bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700"
                    }`}
                  >
                    <div className="w-12 h-14 bg-neutral-900 rounded-lg overflow-hidden shrink-0 border border-neutral-800 flex items-center justify-center p-1">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white uppercase">{img.title}</span>
                      <span className="text-[11px] text-neutral-400">Ver fotografía</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Confirmed Physical Packaging Specifications */}
          <div id="detalles" className="lg:col-span-6 space-y-6 scroll-mt-24">
            <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                    Ficha Técnica Confirmada
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Datos visibles y corroborados en las fotografías oficiales del empaque.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
              </div>

              {/* Specs list */}
              <div className="mt-6 divide-y divide-neutral-800/80 space-y-3">
                {presentation.specs.map((spec, index) => (
                  <div key={index} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-neutral-400 shrink-0">
                      {spec.label}
                    </span>
                    <div className="text-left sm:text-right">
                      <span className="font-semibold text-sm text-white block">
                        {spec.value}
                      </span>
                      <span className="text-[11px] text-neutral-400 block mt-0.5">
                        {spec.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transparent Regulatory Disclaimer */}
              <div className="mt-8 p-4 rounded-xl bg-neutral-900/70 border border-amber-400/20 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-300 leading-relaxed">
                  <span className="font-semibold text-white block mb-0.5">
                    {presentation.disclaimerTitle}
                  </span>
                  {presentation.disclaimerText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-neutral-950 border border-neutral-700 rounded-2xl p-4 overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 z-10 bg-neutral-900/90 hover:bg-neutral-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-700 cursor-pointer"
            >
              Cerrar (Esc)
            </button>
            <div className="w-full flex-1 flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src={currentImg.src}
                alt={currentImg.title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-neutral-400 mt-3 text-center">
              {currentImg.title} · {presentation.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
