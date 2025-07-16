
"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const testimonials = [
  {
    quote: "The red velvet cake was absolutely divine! It was the centerpiece of our celebration and everyone loved it. The best bakery in town, hands down.",
    author: "Priya Sharma",
    title: "Birthday Celebration",
    avatar: "PS",
    image: "https://placehold.co/100x100.png",
    hint: "woman portrait"
  },
  {
    quote: "I ordered a custom box of sweets for a festival, and LuxmiSweets exceeded my expectations. The taste, the presentation, everything was perfect.",
    author: "Rahul Verma",
    title: "Corporate Client",
    avatar: "RV",
    image: "https://placehold.co/100x100.png",
    hint: "man portrait"
  },
  {
    quote: "Their Mango Lassi is to die for! So refreshing and authentic. It’s my go-to drink whenever I visit. Highly recommended!",
    author: "Anjali Mehta",
    title: "Regular Customer",
    avatar: "AM",
    image: "https://plus.unsplash.com/premium_photo-1682096088550-5c61987fe860?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybCUyMGluZGlhfGVufDB8fDB8fHww",
    hint: "indian woman"
  },
  {
    quote: "The custom order process was seamless. I sent them a design, and they replicated it beautifully on the cake. Very professional and talented team.",
    author: "Vikram Singh",
    title: "Wedding Order",
    avatar: "VS",
    image: "https://images.unsplash.com/photo-1591675101827-3b2271747d79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGJveSUyMGluZGlhfGVufDB8fDB8fHww",
    hint: "indian man"
  },
];

export function TestimonialSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
              What Our Customers Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our happy customers and their delightful experiences with our creations.
            </p>
          </div>
        </div>
        <div className="w-full max-w-6xl mx-auto mt-12">
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
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full flex flex-col justify-between">
                      <CardContent className="p-6 flex flex-col gap-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                          <Avatar>
                            <AvatarImage src={testimonial.image} alt={testimonial.author} data-ai-hint={testimonial.hint} />
                            <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
