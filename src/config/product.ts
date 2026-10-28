/**
 * CONFIGURACIÓN CENTRAL EDITABLE - INKANA BOROJÓ
 *
 * Edita este archivo para actualizar precios, número de WhatsApp comercial,
 * ciudades de despacho, coberturas, medios de pago y datos verificados.
 *
 * REGLA: Los valores `null` o cadenas vacías `""` indican datos pendientes
 * por confirmar y activan mensajes informativos amigables como
 * "Consulta precio y disponibilidad", evitando valores falsos o enlaces rotos.
 */

export interface ProductPackage {
  id: string;
  name: string;
  subtitle: string;
  units: number;
  price: number | null; // null si está pendiente
  highlighted?: boolean;
  badge?: string;
  description: string;
}

export interface ProductConfig {
  brand: string;
  logoText: string;
  line: string;
  name: string;
  denomination: string;
  size: string;
  servingsPerContainer: number;
  officialWarning: string;

  // Precios y ventas (null = pendiente por confirmar)
  price: number | null;
  wholesalePrice: number | null;
  wholesaleMinUnits: number;

  packages: ProductPackage[];

  // Canal de venta principal
  // Formato internacional sin símbolos ni espacios (Ej: "573001234567" para Colombia)
  whatsappNumber: string;

  // Logística y cobertura
  salesCity: string;
  deliveryCoverage: string;
  deliveryCost: number | null; // null = a cotizar según destino
  estimatedDeliveryTime: string;

  // Medios de pago aceptados
  paymentMethods: string[];

  // Fotografías oficiales originales del producto
  images: {
    heroBox: string;
    detailBottle: string;
    caption: string;
  };

  // Datos 100% verificados en el empaque físico
  confirmedSpecs: {
    label: string;
    value: string;
    detail: string;
  }[];

  // Aviso legal y de salud obligatorio
  legalNotice: string;
}

