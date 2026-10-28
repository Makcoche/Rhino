/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CMSProvider, useCMS } from "./context/CMSContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductPresentation } from "./components/ProductPresentation";
import { PricingSection } from "./components/PricingSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { WhatsAppOrder } from "./components/WhatsAppOrder";
import { HowToBuy } from "./components/HowToBuy";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { MobileStickyBar } from "./components/MobileStickyBar";
import { LaunchChecklistModal } from "./components/LaunchChecklistModal";
import { AdminLoginModal } from "./components/AdminLoginModal";
import { AdminPanelModal } from "./components/AdminPanelModal";
import { AdminFloatingBar } from "./components/AdminFloatingBar";
import { ProductPackageCMS } from "./types/cms";

function MainLanding() {
  const { data, isAdmin } = useCMS();

  // Selected package from pricing cards to pre-fill order
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [orderType, setOrderType] = useState<"personal" | "wholesale">("personal");

  // Modals state
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [adminActiveTab, setAdminActiveTab] = useState<string>("hero");

  const scrollToOrder = () => {
    const el = document.getElementById("pedido");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPresentation = () => {
    const el = document.getElementById("presentacion");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPackage = (pkg: ProductPackageCMS) => {
    setOrderQuantity(pkg.units);
    setOrderType(pkg.units >= 12 ? "wholesale" : "personal");
    scrollToOrder();
  };

  const openAdminAtTab = (tab: string) => {
    if (isAdmin) {
      setAdminActiveTab(tab);
      setIsAdminPanelOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col font-sans pb-16 md:pb-0">
      {/* Top Header */}
      <Header
        onOpenOrder={scrollToOrder}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAdminPanel={() => {
          setAdminActiveTab("hero");
          setIsAdminPanelOpen(true);
        }}
      />

      <main className="flex-1">
        {/* Hero Section with CMS data and PC upload support */}
        <Hero
          onOrderClick={scrollToOrder}
          onExploreClick={scrollToPresentation}
          onOpenAdminToHero={() => openAdminAtTab("hero")}
        />

        {/* Product Packaging & Verified Details Gallery */}
        <ProductPresentation
          onOpenAdminToPresentation={() => openAdminAtTab("presentation")}
        />

        {/* Pricing and Packages */}
        <PricingSection
          onSelectPackage={handleSelectPackage}
          onOpenAdminToPricing={() => openAdminAtTab("pricing")}
        />

        {/* Customer Reviews and Ratings */}
        <ReviewsSection
          onOpenAdminToReviews={() => openAdminAtTab("ratings")}
        />

        {/* Direct WhatsApp Ordering */}
        <WhatsAppOrder
          initialQuantity={orderQuantity}
          initialType={orderType}
          onOpenAdminToContact={() => openAdminAtTab("whatsapp")}
        />

        {/* How to buy workflow */}
        <HowToBuy onStartOrder={scrollToOrder} />

        {/* Accessible FAQ Accordion */}
        <FAQ
          onContactClick={scrollToOrder}
          onOpenAdminToFAQ={() => openAdminAtTab("faq")}
        />

        {/* Final CTA */}
        <FinalCTA onOrderClick={scrollToOrder} />
      </main>

      {/* Footer */}
      <Footer
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onOrderClick={scrollToOrder}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAdminPanel={() => {
          setAdminActiveTab("hero");
          setIsAdminPanelOpen(true);
        }}
      />

      {/* Mobile Sticky Bar (<15% viewport height) */}
      <MobileStickyBar onOrderClick={scrollToOrder} />

      {/* Admin Floating Tooling / Access Trigger */}
      <AdminFloatingBar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAdminPanel={(tab) => {
          setAdminActiveTab(tab || "hero");
          setIsAdminPanelOpen(true);
        }}
      />

      {/* Launch Checklist Modal */}
      <LaunchChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        onOpenAdminPanel={() => {
          setAdminActiveTab("hero");
          setIsAdminPanelOpen(true);
        }}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminPanelOpen(true);
        }}
      />

      {/* Admin CMS Panel Dashboard Modal */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        initialTab={adminActiveTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <MainLanding />
    </CMSProvider>
  );
}
