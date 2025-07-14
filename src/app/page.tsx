
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { MenuSection } from "@/components/menu-section";
import { OrderForm } from "@/components/order-form";
import { MapSection } from "@/components/map-section";
import { TrustSection } from "@/components/trust-section";
import { SeasonalOffersSection } from "@/components/seasonal-offers-section";
import { TeamSection } from "@/components/team-section";
import { TestimonialSection } from "@/components/testimonial-section";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <MenuSection showExploreMoreButton={true} />
        <section id="order" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Custom Orders
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a special occasion? Let us craft the perfect sweet creation for you.
              </p>
            </div>
            <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-16 items-start">
              <div className="lg:col-span-3">
                <OrderForm />
              </div>
              <div className="lg:col-span-2">
                <MapSection />
              </div>
            </div>
          </div>
        </section>
        <TrustSection />
        <SeasonalOffersSection />
        <TeamSection />
        <TestimonialSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