export const product: ProductConfig = {
  brand: "Inkanat",
  logoText: "Inkanat",
  line: "RHINO",
  name: "Inkana Borojó Rhino",
  denomination: "Bebida a base de agua con borojó",
  size: "550 ml",
  servingsPerContainer: 18,
  officialWarning: "CONTIENE EDULCORANTES - MINSALUD",

  // PRECIOS COMERCIALES
  // Deja `null` para mantener el modo "Consultar precio vigente por WhatsApp"
  // O coloca un valor numérico en pesos colombianos (COP), ej: 45000
  price: null,
  wholesalePrice: null,
  wholesaleMinUnits: 12,

  packages: [
    {
      id: "individual",
      name: "Unidad Individual",
      subtitle: "Presentación original 550 ml",
      units: 1,
      price: null,
      highlighted: false,
      badge: "Prueba inicial",
      description: "1 botella de 550 ml en su caja protectora original con arte Rhino.",
    },
    {
      id: "pack-personal",
      name: "Pack x 3 Unidades",
      subtitle: "Para consumo continuo",
      units: 3,
      price: null,
      highlighted: true,
      badge: "Más solicitado",
      description: "3 botellas de 550 ml (54 porciones totales). Empaque sellado de fábrica.",
    },
    {
      id: "mayorista",
      name: "Distribución Mayorista",
      subtitle: "A partir de 12 unidades",
      units: 12,
      price: null,
      highlighted: false,
      badge: "Negocios y tiendas",
      description: "Tarifa preferencial para comercializadores, gimnasios y tiendas fitness.",
    },
  ],

  // NÚMERO DE WHATSAPP COMERCIAL
  // Ejemplo para Colombia: "573123456789"
  // Si está vacío, la página mostrará un modal informativo con el mensaje listo para copiar
  whatsappNumber: "",

  // DATOS DE DESPACHO (Actualizar cuando se definan)
  salesCity: "Colombia (Envíos a nivel nacional)",
  deliveryCoverage: "Cobertura nacional con transportadoras aliadas",
  deliveryCost: null, // null indica que se cotiza en la conversación
  estimatedDeliveryTime: "24 a 72 horas hábiles según tu municipio",

  // MEDIOS DE PAGO CONFIRMADOS
  paymentMethods: [
    "Transferencia Bancolombia",
    "Nequi / Daviplata",
    "Pago contra entrega (sujeto a cobertura del transportador)",
  ],

  // RUTAS DE FOTOGRAFÍAS ORIGINALES (Cargadas en /public/assets/aistudio/)
  images: {
    heroBox: "/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.15.01_AM__1__27e1751e.jpeg",
    detailBottle: "/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.15.01_AM_9be640a6.jpeg",
    caption: "Fotografía del empaque y envase original. Marca Inkanat · Línea Rhino Borojó.",
  },

  // DATOS VERIFICADOS VISIBLES EN EL EMPAQUE
  confirmedSpecs: [
    {
      label: "Denominación oficial",
      value: "Bebida a base de agua con borojó",
      detail: "Impreso en el lateral de la caja y en el envase interior.",
    },
    {
      label: "Contenido Neto",
      value: "550 mL",
      detail: "Identificado en la franja amarilla inferior del empaque.",
    },
    {
      label: "Rendimiento",
      value: "18 porciones por envase",
      detail: "Especificado en la cara frontal inferior de la caja.",
    },
    {
      label: "Advertencia regulatoria",
      value: "Contiene edulcorantes - MINSALUD",
      detail: "Sello octagonal reglamentario visible en caja y botella.",
    },
    {
      label: "Gama cromática",
      value: "Negro carbón, dorado, amarillo y rojo",
      detail: "Diseño con rinoceronte en combustión dorada y escudo.",
    },
    {
      label: "Marca y fabricante",
      value: "Inkanat / Rhino",
      detail: "Logotipo Inkanat en la solapa superior; línea Rhino en el cuerpo.",
    },
  ],

  legalNotice:
    "Aviso de transparencia: No se atribuyen a este producto propiedades terapéuticas, curativas, estimulantes no comprobadas ni sustitución de dietas equilibradas. Bebida a base de agua con borojó con edulcorantes según resolución del Ministerio de Salud. Consulta la etiqueta física para la tabla nutricional y recomendaciones del fabricante.",
};

/**
 * Helper para generar el enlace de WhatsApp con mensaje precargado
 */
export function buildWhatsAppLink(
  targetPhone: string,
  params: {
    productName: string;
    quantity: number;
    orderType: "personal" | "wholesale";
    customerName?: string;
    customerCity?: string;
    customNote?: string;
  }
): string {
  const cleanPhone = targetPhone.replace(/\D/g, "");

  const greeting = "¡Hola! Quiero consultar sobre Inkana Borojó.";
  const details = [
    `• Producto: ${params.productName} (550 ml)`,
    `• Cantidad deseada: ${params.quantity} unidad(es)`,
    `• Modalidad: ${params.orderType === "wholesale" ? "Pedido Mayorista" : "Consumo Personal"}`,
  ];

  if (params.customerName?.trim()) {
    details.push(`• Mi nombre: ${params.customerName.trim()}`);
  }
  if (params.customerCity?.trim()) {
    details.push(`• Ciudad / Destino: ${params.customerCity.trim()}`);
  }
  if (params.customNote?.trim()) {
    details.push(`• Consulta adicional: ${params.customNote.trim()}`);
  }

  const closing = "Por favor indíquenme precio vigente, disponibilidad y costos de envío. ¡Gracias!";
  const fullMessage = `${greeting}\n\n${details.join("\n")}\n\n${closing}`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`;
}

/**
 * Helper para formatear valores monetarios en pesos colombianos
 */
export function formatCOP(value: number | null): string {
  if (value === null || value === undefined) {
    return "Consultar por WhatsApp";
  }
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}
