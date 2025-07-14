"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-grid dark:bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-transparent dark:from-background dark:via-background/90 dark:to-transparent z-10" />
      
      <div className="absolute inset-0 z-0">
          <Icons.cake className="absolute top-[10%] left-[5%] h-24 w-24 text-primary/30 animate-float opacity-50" style={{ animationDuration: '15s' }} />
          <Icons.sweet className="absolute top-[20%] right-[10%] h-20 w-20 text-accent/30 animate-float-delay" style={{ animationDuration: '12s', animationDelay: '2s' }} />
          <Icons.drink className="absolute bottom-[15%] left-[15%] h-28 w-28 text-secondary-foreground/20 animate-float" style={{ animationDuration: '14s', animationDelay: '1s' }}/>
          <Icons.cake className="absolute bottom-[10%] right-[5%] h-32 w-32 text-primary/20 animate-float-delay" style={{ animationDuration: '18s' }}/>
          <Icons.sweet className="absolute top-[50%] left-[25%] h-16 w-16 text-accent/20 animate-float" style={{ animationDuration: '13s', animationDelay: '3s' }} />
      </div>

      <div className="container px-4 md:px-6 text-center z-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-primary drop-shadow-lg">
            Indulge in Divine Flavors
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Experience the taste of tradition and luxury with our handcrafted sweets and cakes.
          </p>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#menu">Explore Menu</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#order">Custom Order</a>
          </Button>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-delay {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(25px) rotate(-10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float { animation: float infinite ease-in-out; }
        .animate-float-delay { animation: float-delay infinite ease-in-out; }
      `}</style>
    </section>
  );
}
