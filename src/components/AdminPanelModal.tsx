import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  Image as ImageIcon,
  DollarSign,
  Star,
  Type,
  FileText,
  Phone,
  HelpCircle,
  KeyRound,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  Download,
  AlertCircle,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { useCMS } from "../context/CMSContext";
import { ReviewItem, ProductPackageCMS, ConfirmedSpecCMS, FAQItemCMS } from "../types/cms";
import { INITIAL_CMS_DATA } from "../config/defaultData";

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  initialTab = "hero",
}) => {
  const {
    data,
    updateData,
    resetToDefaults,
    exportJSON,
    importJSON,
    processImageFile,
    credentials,
    updateCredentials,
    logout,
  } = useCMS();

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [imageUploading, setImageUploading] = useState<string | null>(null);

  // Password change states
  const [newUsername, setNewUsername] = useState(credentials.username);
  const [newPassword, setNewPassword] = useState("");
  const [credMessage, setCredMessage] = useState<string | null>(null);

  // File input refs
  const heroFileRef = useRef<HTMLInputElement>(null);
  const galleryHeroFileRef = useRef<HTMLInputElement>(null);
  const galleryDetailFileRef = useRef<HTMLInputElement>(null);
  const importFileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const showNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Image Upload Handler from PC
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: "hero" | "galleryHero" | "galleryDetail"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImageUploading(slot);
      const dataUrl = await processImageFile(file);

      if (slot === "hero") {
        updateData((prev) => ({
          ...prev,
          hero: { ...prev.hero, image: dataUrl },
        }));
      } else if (slot === "galleryHero") {
        updateData((prev) => ({
          ...prev,
          presentation: { ...prev.presentation, imageHero: dataUrl },
        }));
      } else if (slot === "galleryDetail") {
        updateData((prev) => ({
          ...prev,
          presentation: { ...prev.presentation, imageDetail: dataUrl },
        }));
      }
      showNotification();
    } catch (err) {
      alert("Error al procesar la imagen: " + (err as Error).message);
    } finally {
      setImageUploading(null);
      if (e.target) e.target.value = "";
    }
  };

  const handleRestoreImage = (slot: "hero" | "galleryHero" | "galleryDetail") => {
    if (slot === "hero") {
      updateData((prev) => ({
        ...prev,
        hero: { ...prev.hero, image: INITIAL_CMS_DATA.hero.image },
      }));
    } else if (slot === "galleryHero") {
      updateData((prev) => ({
        ...prev,
        presentation: { ...prev.presentation, imageHero: INITIAL_CMS_DATA.presentation.imageHero },
      }));
    } else if (slot === "galleryDetail") {
      updateData((prev) => ({
        ...prev,
        presentation: { ...prev.presentation, imageDetail: INITIAL_CMS_DATA.presentation.imageDetail },
      }));
    }
    showNotification();
  };

  // Package modifications
  const handleUpdatePackagePrice = (pkgId: string, val: string) => {
    const num = val.trim() === "" ? null : Number(val.replace(/\D/g, ""));
    updateData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        packages: prev.pricing.packages.map((p) =>
          p.id === pkgId ? { ...p, price: num } : p
        ),
      },
    }));
    showNotification();
  };

  const handleUpdatePackageText = (pkgId: string, field: keyof ProductPackageCMS, val: any) => {
    updateData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        packages: prev.pricing.packages.map((p) =>
          p.id === pkgId ? { ...p, [field]: val } : p
        ),
      },
    }));
    showNotification();
  };

  // Reviews handlers
  const handleAddReview = () => {
    const newRev: ReviewItem = {
      id: "rev-" + Date.now(),
      name: "Nuevo Cliente",
      city: "Ciudad, Colombia",
      rating: 5,
      date: "Reciente",
      comment: "Excelente experiencia y entrega rápida.",
      verifiedBuyer: true,
    };
    updateData((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        reviews: [newRev, ...prev.ratings.reviews],
        totalReviews: prev.ratings.totalReviews + 1,
      },
    }));
    showNotification();
  };

  const handleDeleteReview = (id: string) => {
    updateData((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        reviews: prev.ratings.reviews.filter((r) => r.id !== id),
        totalReviews: Math.max(1, prev.ratings.totalReviews - 1),
      },
    }));
    showNotification();
  };

  const handleUpdateReview = (id: string, field: keyof ReviewItem, val: any) => {
    updateData((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        reviews: prev.ratings.reviews.map((r) =>
          r.id === id ? { ...r, [field]: val } : r
        ),
      },
    }));
    showNotification();
  };

  // FAQ handlers
  const handleAddFAQ = () => {
    const newFaq: FAQItemCMS = {
      question: "¿Nueva pregunta frecuente?",
      answer: "Respuesta detallada para la pregunta.",
    };
    updateData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, newFaq],
    }));
    showNotification();
  };

  const handleDeleteFAQ = (index: number) => {
    updateData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
    showNotification();
  };

  const handleUpdateFAQ = (index: number, field: "question" | "answer", val: string) => {
    updateData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f, i) => (i === index ? { ...f, [field]: val } : f)),
    }));
    showNotification();
  };

  // Password update
  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      setCredMessage("La contraseña debe tener al menos 4 caracteres.");
      return;
    }
    updateCredentials({
      username: newUsername.trim(),
      passwordHash: newPassword,
    });
    setCredMessage("¡Credenciales actualizadas exitosamente!");
    setNewPassword("");
    setTimeout(() => setCredMessage(null), 3000);
  };

  // Export / Import
  const handleDownloadJSON = () => {
    const json = exportJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inkana-borojo-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importJSON(content);
      if (success) {
        alert("¡Configuración importada exitosamente!");
      } else {
        alert("Error al importar el archivo JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                  Panel de Administración · Landing CMS
                </h2>
                {saveSuccess && (
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1 animate-in fade-in">
                    <Check className="w-3 h-3" />
                    Guardado
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400">
                Edita textos, sube imágenes desde tu PC, modifica precios y administra valoraciones.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 cursor-pointer"
            >
              Cerrar Sesión
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center overflow-x-auto border-b border-neutral-800 bg-neutral-900/40 px-4 gap-1 py-1 text-xs shrink-0 no-scrollbar">
          {[
            { id: "hero", label: "Hero y Portada", icon: ImageIcon },
            { id: "presentation", label: "Presentación y Fotos", icon: Upload },
            { id: "pricing", label: "Precios y Paquetes", icon: DollarSign },
            { id: "ratings", label: "Valoración y Reseñas", icon: Star },
            { id: "whatsapp", label: "WhatsApp y Despacho", icon: Phone },
            { id: "faq", label: "Preguntas Frecuentes", icon: HelpCircle },
            { id: "security", label: "Seguridad y Respaldo", icon: KeyRound },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "bg-amber-400 text-black font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm">
          {/* TAB 1: HERO Y PORTADA */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 space-y-4">
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Imagen Principal del Hero (Subir desde PC)</span>
                </h3>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-36 h-44 rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden flex items-center justify-center p-2 relative group shrink-0">
                    <img
                      src={data.hero.image}
                      alt="Hero actual"
                      className="w-full h-full object-contain"
                    />
                    {imageUploading === "hero" && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-xs text-amber-400">
                        Cargando...
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 flex-1">
                    <p className="text-xs text-neutral-300">
                      Puedes subir una nueva fotografía de la caja o producto directamente desde tu computadora en formatos JPG, PNG o WebP.
                    </p>

                    <input
                      type="file"
                      ref={heroFileRef}
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "hero")}
                      className="hidden"
                    />

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => heroFileRef.current?.click()}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-black flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir Foto desde mi PC</span>
                      </button>

                      <button
                        onClick={() => handleRestoreImage("hero")}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restablecer Original</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Texts */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 space-y-4">
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
                  Textos del Hero
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Kicker Superior
                    </label>
                    <input
                      type="text"
                      value={data.hero.kicker}
                      onChange={(e) => {
                        updateData((p) => ({ ...p, hero: { ...p.hero, kicker: e.target.value } }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Línea 1 del Titular
                    </label>
                    <input
                      type="text"
                      value={data.hero.titleLine1}
                      onChange={(e) => {
                        updateData((p) => ({ ...p, hero: { ...p.hero, titleLine1: e.target.value } }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Línea 2 del Titular (Destacada en Dorado)
                    </label>
                    <input
                      type="text"
                      value={data.hero.titleLine2}
                      onChange={(e) => {
                        updateData((p) => ({ ...p, hero: { ...p.hero, titleLine2: e.target.value } }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Párrafo Principal de Presentación
                    </label>
                    <textarea
                      rows={3}
                      value={data.hero.body}
                      onChange={(e) => {
                        updateData((p) => ({ ...p, hero: { ...p.hero, body: e.target.value } }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Texto del Botón Principal (CTA)
                    </label>
                    <input
                      type="text"
                      value={data.hero.ctaPrimary}
                      onChange={(e) => {
                        updateData((p) => ({ ...p, hero: { ...p.hero, ctaPrimary: e.target.value } }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Texto de Confianza / Apoyo
                    </label>
                    <input
                      type="text"
                      value={data.hero.reassuranceText}
                      onChange={(e) => {
                        updateData((p) => ({ ...p, hero: { ...p.hero, reassuranceText: e.target.value } }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRESENTACIÓN Y GALERÍA */}
          {activeTab === "presentation" && (
            <div className="space-y-6">
              {/* PC Image upload for Gallery */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 space-y-4">
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
                  Imágenes de la Galería (Subir desde PC)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Photo 1: Box view */}
                  <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                    <span className="text-xs font-bold uppercase text-amber-400 block">
                      Foto 1: Empaque / Caja
                    </span>
                    <div className="h-44 bg-neutral-900 rounded-lg overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={data.presentation.imageHero}
                        alt="Caja"
                        className="h-full object-contain"
                      />
                    </div>
                    <input
                      type="file"
                      ref={galleryHeroFileRef}
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "galleryHero")}
                      className="hidden"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => galleryHeroFileRef.current?.click()}
                        className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir desde PC</span>
                      </button>
                      <button
                        onClick={() => handleRestoreImage("galleryHero")}
                        className="py-2 px-3 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                        title="Restablecer original"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Photo 2: Bottle view */}
                  <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                    <span className="text-xs font-bold uppercase text-amber-400 block">
                      Foto 2: Botella / Envase
                    </span>
                    <div className="h-44 bg-neutral-900 rounded-lg overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={data.presentation.imageDetail}
                        alt="Botella"
                        className="h-full object-contain"
                      />
                    </div>
                    <input
                      type="file"
                      ref={galleryDetailFileRef}
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "galleryDetail")}
                      className="hidden"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => galleryDetailFileRef.current?.click()}
                        className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir desde PC</span>
                      </button>
                      <button
                        onClick={() => handleRestoreImage("galleryDetail")}
                        className="py-2 px-3 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                        title="Restablecer original"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Presentation Texts */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 space-y-4">
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
                  Textos de la Sección Presentación
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Kicker
                    </label>
                    <input
                      type="text"
                      value={data.presentation.kicker}
                      onChange={(e) => {
                        updateData((p) => ({ ...p, presentation: { ...p.presentation, kicker: e.target.value } }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={data.presentation.titleLine1}
                      onChange={(e) => {
                        updateData((p) => ({ ...p, presentation: { ...p.presentation, titleLine1: e.target.value } }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Descripción
                    </label>
                    <textarea
                      rows={2}
                      value={data.presentation.body}
                      onChange={(e) => {
                        updateData((p) => ({ ...p, presentation: { ...p.presentation, body: e.target.value } }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRECIOS Y PAQUETES */}
          {activeTab === "pricing" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
                    Tarifas y Precios de Paquetes
                  </h3>
                  <span className="text-[11px] text-neutral-400">
                    Deja el campo vacío para mostrar "Consulta por WhatsApp"
                  </span>
                </div>

                <div className="space-y-4">
                  {data.pricing.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-white uppercase">
                            Nombre del Paquete:
                          </label>
                          <input
                            type="text"
                            value={pkg.name}
                            onChange={(e) => handleUpdatePackageText(pkg.id, "name", e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white mt-1"
                          />
                        </div>

                        <div className="w-full sm:w-48">
                          <label className="block text-xs font-bold text-amber-400 uppercase">
                            Precio COP (Vacío = Pendiente):
                          </label>
                          <div className="relative mt-1">
                            <span className="absolute left-2.5 top-2 text-neutral-500 text-xs">$</span>
                            <input
                              type="text"
                              placeholder="Ej: 45000"
                              value={pkg.price !== null ? pkg.price : ""}
                              onChange={(e) => handleUpdatePackagePrice(pkg.id, e.target.value)}
                              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-6 pr-2 py-2 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-neutral-400 block mb-1">Descripción corta:</label>
                          <input
                            type="text"
                            value={pkg.description}
                            onChange={(e) => handleUpdatePackageText(pkg.id, "description", e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-neutral-400 block mb-1">Etiqueta destacada (badge):</label>
                          <input
                            type="text"
                            value={pkg.badge}
                            onChange={(e) => handleUpdatePackageText(pkg.id, "badge", e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VALORACIONES Y RESEÑAS */}
          {activeTab === "ratings" && (
            <div className="space-y-6">
              {/* Overall rating configs */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-white uppercase tracking-wider flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Configuración General de Valoración</span>
                  </h3>

                  <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.ratings.enabled}
                      onChange={(e) => {
                        updateData((p) => ({
                          ...p,
                          ratings: { ...p.ratings, enabled: e.target.checked },
                        }));
                        showNotification();
                      }}
                      className="accent-amber-400 rounded"
                    />
                    <span>Mostrar bloque de valoraciones en la landing</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Calificación Promedio (1 a 5)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={data.ratings.averageScore}
                      onChange={(e) => {
                        updateData((p) => ({
                          ...p,
                          ratings: { ...p.ratings, averageScore: Number(e.target.value) },
                        }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Número Total de Reseñas
                    </label>
                    <input
                      type="number"
                      value={data.ratings.totalReviews}
                      onChange={(e) => {
                        updateData((p) => ({
                          ...p,
                          ratings: { ...p.ratings, totalReviews: Number(e.target.value) },
                        }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Tasa de Satisfacción (%)
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={data.ratings.satisfactionRate}
                      onChange={(e) => {
                        updateData((p) => ({
                          ...p,
                          ratings: { ...p.ratings, satisfactionRate: Number(e.target.value) },
                        }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Individual reviews editor */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
                    Reseñas de Clientes ({data.ratings.reviews.length})
                  </h3>

                  <button
                    onClick={handleAddReview}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-black flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Reseña</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.ratings.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                          <input
                            type="text"
                            placeholder="Nombre cliente"
                            value={rev.name}
                            onChange={(e) => handleUpdateReview(rev.id, "name", e.target.value)}
                            className="bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                          />
                          <input
                            type="text"
                            placeholder="Ciudad"
                            value={rev.city}
                            onChange={(e) => handleUpdateReview(rev.id, "city", e.target.value)}
                            className="bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                          />
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-neutral-400 shrink-0">Estrellas:</label>
                            <select
                              value={rev.rating}
                              onChange={(e) => handleUpdateReview(rev.id, "rating", Number(e.target.value))}
                              className="bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                            >
                              <option value={5}>5 Estrellas</option>
                              <option value={4}>4 Estrellas</option>
                              <option value={3}>3 Estrellas</option>
                            </select>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="p-2 text-neutral-500 hover:text-red-400 rounded-lg hover:bg-neutral-900 cursor-pointer"
                          title="Eliminar reseña"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Comentario de la reseña..."
                        value={rev.comment}
                        onChange={(e) => handleUpdateReview(rev.id, "comment", e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: WHATSAPP Y DESPACHO */}
          {activeTab === "whatsapp" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 space-y-4">
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>Datos Comerciales y WhatsApp</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Número de WhatsApp Oficial (Formato Internacional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 573001234567"
                      value={data.contact.whatsappNumber}
                      onChange={(e) => {
                        updateData((p) => ({
                          ...p,
                          contact: { ...p.contact, whatsappNumber: e.target.value.replace(/\D/g, "") },
                        }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white font-mono"
                    />
                    <span className="block text-[11px] text-neutral-500 mt-1">
                      Solo dígitos sin '+' ni espacios (Colombia: 57 seguido de tu móvil).
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Tiempos Estimados de Entrega
                    </label>
                    <input
                      type="text"
                      value={data.contact.estimatedDeliveryTime}
                      onChange={(e) => {
                        updateData((p) => ({
                          ...p,
                          contact: { ...p.contact, estimatedDeliveryTime: e.target.value },
                        }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Ciudad Base / Cobertura
                    </label>
                    <input
                      type="text"
                      value={data.contact.salesCity}
                      onChange={(e) => {
                        updateData((p) => ({
                          ...p,
                          contact: { ...p.contact, salesCity: e.target.value },
                        }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Detalle de Cobertura
                    </label>
                    <input
                      type="text"
                      value={data.contact.deliveryCoverage}
                      onChange={(e) => {
                        updateData((p) => ({
                          ...p,
                          contact: { ...p.contact, deliveryCoverage: e.target.value },
                        }));
                        showNotification();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PREGUNTAS FRECUENTES */}
          {activeTab === "faq" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
                    Editar Preguntas Frecuentes ({data.faqs.length})
                  </h3>

                  <button
                    onClick={handleAddFAQ}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-black flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Pregunta</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleUpdateFAQ(idx, "question", e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs font-semibold text-white"
                        />
                        <button
                          onClick={() => handleDeleteFAQ(idx)}
                          className="p-2 text-neutral-500 hover:text-red-400 rounded-lg hover:bg-neutral-900 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => handleUpdateFAQ(idx, "answer", e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-neutral-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SEGURIDAD Y RESPALDO */}
          {activeTab === "security" && (
            <div className="space-y-6">
              {/* Credentials Change Form */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 space-y-4">
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wider flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>Cambiar Credenciales de Administrador</span>
                </h3>

                {credMessage && (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300">
                    {credMessage}
                  </div>
                )}

                <form onSubmit={handleSaveCredentials} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Nuevo Usuario
                    </label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      required
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      placeholder="Mínimo 4 caracteres"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-black cursor-pointer shadow-md"
                    >
                      Guardar Nuevas Credenciales
                    </button>
                  </div>
                </form>
              </div>

              {/* Backup & Restore */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 space-y-4">
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
                  Copia de Seguridad y Restauración
                </h3>

                <p className="text-xs text-neutral-400">
                  Descarga una copia completa de todos los textos, imágenes y precios en formato JSON o restablécelos a los valores originales.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleDownloadJSON}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Descargar Backup JSON</span>
                  </button>

                  <input
                    type="file"
                    ref={importFileRef}
                    accept="application/json"
                    onChange={handleImportFile}
                    className="hidden"
                  />

                  <button
                    onClick={() => importFileRef.current?.click()}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-blue-400" />
                    <span>Restaurar desde JSON</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm("¿Estás seguro de restablecer todos los textos e imágenes a los valores iniciales de fábrica?")) {
                        resetToDefaults();
                        alert("¡Valores restablecidos a los originales!");
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restablecer Todo a Valores de Fábrica</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
          <span className="text-xs text-neutral-500">
            Cambios guardados en tiempo real en tu navegador
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
          >
            Listo, Volver a la Landing
          </button>
        </div>
      </div>
    </div>
  );
};
