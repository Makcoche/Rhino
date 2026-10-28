import React, { useState } from "react";
import { Lock, X, KeyRound, User, AlertCircle, ShieldCheck } from "lucide-react";
import { useCMS } from "../context/CMSContext";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { login, credentials } = useCMS();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = login(username, password);
    if (success) {
      onLoginSuccess();
      onClose();
    } else {
      setError("Usuario o contraseña incorrectos. Verifica tus credenciales.");
    }
  };

  const handleUseDefault = () => {
    setUsername(credentials.username);
    setPassword(credentials.passwordHash);
    setError(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-neutral-950 border border-neutral-700 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
              Acceso Administrador
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Panel de edición para textos, fotos de PC, precios y valoraciones.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
              Usuario de Administrador
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ej: admin"
                required
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 active:scale-[0.99] transition-all shadow-md shadow-amber-500/20 cursor-pointer"
          >
            Iniciar Sesión como Administrador
          </button>
        </form>

        {/* Quick Helper for user convenience */}
        <div className="pt-3 border-t border-neutral-800/80">
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="block text-[11px] text-neutral-400 font-medium">
                Credenciales iniciales:
              </span>
              <span className="font-mono text-neutral-200 text-[11px]">
                {credentials.username} / {credentials.passwordHash}
              </span>
            </div>
            <button
              type="button"
              onClick={handleUseDefault}
              className="text-amber-400 hover:text-amber-300 text-xs font-semibold underline underline-offset-2 cursor-pointer"
            >
              Autocompletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
