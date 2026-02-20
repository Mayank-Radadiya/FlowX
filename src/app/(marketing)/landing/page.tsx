"use client";

import {
  Navbar,
  HeroSection,
  IntegrationsBar,
  FeaturesSection,
  HowItWorksSection,
  PricingSection,
  FAQSection,
  CTABanner,
  Footer,
} from "@/features/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <Navbar />
      <main>
        <HeroSection />
        <IntegrationsBar />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
