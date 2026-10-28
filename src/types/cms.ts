export interface ReviewItem {
  id: string;
  name: string;
  city: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface ProductPackageCMS {
  id: string;
  name: string;
  subtitle: string;
  units: number;
  price: number | null; // null si pendiente
  highlighted: boolean;
  badge: string;
  description: string;
}

export interface ConfirmedSpecCMS {
  label: string;
  value: string;
  detail: string;
}

export interface FAQItemCMS {
  question: string;
  answer: string;
}

export interface CMSData {
  // Brand & Identidad
  brand: string;
  logoText: string;
  line: string;
  name: string;
  denomination: string;
  size: string;
  servingsPerContainer: number;
  officialWarning: string;

  // Hero Block
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    reassuranceText: string;
    image: string; // Base64 data URL or relative path
  };

  // Presentation & Gallery Block
  presentation: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    imageHero: string;
    imageDetail: string;
    imageHeroTitle: string;
    imageDetailTitle: string;
    imageHeroDesc: string;
    imageDetailDesc: string;
    caption: string;
    specs: ConfirmedSpecCMS[];
    disclaimerTitle: string;
    disclaimerText: string;
  };

  // Pricing Block
  pricing: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    packages: ProductPackageCMS[];
    wholesaleNote: string;
  };

  // Valoración & Reseñas
  ratings: {
    enabled: boolean;
    averageScore: number; // ej: 4.9
    totalReviews: number; // ej: 148
    satisfactionRate: number; // ej: 98
    kicker: string;
    title: string;
    subtitle: string;
    reviews: ReviewItem[];
  };

  // WhatsApp & Contact
  contact: {
    whatsappNumber: string;
    salesCity: string;
    deliveryCoverage: string;
    estimatedDeliveryTime: string;
    paymentMethods: string[];
  };

  // FAQ Block
  faqs: FAQItemCMS[];

  // How to buy block
  howToBuy: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
  };

  // Final CTA block
  finalCTA: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    buttonText: string;
  };

  // Footer & Legal
  footer: {
    legalNotice: string;
    rightsText: string;
  };
}

export interface AdminCredentials {
  username: string;
  passwordHash: string; // plain or hashed string for verification
}
