import React from "react";
import { Settings, Lock, Unlock, Upload, Star, DollarSign, LogOut } from "lucide-react";
import { useCMS } from "../context/CMSContext";

interface AdminFloatingBarProps {
  onOpenLogin: () => void;
  onOpenAdminPanel: (tab?: string) => void;
}

export const AdminFloatingBar: React.FC<AdminFloatingBarProps> = ({
  onOpenLogin,
  onOpenAdminPanel,
}) => {
  const { isAdmin, logout } = useCMS();

  if (isAdmin) {
    return (
      <div className="fixed top-18 right-4 z-40 bg-neutral-950/95 border border-amber-400/60 rounded-2xl p-2 shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
        <div className="flex items-center gap-1.5 pl-2 pr-1">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider hidden sm:inline">
            Modo Admin Activo
          </span>
        </div>

        <button
          onClick={() => onOpenAdminPanel("hero")}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-black flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Panel de Edición</span>
        </button>

        <button
          onClick={() => onOpenAdminPanel("ratings")}
          className="hidden md:flex px-2.5 py-1.5 rounded-xl text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 items-center gap-1.5 cursor-pointer"
          title="Editar valoraciones y estrellas"
        >
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Valoración</span>
        </button>

        <button
          onClick={() => onOpenAdminPanel("presentation")}
          className="hidden md:flex px-2.5 py-1.5 rounded-xl text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 items-center gap-1.5 cursor-pointer"
          title="Subir fotos desde PC"
        >
          <Upload className="w-3.5 h-3.5 text-amber-400" />
          <span>Subir Fotos</span>
        </button>

        <button
          onClick={logout}
          className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 cursor-pointer"
          title="Cerrar sesión de administrador"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // When not logged in: discreet access trigger in bottom right
  return (
    <div className="fixed bottom-14 md:bottom-6 right-4 z-30">
      <button
        onClick={onOpenLogin}
        className="px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-950/90 hover:bg-neutral-900 text-neutral-400 hover:text-amber-400 border border-neutral-800 hover:border-amber-400/40 shadow-lg backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer group"
        title="Acceso para el administrador de la landing"
      >
        <Lock className="w-3.5 h-3.5 text-amber-400/80 group-hover:text-amber-400" />
        <span className="hidden sm:inline">Acceso Admin</span>
      </button>
    </div>
  );
};
