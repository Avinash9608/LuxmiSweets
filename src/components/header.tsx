"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./logo";

export function Header() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/#about", label: "About" },
    { href: "/#trust", label: "Trust" },
    { href: "/#team", label: "Team" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center md:flex-1">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="font-bold font-headline text-lg text-primary">LuxmiSweets</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center justify-center space-x-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
           <Button asChild className="hidden md:inline-flex">
            <a href="/#order">Order Now</a>
          </Button>
          <ThemeToggle />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center border-b pb-4">
                  <Link href="/" className="flex items-center space-x-2">
                     <Logo />
                    <span className="font-bold font-headline text-lg text-primary">LuxmiSweets</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 mt-6">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground/80 hover:text-primary">
                      {link.label}
                    </Link>
                  ))}
                </nav>
                 <Button asChild className="mt-auto">
                    <a href="/#order">Order Now</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
