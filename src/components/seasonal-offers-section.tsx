"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

const offers = [
  {
    emoji: "🪔",
    title: "Diwali Combo Offer",
    description: "Light up your celebrations! Get 2kg of assorted sweets + a 1lb cake for only ₹999!",
    pattern: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-100 via-orange-50 to-transparent",
    buttonText: "Claim Diwali Offer"
  },
  {
    emoji: "🎉",
    title: "Raksha Bandhan Special",
    description: "Sweeten the bond of love with 10% off on all Kaju Katli & premium gift boxes.",
     pattern: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-100 via-pink-50 to-transparent",
     buttonText: "Shop Rakhi Gifts"
  },
  {
    emoji: "🎂",
    title: "Birthday Month Treat",
    description: "Celebrating a birthday? Get a FREE 250g premium sweet box with any custom cake order!",
     pattern: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-100 via-blue-50 to-transparent",
     buttonText: "Order Birthday Cake"
  },
  {
    emoji: "🎊",
    title: "Holi Splash of Sweetness",
    description: "Add color to your festivities with our special Gujiya and Thandai packs. Starting at just ₹250!",
     pattern: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-100 via-purple-50 to-transparent",
     buttonText: "Explore Holi Specials"
  },
];

export function SeasonalOffersSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {offers.map((offer, index) => (
              <CarouselItem key={index}>
                <div className={`relative p-8 md:p-12 rounded-2xl overflow-hidden text-center border border-primary/10 shadow-lg ${offer.pattern}`}>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="text-5xl md:text-6xl mb-4">{offer.emoji}</div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-foreground">
                      {offer.title}
                    </h2>
                    <p className="max-w-xl mx-auto mt-3 text-muted-foreground md:text-lg">
                      {offer.description}
                    </p>
                    <Button asChild size="lg" className="mt-6">
                      <a href="#order">{offer.buttonText}</a>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
