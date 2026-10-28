import React, { useState } from "react";
import { MessageSquare, Menu, X, ShieldAlert, Lock, Settings } from "lucide-react";
import { useCMS } from "../context/CMSContext";

interface HeaderProps {
  onOpenOrder: () => void;
  onOpenChecklist: () => void;
  onOpenLogin: () => void;
  onOpenAdminPanel: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenOrder,
  onOpenChecklist,
  onOpenLogin,
  onOpenAdminPanel,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, isAdmin } = useCMS();

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-red-600 flex items-center justify-center font-display font-bold text-black text-xl tracking-wider shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            IK
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-wider text-white uppercase flex items-center gap-1.5">
              <span>{data.brand}</span>
              <span className="text-amber-400">·</span>
              <span className="text-red-500 font-extrabold">{data.line}</span>
            </span>
            <span className="text-[10px] text-neutral-400 font-medium tracking-wider uppercase -mt-0.5">
              Bebida con Borojó · {data.size}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <a
            href="#presentacion"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#presentacion");
            }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Presentación
          </a>
          <a
            href="#detalles"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#detalles");
            }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Ficha Verificada
          </a>
          <a
            href="#precios"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#precios");
            }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Precios
          </a>
          {data.ratings.enabled && (
            <a
              href="#valoraciones"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#valoraciones");
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Valoraciones
            </a>
          )}
          <a
            href="#como-comprar"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#como-comprar");
            }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Cómo Comprar
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#faq");
            }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Preguntas
          </a>
        </nav>

        {/* Zone 3: Primary Action & Admin */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Admin shortcut button */}
          {isAdmin ? (
            <button
              onClick={onOpenAdminPanel}
              title="Abrir panel de administración"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Panel Admin</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              title="Iniciar sesión de administrador"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin</span>
            </button>
          )}

          <button
            onClick={onOpenChecklist}
            title="Verificar estado de configuración comercial"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Checklist</span>
          </button>

          <button
            onClick={onOpenOrder}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/25 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-black" />
            <span>Pedir por WhatsApp</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e12] border-b border-neutral-800 px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href="#presentacion"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#presentacion");
            }}
            className="block text-sm font-medium text-neutral-200 hover:text-amber-400 py-1"
          >
            Presentación y Empaque
          </a>
          <a
            href="#detalles"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#detalles");
            }}
            className="block text-sm font-medium text-neutral-200 hover:text-amber-400 py-1"
          >
            Ficha Oficial Confirmada
          </a>
          <a
            href="#precios"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#precios");
            }}
            className="block text-sm font-medium text-neutral-200 hover:text-amber-400 py-1"
          >
            Precios y Paquetes
          </a>
          {data.ratings.enabled && (
            <a
              href="#valoraciones"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#valoraciones");
              }}
              className="block text-sm font-medium text-neutral-200 hover:text-amber-400 py-1"
            >
              Valoraciones ({data.ratings.averageScore}★)
            </a>
          )}
          <a
            href="#como-comprar"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#como-comprar");
            }}
            className="block text-sm font-medium text-neutral-200 hover:text-amber-400 py-1"
          >
            Cómo Pedir por WhatsApp
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#faq");
            }}
            className="block text-sm font-medium text-neutral-200 hover:text-amber-400 py-1"
          >
            Preguntas Frecuentes
          </a>

          <div className="pt-3 border-t border-neutral-800/80 flex flex-col gap-2">
            {isAdmin ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminPanel();
                }}
                className="flex items-center justify-center gap-2 text-xs py-2.5 font-bold text-black bg-amber-400 rounded-lg cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Abrir Panel de Administración</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="flex items-center justify-center gap-2 text-xs py-2 text-neutral-300 bg-neutral-900 rounded-md cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Acceder como Administrador</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChecklist();
              }}
              className="flex items-center justify-center gap-2 text-xs py-2 text-neutral-400 bg-neutral-900 rounded-md cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Checklist Comercial de Lanzamiento</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
