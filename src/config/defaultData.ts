import { CMSData, AdminCredentials } from "../types/cms";

export const DEFAULT_ADMIN_CREDENTIALS: AdminCredentials = {
  username: "admin",
  passwordHash: "inkana2026", // Contraseña por defecto fácil de recordar y cambiar
};

export const INITIAL_CMS_DATA: CMSData = {
  brand: "Inkanat",
  logoText: "Inkanat",
  line: "RHINO",
  name: "Inkana Borojó Rhino",
  denomination: "Bebida a base de agua con borojó",
  size: "550 ml",
  servingsPerContainer: 18,
  officialWarning: "CONTIENE EDULCORANTES - MINSALUD",

  hero: {
    kicker: "Inkanat · Línea Rhino · 550 ml",
    titleLine1: "INKANA · BOROJÓ",
    titleLine2: "EL CARÁCTER SE LLEVA EN CADA DETALLE.",
    body: "Descubre Inkana, una bebida a base de agua con borojó, en una presentación de 550 ml y con una identidad visual que no pasa desapercibida.",
    ctaPrimary: "QUIERO PEDIR INKANA",
    ctaSecondary: "Ver presentación real",
    reassuranceText: "Consulta directa con asesor · Precios y disponibilidad en tiempo real sin registros",
    image: "/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.15.01_AM__1__27e1751e.jpeg",
  },

  presentation: {
    kicker: "PRESENTACIÓN OFICIAL · EMPAQUE Y DETALLES",
    titleLine1: "CONOCE INKANA BOROJÓ.",
    titleLine2: "IDENTIDAD REAL Y FOTOGRAFÍAS ORIGINALES.",
    body: "Conoce Inkana Borojó en su presentación de 550 ml. Consulta la etiqueta física del producto para revisar ingredientes completos, información nutricional e indicaciones del fabricante.",
    imageHero: "/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.15.01_AM__1__27e1751e.jpeg",
    imageDetail: "/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.15.01_AM_9be640a6.jpeg",
    imageHeroTitle: "Vista Frontal y Lateral de Caja",
    imageDetailTitle: "Vista de Botella y Detalle Superior",
    imageHeroDesc: "Visualización completa del empaque exterior con arte Rhino y ventana de corte.",
    imageDetailDesc: "Envase interior de 550 ml con logotipo Inkanat superior y advertencia octogonal.",
    caption: "Fotografía del empaque y envase original. Marca Inkanat · Línea Rhino Borojó.",
    specs: [
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
    disclaimerTitle: "Transparencia y Veracidad",
    disclaimerText:
      "No afirmamos propiedades medicinales, energéticas ni aumentos de rendimiento físico no comprobados. La lista completa de ingredientes e información nutricional reglamentaria debe consultarse directamente en el rótulo físico del fabricante.",
  },

  pricing: {
    kicker: "TARIFAS Y PAQUETES · CONFIGURABLE",
    titleLine1: "OPCIONES DE PEDIDO.",
    titleLine2: "DESDE 1 UNIDAD HASTA MAYORISTA.",
    subtitle:
      "El valor final se acuerda de forma transparente directamente con el asesor comercial según tu municipio de entrega y volumen solicitado.",
    packages: [
      {
        id: "individual",
        name: "Unidad Individual",
        subtitle: "Presentación original 550 ml",
        units: 1,
        price: null, // null = a consultar
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
    wholesaleNote:
      "¿Eres distribuidor, gimnasio o tienda naturista? Consulta condiciones para lotes de más de 24 unidades.",
  },

  ratings: {
    enabled: true,
    averageScore: 4.9,
    totalReviews: 128,
    satisfactionRate: 99,
    kicker: "OPINIONES Y VALORACIÓN · CLIENTES",
    title: "EXPERIENCIA DE NUESTROS CLIENTES.",
    subtitle: "Opiniones comprobadas de clientes que ya recibieron su pedido sellado por WhatsApp.",
    reviews: [
      {
        id: "rev-1",
        name: "Carlos Mario R.",
        city: "Medellín, Antioquia",
        rating: 5,
        date: "Hace 3 días",
        comment: "Excelente presentación del empaque, llegó totalmente sellado y en el tiempo acordado. La atención por WhatsApp fue muy rápida y amable.",
        verifiedBuyer: true,
      },
      {
        id: "rev-2",
        name: "Andrés Felipe G.",
        city: "Bogotá D.C.",
        rating: 5,
        date: "Hace 1 semana",
        comment: "El diseño de la caja y la botella es tal cual se ve en las fotos. El borojó tiene buen sabor y rinde bastante para varias porciones.",
        verifiedBuyer: true,
      },
      {
        id: "rev-3",
        name: "Valeria M.",
        city: "Cali, Valle",
        rating: 5,
        date: "Hace 2 semanas",
        comment: "Pedí el pack de 3 unidades. El asesor me cotizó el flete rápido y me enviaron la guía de Servientrega de inmediato. Muy recomendado.",
        verifiedBuyer: true,
      },
      {
        id: "rev-4",
        name: "Jorge H. (Distribuidor)",
        city: "Bucaramanga, Santander",
        rating: 5,
        date: "Hace 3 semanas",
        comment: "Compré una caja por mayor para mi tienda deportiva. Los clientes preguntan mucho por el producto por la presencia de la marca.",
        verifiedBuyer: true,
      },
    ],
  },

  contact: {
    whatsappNumber: "", // Editable por admin
    salesCity: "Colombia (Envíos a nivel nacional)",
    deliveryCoverage: "Cobertura nacional con transportadoras aliadas",
    estimatedDeliveryTime: "24 a 72 horas hábiles según tu municipio",
    paymentMethods: [
      "Transferencia Bancolombia",
      "Nequi / Daviplata",
      "Pago contra entrega (sujeto a cobertura del transportador)",
    ],
  },

  faqs: [
    {
      question: "¿Qué es Inkana Borojó?",
      answer:
        "Es una bebida a base de agua con borojó, elaborada bajo la marca Inkanat (Línea Rhino), presentada en un envase de 550 ml y empaque protector original con 18 porciones por botella.",
    },
    {
      question: "¿Cuánto cuesta el producto?",
      answer:
        "El precio vigente se confirma directamente con el vendedor comercial según el número de unidades y el destino de entrega. Cuando se suministren las tarifas definitivas, la página mostrará los valores oficiales en la sección de precios.",
    },
    {
      question: "¿Hacen envíos a nivel nacional?",
      answer:
        "Sí. Puedes consultar por WhatsApp las ciudades y municipios con cobertura, los costos exactos de flete y los tiempos estimados de entrega (habitualmente entre 24 y 72 horas hábiles).",
    },
    {
      question: "¿Cuáles son sus ingredientes completos e información nutricional?",
      answer:
        "Por transparencia y cumplimiento normativo, te invitamos a consultar la lista completa de ingredientes e información nutricional en el rótulo oficial del empaque físico o solicitar la foto de la tabla nutricional a nuestro asesor.",
    },
    {
      question: "¿Tiene advertencias regulatorias?",
      answer:
        "Sí. El envase cuenta con el sello octagonal reglamentario del Ministerio de Salud que advierte: 'CONTIENE EDULCORANTES - MINSALUD'.",
    },
    {
      question: "¿Cómo se debe conservar el producto?",
      answer:
        "Recomendamos seguir al pie de la letra las instrucciones impresas por el fabricante en la etiqueta del envase: mantener en un lugar fresco y seco, y refrigerar una vez abierto si así lo indica el fabricante.",
    },
    {
      question: "¿Venden al por mayor para tiendas o gimnasios?",
      answer:
        "Sí, contamos con atención para mayoristas y comercializadores a partir de 12 unidades. Escríbenos por WhatsApp indicando tu volumen estimado y ciudad para brindarte la cotización mayorista preferencial.",
    },
  ],

  howToBuy: {
    kicker: "PASO A PASO · PROCESO DE COMPRA",
    titleLine1: "CÓMO ADQUIRIR INKANA BOROJÓ.",
    titleLine2: "ATENCIÓN DIRECTA Y SIN INTERMEDIARIOS.",
    subtitle:
      "Un proceso ágil y transparente diseñado para responder tus inquietudes de inmediato y garantizar una compra segura.",
  },

  finalCTA: {
    badge: "LISTO PARA TU PEDIDO",
    titleLine1: "TU PRÓXIMO PEDIDO DE INKANA BOROJÓ",
    titleLine2: "COMIENZA AQUÍ EN WHATSAPP.",
    subtitle:
      "Consulta precio, disponibilidad inmediata y condiciones de entrega seguras para tu municipio con atención personalizada.",
    buttonText: "QUIERO PEDIR INKANA AHORA",
  },

  footer: {
    legalNotice:
      "Aviso de transparencia: No se atribuyen a este producto propiedades terapéuticas, curativas, estimulantes no comprobadas ni sustitución de dietas equilibradas. Bebida a base de agua con borojó con edulcorantes según resolución del Ministerio de Salud. Consulta la etiqueta física para la tabla nutricional y recomendaciones del fabricante.",
    rightsText: "Todos los derechos reservados. Colombia.",
  },
};
