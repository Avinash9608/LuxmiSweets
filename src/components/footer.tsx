
"use client";

import { useState, useEffect } from "react";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);


  return (
    <>
      <footer className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto py-12 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Identity */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
                <Logo />
                <span className="font-bold font-headline text-2xl text-primary">LuxmiSweets</span>
            </Link>
            <p className="text-sm text-muted-foreground">Made with Love in Lakhna, Since 2015.</p>
             <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110" aria-label="YouTube">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-headline font-semibold text-lg text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">Menu</Link></li>
              <li><Link href="#order" className="text-muted-foreground hover:text-primary transition-colors">Custom Orders</Link></li>
              <li><Link href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-headline font-semibold text-lg text-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Main Road, Lakhna, Bihar – 804453</span>
                </li>
                <li className="flex items-start gap-3">
                    <Phone className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                    <a href="https://wa.me/919123456789" className="text-muted-foreground hover:text-primary transition-colors">+91 91234 56789</a>
                </li>
                 <li className="flex items-start gap-3">
                    <Mail className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                    <a href="mailto:orders@luxmisweets.com" className="text-muted-foreground hover:text-primary transition-colors">orders@luxmisweets.com</a>
                </li>
            </ul>
          </div>
          
          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-headline font-semibold text-lg text-foreground">Hours</h3>
            <div className="text-sm space-y-1">
                <p className="font-semibold text-foreground">🕘 Open Daily: 8:00 AM – 10:00 PM</p>
                <p className="text-muted-foreground">🎂 Cake Orders: 24-Hour Pre-Booking Recommended</p>
            </div>
          </div>

        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LuxmiSweets. All rights reserved.</p>
          <p className="mt-1">Website handcrafted for Lakhna by the LuxmiSweet Team.</p>
        </div>
      </footer>
      <Button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-4 right-4 rounded-full p-2 h-12 w-12 transition-opacity duration-300 z-50",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-label="Back to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </>
  );
}
