"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Slider = dynamic(() => import('@/components/ui/slider').then(mod => mod.Slider), {
  ssr: false,
  loading: () => <Skeleton className="h-2 w-full" />,
});

const allMenuItems = [
    // Cakes
    { name: "Chocolate Truffle Cake", category: "Cakes", price: 800, image: "https://placehold.co/300x200.png", hint: "chocolate cake" },
    { name: "Red Velvet Cake", category: "Cakes", price: 950, image: "https://placehold.co/300x200.png", hint: "red velvet cake" },
    { name: "Pineapple Paradise", category: "Cakes", price: 750, image: "https://placehold.co/300x200.png", hint: "pineapple cake" },
    { name: "Classic Cheesecake", category: "Cakes", price: 1200, image: "https://placehold.co/300x200.png", hint: "cheesecake" },
    { name: "Black Forest Gateau", category: "Cakes", price: 850, image: "https://placehold.co/300x200.png", hint: "black forest cake" },
    { name: "Mango Mousse Cake", category: "Cakes", price: 1000, image: "https://placehold.co/300x200.png", hint: "mango cake" },

    // Sweets
    { name: "Kaju Katli", category: "Sweets", price: 1100, image: "https://placehold.co/300x200.png", hint: "indian sweets" },
    { name: "Motichoor Laddu", category: "Sweets", price: 600, image: "https://placehold.co/300x200.png", hint: "ladoo" },
    { name: "Golden Jalebi", category: "Sweets", price: 550, image: "https://placehold.co/300x200.png", hint: "jalebi" },
    { name: "Royal Gulab Jamun", category: "Sweets", price: 500, image: "https://placehold.co/300x200.png", hint: "gulab jamun" },
    { name: "Rasmalai", category: "Sweets", price: 700, image: "https://placehold.co/300x200.png", hint: "rasmalai" },
    { name: "Pista Barfi", category: "Sweets", price: 1200, image: "https://placehold.co/300x200.png", hint: "pista barfi" },

    // Drinks
    { name: "Mango Lassi", category: "Drinks", price: 150, image: "https://placehold.co/300x200.png", hint: "mango lassi" },
    { name: "Rose Sherbet", category: "Drinks", price: 120, image: "https://placehold.co/300x200.png", hint: "rose drink" },
    { name: "Cold Coffee", category: "Drinks", price: 180, image: "https://placehold.co/300x200.png", hint: "cold coffee" },
    { name: "Fresh Lime Soda", category: "Drinks", price: 100, image: "https://placehold.co/300x200.png", hint: "lime soda" },
    { name: "Badam Milk", category: "Drinks", price: 160, image: "https://placehold.co/300x200.png", hint: "badam milk" },
    { name: "Thandai", category: "Drinks", price: 200, image: "https://placehold.co/300x200.png", hint: "thandai drink" },
];

const categories = ["Cakes", "Sweets", "Drinks"];
const maxPrice = Math.max(...allMenuItems.map(item => item.price));


const MenuItemCard = ({ name, price, image, hint }: { name: string; price: number; image: string; hint: string }) => (
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border-transparent hover:border-primary">
    <CardHeader className="p-0">
      <div className="aspect-[3/2] relative overflow-hidden">
        <Image src={image} alt={name} fill data-ai-hint={hint} className="object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </CardHeader>
    <CardContent className="p-4 bg-card">
      <CardTitle className="text-lg font-headline text-foreground leading-tight">{name}</CardTitle>
      <p className="text-base text-primary dark:text-accent font-semibold mt-2">₹{price}</p>
    </CardContent>
  </Card>
);

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredItems = useMemo(() => {
    return allMenuItems.filter((item) => {
      const matchesCategory = selectedCategories.includes(item.category);
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [searchQuery, priceRange, selectedCategories]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  
  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, maxPrice]);
    setSelectedCategories(categories);
  }

  const FilterControls = () => (
    <>
      {/* Category Filter */}
      <div className="space-y-4">
        <h4 className="font-semibold">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={`cat-${category}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Price Filter */}
      <div className="space-y-4">
        <h4 className="font-semibold">Price Range</h4>
        {isClient ? (
          <Slider
              min={0}
              max={maxPrice}
              step={50}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
          />
        ) : (
          <Skeleton className="h-5 w-full" />
        )}
        <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1">
            <Card className="p-6 sticky top-24 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold font-headline flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5 text-primary"/>
                        Filters
                    </h3>
                    <Button onClick={resetFilters} variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs">
                        <X className="mr-1 h-3 w-3" /> Reset
                    </Button>
                </div>
                <FilterControls />
            </Card>
          </aside>

          {/* Menu Grid */}
          <div className="lg:col-span-3">
             <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter font-headline text-foreground">Our Full Menu</h1>
                <p className="max-w-2xl mt-4 text-muted-foreground md:text-lg">
                    Explore our entire collection of exquisite sweets, cakes, and drinks. Use the filters to find your perfect treat.
                </p>
            </div>
             
             {/* Search Bar & Mobile Filter Trigger */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Input
                  placeholder="Search for an item..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base shadow-sm"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden h-12 flex items-center gap-2 shadow-sm">
                    <SlidersHorizontal className="h-5 w-5" />
                    <span>Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[340px]">
                   <SheetHeader className="mb-6">
                      <SheetTitle className="flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5 text-primary"/>
                        Filter Menu Items
                      </SheetTitle>
                    </SheetHeader>
                    <div className="p-1">
                      <FilterControls />
                    </div>
                </SheetContent>
              </Sheet>
            </div>

            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                  {filteredItems.map((item) => (
                    <MenuItemCard key={item.name} {...item} />
                  ))}
                </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-[400px] bg-secondary/40 rounded-lg p-12">
                  <Search className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-2xl font-headline font-semibold">No Matches Found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
