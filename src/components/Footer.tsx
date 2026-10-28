import React from "react";
import { MessageSquare, ShieldCheck, FileText, Lock, Settings } from "lucide-react";
import { useCMS } from "../context/CMSContext";

interface FooterProps {
  onOpenChecklist: () => void;
  onOrderClick: () => void;
  onOpenLogin: () => void;
  onOpenAdminPanel: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenChecklist,
  onOrderClick,
  onOpenLogin,
  onOpenAdminPanel,
}) => {
  const { data, isAdmin } = useCMS();

  return (
    <footer className="bg-[#050507] border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center font-display font-bold text-black text-lg">
                IK
              </div>
              <span className="font-display font-bold text-lg text-white uppercase tracking-wider">
                {data.brand} · {data.line}
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Bebida a base de agua con borojó en presentación de {data.size} con {data.servingsPerContainer} porciones. Identidad y envase fiel al diseño original.
            </p>
            <div className="pt-2 text-[11px] text-neutral-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Etiqueta física reglamentaria con sello de edulcorantes</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="block font-display font-bold text-xs uppercase tracking-wider text-white">
              Navegación
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#presentacion" className="hover:text-amber-400 transition-colors">
                  Presentación y Empaque
                </a>
              </li>
              <li>
                <a href="#detalles" className="hover:text-amber-400 transition-colors">
                  Ficha Técnica Verificada
                </a>
              </li>
              <li>
                <a href="#precios" className="hover:text-amber-400 transition-colors">
                  Precios y Paquetes
                </a>
              </li>
              {data.ratings.enabled && (
                <li>
                  <a href="#valoraciones" className="hover:text-amber-400 transition-colors">
                    Valoraciones de Clientes
                  </a>
                </li>
              )}
              <li>
                <a href="#como-comprar" className="hover:text-amber-400 transition-colors">
                  Cómo Comprar por WhatsApp
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Commercial & Technical Configuration */}
          <div className="md:col-span-4 space-y-3">
            <span className="block font-display font-bold text-xs uppercase tracking-wider text-white">
              Administración Comercial
            </span>
            <p className="text-xs text-neutral-400">
              Modifica textos, precios, fotos desde tu PC y valoraciones con tu usuario y contraseña.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              {isAdmin ? (
                <button
                  onClick={onOpenAdminPanel}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-400 text-black font-semibold text-xs transition-colors cursor-pointer text-left shadow-sm"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Abrir Panel de Edición CMS</span>
                </button>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-neutral-800 text-xs transition-colors cursor-pointer text-left"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Ingresar como Administrador</span>
                </button>
              )}

              <button
                onClick={onOpenChecklist}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs transition-colors cursor-pointer text-left"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Revisar Checklist de Publicación</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 text-[11px] text-neutral-400 leading-relaxed space-y-1 mb-8">
          <span className="font-semibold text-neutral-300 block uppercase tracking-wider text-[10px]">
            Aviso de Transparencia Comercial y Regulatorio
          </span>
          <p>{data.footer.legalNotice}</p>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} {data.brand} · Línea {data.line}. {data.footer.rightsText}
          </div>
          <div className="flex items-center gap-4">
            <span>Diseño fiel al empaque original</span>
            <span>·</span>
            <span>Panel CMS con clave admin</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
