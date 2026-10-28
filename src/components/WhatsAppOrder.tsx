import React, { useState, useEffect } from "react";
import { MessageSquare, Plus, Minus, Send, Copy, Check, Building, User, PhoneCall, Edit3, ShieldCheck } from "lucide-react";
import { useCMS } from "../context/CMSContext";
import { buildWhatsAppLink, formatCOP } from "../config/product";

interface WhatsAppOrderProps {
  initialQuantity?: number;
  initialType?: "personal" | "wholesale";
  onOpenAdminToContact?: () => void;
}

export const WhatsAppOrder: React.FC<WhatsAppOrderProps> = ({
  initialQuantity = 1,
  initialType = "personal",
  onOpenAdminToContact,
}) => {
  const { data, isAdmin, updateData } = useCMS();
  const activePhone = data.contact.whatsappNumber;

  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [orderType, setOrderType] = useState<"personal" | "wholesale">(initialType);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerCity, setCustomerCity] = useState<string>("");
  const [customNote, setCustomNote] = useState<string>("");

  const [copied, setCopied] = useState<boolean>(false);
  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false);
  const [tempPhoneInput, setTempPhoneInput] = useState<string>(activePhone);

  useEffect(() => {
    if (initialQuantity) setQuantity(initialQuantity);
  }, [initialQuantity]);

  useEffect(() => {
    if (initialType) setOrderType(initialType);
  }, [initialType]);

  const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, 100));
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  // Determine estimated unit price from packages
  const matchedPackage = data.pricing.packages.find((p) => p.units === quantity);
  const baseUnitPrice = data.pricing.packages.find((p) => p.units === 1)?.price ?? null;
  const currentPrice = matchedPackage?.price ?? (baseUnitPrice ? baseUnitPrice * quantity : null);

  // Build the message preview
  const messageLink = buildWhatsAppLink(activePhone || "573000000000", {
    productName: data.name,
    quantity,
    orderType,
    customerName,
    customerCity,
    customNote,
  });

  const messageParams = new URLSearchParams(messageLink.split("?")[1]);
  const rawDecodedText = messageParams.get("text") || "";

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(rawDecodedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleSendOrder = () => {
    if (!activePhone || activePhone.trim() === "") {
      if (isAdmin) {
        setShowPhoneModal(true);
      } else {
        alert("El canal de atención por WhatsApp se está habilitando. Ya puedes copiar el mensaje con el botón 'Copiar' para enviarlo a nuestro asesor.");
      }
      return;
    }
    const targetUrl = buildWhatsAppLink(activePhone, {
      productName: data.name,
      quantity,
      orderType,
      customerName,
      customerCity,
      customNote,
    });
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const handleSavePhoneFromModal = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = tempPhoneInput.replace(/\D/g, "");
    updateData((prev) => ({
      ...prev,
      contact: { ...prev.contact, whatsappNumber: cleaned },
    }));
    setShowPhoneModal(false);
  };

  return (
    <section id="pedido" className="py-16 lg:py-24 bg-[#060608] border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">
              <span>PEDIDO DIRECTO</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">WHATSAPP COMERCIAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              ¿QUIERES CONOCER EL PRECIO O HACER UN PEDIDO?
              <span className="block text-gold-gradient">ESCRÍBENOS DIRECTAMENTE POR WHATSAPP.</span>
            </h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
              Escríbenos por WhatsApp para consultar disponibilidad inmediata, cobertura en {data.contact.salesCity} y condiciones de entrega seguras.
            </p>
          </div>

          {isAdmin && onOpenAdminToContact && (
            <button
              onClick={onOpenAdminToContact}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20 transition-colors cursor-pointer shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar WhatsApp y Envíos</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Order Configuration Box */}
          <div className="lg:col-span-7 bg-neutral-950/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-7 shadow-xl">
            {/* Step 1: Order Type Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                1. Tipo de Solicitud
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOrderType("personal");
                    if (quantity >= 12) setQuantity(3);
                  }}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                    orderType === "personal"
                      ? "bg-amber-400/10 border-amber-400/80 text-white shadow-sm"
                      : "bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  <User className={`w-4 h-4 ${orderType === "personal" ? "text-amber-400" : "text-neutral-500"}`} />
                  <div className="text-left">
                    <span className="block text-xs font-bold uppercase">Consumo Personal</span>
                    <span className="text-[11px] text-neutral-400">1 a 11 unidades</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOrderType("wholesale");
                    if (quantity < 12) setQuantity(12);
                  }}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                    orderType === "wholesale"
                      ? "bg-amber-400/10 border-amber-400/80 text-white shadow-sm"
                      : "bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  <Building className={`w-4 h-4 ${orderType === "wholesale" ? "text-amber-400" : "text-neutral-500"}`} />
                  <div className="text-left">
                    <span className="block text-xs font-bold uppercase">Mayorista / Negocio</span>
                    <span className="text-[11px] text-neutral-400">A partir de 12 unidades</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Quantity Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  2. Cantidad de Unidades ({data.size})
                </label>
                <span className="text-xs text-amber-400 font-medium">
                  {quantity * data.servingsPerContainer} porciones estimadas
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    aria-label="Disminuir cantidad"
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-800 text-neutral-300 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-display font-bold text-2xl text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    aria-label="Aumentar cantidad"
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-800 text-neutral-300 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {[1, 3, 6, 12, 24].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setQuantity(preset);
                        if (preset >= 12) setOrderType("wholesale");
                        else setOrderType("personal");
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-bold font-display transition-all cursor-pointer ${
                        quantity === preset
                          ? "bg-amber-400 text-black shadow-sm"
                          : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                      }`}
                    >
                      {preset} {preset === 1 ? "Ud." : "Uds."}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Optional Details */}
            <div className="space-y-4 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                3. Datos Opcionales (Facilitan la cotización con el asesor)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customer-name" className="block text-[11px] text-neutral-400 mb-1">
                    Tu Nombre o Empresa
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    placeholder="Ej: Carlos Gómez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="customer-city" className="block text-[11px] text-neutral-400 mb-1">
                    Ciudad / Municipio de Entrega
                  </label>
                  <input
                    id="customer-city"
                    type="text"
                    placeholder="Ej: Bogotá, Medellín, Cali..."
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="custom-note" className="block text-[11px] text-neutral-400 mb-1">
                  Pregunta puntual (opcional)
                </label>
                <input
                  id="custom-note"
                  type="text"
                  placeholder="Ej: ¿Tienen pago contraentrega en mi zona?"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-4 border-t border-neutral-800/80">
              <button
                type="button"
                onClick={handleSendOrder}
                className="w-full py-4 px-6 rounded-xl font-display font-bold text-base sm:text-lg uppercase tracking-wider text-black bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-black" />
                <span>ENVIAR CONSULTA A WHATSAPP</span>
              </button>

              <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                <span>Respuesta directa de asesor comercial</span>
                <span>Sin cargos ocultos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live WhatsApp Message Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-xs uppercase tracking-wider text-neutral-200">
                    Vista Previa del Mensaje
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 bg-neutral-900 px-2.5 py-1.5 rounded-lg border border-neutral-800 transition-colors cursor-pointer"
                  title="Copiar texto del mensaje"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "¡Copiado!" : "Copiar"}</span>
                </button>
              </div>

              {/* Chat Bubble simulation */}
              <div className="mt-4 bg-[#111b21] p-4 rounded-xl border border-emerald-950 font-sans text-xs text-neutral-200 leading-relaxed whitespace-pre-line shadow-inner">
                {rawDecodedText}
              </div>

              {/* Summary metadata */}
              <div className="mt-4 pt-4 border-t border-neutral-800/80 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Presentación:</span>
                  <span className="text-white font-medium">{data.name} ({data.size})</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Cantidad:</span>
                  <span className="text-white font-medium">{quantity} unidades</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Inversión estimada:</span>
                  <span className="text-amber-400 font-semibold font-display">
                    {currentPrice !== null
                      ? formatCOP(currentPrice)
                      : "A confirmar con asesor"}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Destino de despacho:</span>
                  <span className="text-white font-medium">{customerCity.trim() || data.contact.salesCity}</span>
                </div>
              </div>
            </div>

            {/* Customer Trust & Logistics Guarantees (100% customer-facing) */}
            <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-5 text-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                  Garantía y Seguridad en tu Pedido
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Compra Segura
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Producto 100% original en caja sellada con 18 porciones.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Atención directa sin intermediarios ni cobros no autorizados.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Despacho con transportadora certificada y número de guía.</span>
                </li>
              </ul>

              {/* Only visible to the authenticated Admin */}
              {isAdmin && (
                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="text-amber-400 font-mono text-[10px]">
                    Línea: {activePhone ? `+${activePhone}` : "Sin WhatsApp (configurar en panel)"}
                  </span>
                  <button
                    type="button"
                    onClick={onOpenAdminToContact}
                    className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 cursor-pointer"
                  >
                    Ajustar en Panel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      {showPhoneModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowPhoneModal(false)}
        >
          <div
            className="bg-neutral-950 border border-neutral-700 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                  Configuración de WhatsApp
                </h3>
                <p className="text-xs text-neutral-400">
                  Guarda tu línea comercial para que los clientes te escriban al instante.
                </p>
              </div>
            </div>

            <form onSubmit={handleSavePhoneFromModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Número con código de país (Ej: 573001234567)
                </label>
                <input
                  type="text"
                  placeholder="573001234567"
                  value={tempPhoneInput}
                  onChange={(e) => setTempPhoneInput(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 font-mono"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPhoneModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold font-display uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-black shadow-md cursor-pointer"
                >
                  Guardar Número
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
