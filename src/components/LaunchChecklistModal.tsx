import React, { useState } from "react";
import { X, CheckCircle2, AlertTriangle, FileCode, Settings } from "lucide-react";
import { useCMS } from "../context/CMSContext";

interface LaunchChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdminPanel: () => void;
}

export const LaunchChecklistModal: React.FC<LaunchChecklistModalProps> = ({
  isOpen,
  onClose,
  onOpenAdminPanel,
}) => {
  const { data, isAdmin } = useCMS();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    5: true, // Medios de pago
    6: true, // Fotografías cargadas
    7: true, // Marca y textos revisados
    10: true, // SEO, responsive y formulario probados
  });

  if (!isOpen) return null;

  const unitPackage = data.pricing.packages.find((p) => p.units === 1);
  const wholesalePackage = data.pricing.packages.find((p) => p.units >= 12);
  const isUnitPriced = unitPackage?.price !== null && unitPackage?.price !== undefined;
  const isWholesalePriced = wholesalePackage?.price !== null && wholesalePackage?.price !== undefined;
  const hasPhone = data.contact.whatsappNumber && data.contact.whatsappNumber.trim().length > 0;

  const checklist = [
    {
      id: 1,
      title: "Precio de venta por unidad confirmado",
      status: isUnitPriced ? "ready" : "pending",
      detail: isUnitPriced
        ? `Configurado en $${unitPackage?.price?.toLocaleString("es-CO")} COP`
        : "Pendiente. Puedes configurarlo directamente en el Panel Admin.",
    },
    {
      id: 2,
      title: "Precio mayorista y cantidades mínimas definidos",
      status: isWholesalePriced ? "ready" : "pending",
      detail: isWholesalePriced
        ? `Configurado en $${wholesalePackage?.price?.toLocaleString("es-CO")} COP`
        : "Pendiente. Se puede acordar directamente por WhatsApp o definir en el panel.",
    },
    {
      id: 3,
      title: "Número de WhatsApp comercial verificado",
      status: hasPhone ? "ready" : "pending",
      detail: hasPhone
        ? `Activo: +${data.contact.whatsappNumber}`
        : "Pendiente. Ingresa tu número en el Panel Admin para activar el botón de chat directo.",
    },
    {
      id: 4,
      title: "Ciudad base, cobertura y costo de fletes",
      status: "ready",
      detail: `${data.contact.salesCity} · ${data.contact.estimatedDeliveryTime}`,
    },
    {
      id: 5,
      title: "Medios de pago disponibles",
      status: "ready",
      detail: data.contact.paymentMethods.join(", "),
    },
    {
      id: 6,
      title: "Fotografías del empaque (locales o subidas desde PC)",
      status: "ready",
      detail: "Fotos en alta resolución con soporte para subir nuevas fotos desde tu PC.",
    },
    {
      id: 7,
      title: "Textos fieles a la etiqueta física",
      status: "ready",
      detail: `${data.brand} · ${data.line} · ${data.denomination} · ${data.size}`,
    },
    {
      id: 8,
      title: "Valoración y reseñas de clientes",
      status: data.ratings.enabled ? "ready" : "info",
      detail: data.ratings.enabled
        ? `${data.ratings.averageScore}★ (${data.ratings.totalReviews} reseñas activas)`
        : "Bloque de valoraciones oculto.",
    },
    {
      id: 9,
      title: "Etiqueta completa con ingredientes y registro sanitario",
      status: "pending",
      detail: "Revisar la tabla física del fabricante antes de hacer pauta publicitaria.",
    },
    {
      id: 10,
      title: "SEO, accesibilidad y navegación mobile-first",
      status: "ready",
      detail: "Metadatos listos, contraste WCAG AA, botón sticky móvil y acordeón accesible.",
    },
  ];

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-neutral-950 border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
          <div>
            <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white flex items-center gap-2">
              <span>Checklist de Lanzamiento Comercial</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Guía técnica para el titular del producto antes de salir a ventas públicas.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-200 leading-relaxed flex items-center justify-between gap-3">
            <div>
              <span className="font-bold text-amber-300 block mb-0.5">
                ¿Deseas modificar precios, textos o fotos?
              </span>
              Puedes cambiarlos al instante con tu clave de administrador en el Panel de Edición.
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenAdminPanel();
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-400 text-black hover:bg-amber-300 transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              Abrir Panel Admin
            </button>
          </div>

          <div className="space-y-3">
            {checklist.map((item) => {
              const isChecked = checkedItems[item.id] || item.status === "ready";
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? "bg-neutral-900/40 border-neutral-800 hover:border-neutral-700"
                      : "bg-amber-950/20 border-amber-500/30"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className={`text-xs font-semibold block ${isChecked ? "text-neutral-200" : "text-amber-200"}`}>
                      {item.title}
                    </span>
                    <span className="text-[11px] text-neutral-400 block mt-0.5">
                      {item.detail}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded shrink-0 ${
                    item.status === "ready"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : item.status === "pending"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}>
                    {item.status === "ready" ? "Listo" : item.status === "pending" ? "Pendiente" : "Info"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <span className="text-xs text-neutral-500">
            {data.brand} {data.line} · Panel de Verificación
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
