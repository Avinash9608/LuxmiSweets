"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter font-headline text-foreground">Our Full Menu</h1>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-lg">
                Explore our entire collection of exquisite sweets, cakes, and drinks. Use the filters to find your perfect treat.
            </p>
        </div>

        {/* Filters Bar */}
        <Card className="p-4 md:p-6 mb-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
            {/* Search Filter */}
            <div className="relative lg:col-span-1">
              <Input
                placeholder="Search for an item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-2 lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                <div className="flex items-center font-semibold text-sm whitespace-nowrap">
                  <SlidersHorizontal className="w-4 h-4 mr-2"/>
                  Categories
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Filter & Reset */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">Price Range</h4>
                    <Button onClick={resetFilters} variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs">
                        <X className="mr-1 h-3 w-3" /> Reset
                    </Button>
                </div>
                <Slider
                    min={0}
                    max={maxPrice}
                    step={50}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value)}
                />
                <div className="flex justify-between text-sm text-muted-foreground -mt-2">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                </div>
            </div>

          </div>
        </Card>

        {/* Menu Grid */}
        <div className="lg:col-span-3 mt-8">
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {filteredItems.map((item) => (
                    <MenuItemCard key={item.name} {...item} />
                  ))}
                </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-full bg-background rounded-lg p-12 mt-12">
                  <Search className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-2xl font-headline font-semibold">No Matches Found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
