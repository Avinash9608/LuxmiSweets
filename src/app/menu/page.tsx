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
import { Search, X, SlidersHorizontal, ListFilter, Tag, DollarSign, SortAsc, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrderItemDialog } from "@/components/order-item-dialog";
import type { MenuItem } from "@/lib/types";

const Slider = dynamic(() => import('@/components/ui/slider').then(mod => mod.Slider), {
  ssr: false,
  loading: () => <Skeleton className="h-2 w-full" />,
});

const allMenuItems: MenuItem[] = [
    // Cakes
    { name: "Chocolate Truffle Cake", category: "Cakes", price: 800, priceUnit: "per cake", image: "https://placehold.co/300x200.png", hint: "chocolate cake", dietary: ['Eggless'] },
    { name: "Red Velvet Cake", category: "Cakes", price: 950, priceUnit: "per cake", image: "https://placehold.co/300x200.png", hint: "red velvet cake", dietary: ['Eggless'] },
    { name: "Pineapple Paradise", category: "Cakes", price: 750, priceUnit: "per cake", image: "https://placehold.co/300x200.png", hint: "pineapple cake", dietary: ['Eggless'] },
    { name: "Classic Cheesecake", category: "Cakes", price: 1200, priceUnit: "per cake", image: "https://placehold.co/300x200.png", hint: "cheesecake" },
    { name: "Black Forest Gateau", category: "Cakes", price: 850, priceUnit: "per cake", image: "https://placehold.co/300x200.png", hint: "black forest cake", dietary: ['Eggless'] },
    { name: "Mango Mousse Cake", category: "Cakes", price: 1000, priceUnit: "per cake", image: "https://placehold.co/300x200.png", hint: "mango cake", dietary: ['Eggless'] },

    // Sweets
    { name: "Kaju Katli", category: "Sweets", price: 1100, priceUnit: "/kg", image: "https://placehold.co/300x200.png", hint: "indian sweets", dietary: ['Vegan', 'Gluten-Free'] },
    { name: "Motichoor Laddu", category: "Sweets", price: 600, priceUnit: "/kg", image: "https://placehold.co/300x200.png", hint: "ladoo", dietary: [] },
    { name: "Golden Jalebi", category: "Sweets", price: 550, priceUnit: "/kg", image: "https://placehold.co/300x200.png", hint: "jalebi", dietary: ['Vegan'] },
    { name: "Royal Gulab Jamun", category: "Sweets", price: 500, priceUnit: "/kg", image: "https://placehold.co/300x200.png", hint: "gulab jamun", dietary: [] },
    { name: "Rasmalai", category: "Sweets", price: 700, priceUnit: "/kg", image: "https://placehold.co/300x200.png", hint: "rasmalai", dietary: ['Gluten-Free'] },
    { name: "Pista Barfi", category: "Sweets", price: 1200, priceUnit: "/kg", image: "https://placehold.co/300x200.png", hint: "pista barfi", dietary: ['Gluten-Free'] },

    // Drinks
    { name: "Mango Lassi", category: "Drinks", price: 150, priceUnit: "per glass", image: "https://placehold.co/300x200.png", hint: "mango lassi", dietary: ['Gluten-Free'] },
    { name: "Rose Sherbet", category: "Drinks", price: 120, priceUnit: "per glass", image: "https://placehold.co/300x200.png", hint: "rose drink", dietary: ['Vegan', 'Gluten-Free'] },
    { name: "Cold Coffee", category: "Drinks", price: 180, priceUnit: "per glass", image: "https://placehold.co/300x200.png", hint: "cold coffee" },
    { name: "Fresh Lime Soda", category: "Drinks", price: 100, priceUnit: "per glass", image: "https://placehold.co/300x200.png", hint: "lime soda", dietary: ['Vegan', 'Gluten-Free'] },
    { name: "Badam Milk", category: "Drinks", price: 160, priceUnit: "per glass", image: "https://placehold.co/300x200.png", hint: "badam milk", dietary: ['Gluten-Free'] },
    { name: "Thandai", category: "Drinks", price: 200, priceUnit: "per glass", image: "https://placehold.co/300x200.png", hint: "thandai drink" },
];

const categories = ["Cakes", "Sweets", "Drinks"];
const dietaryOptions = ["Eggless", "Vegan", "Gluten-Free"];
const maxPrice = Math.max(...allMenuItems.map(item => item.price));

const MenuItemCard = ({ item }: { item: MenuItem }) => (
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group border-transparent hover:border-primary flex flex-col">
    <CardHeader className="p-0">
      <div className="aspect-[3/2] relative overflow-hidden">
        <Image src={item.image} alt={item.name} fill data-ai-hint={item.hint} className="object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </CardHeader>
    <CardContent className="p-4 bg-card flex-grow flex flex-col">
      <CardTitle className="text-lg font-headline text-foreground leading-tight">{item.name}</CardTitle>
      <p className="text-base text-primary dark:text-accent font-semibold mt-2">₹{item.price} <span className="text-sm text-muted-foreground font-normal">{item.priceUnit}</span></p>
      <div className="mt-auto pt-4">
        <OrderItemDialog item={item}>
          <Button variant="outline" className="w-full">
            <ShoppingCart className="mr-2" />
            Order Now
          </Button>
        </OrderItemDialog>
      </div>
    </CardContent>
  </Card>
);

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredItems = useMemo(() => {
    let items = allMenuItems.filter((item) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDietary = selectedDietary.length === 0 || selectedDietary.every(diet => item.dietary?.includes(diet));
      return matchesCategory && matchesPrice && matchesSearch && matchesDietary;
    });

    switch (sortBy) {
        case 'price-asc':
            items.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            items.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            items.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
    }

    return items;
  }, [searchQuery, priceRange, selectedCategories, selectedDietary, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  
  const handleDietaryChange = (diet: string) => {
    setSelectedDietary((prev) =>
      prev.includes(diet)
        ? prev.filter((d) => d !== diet)
        : [...prev, diet]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, maxPrice]);
    setSelectedCategories(categories);
    setSelectedDietary([]);
    setSortBy("default");
  }

  const FilterControls = () => (
    <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
      <AccordionItem value="category">
        <AccordionTrigger className="text-base font-semibold hover:no-underline">
          <div className="flex items-center gap-2">
            <ListFilter className="h-5 w-5 text-primary" />
            Category
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 pt-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-3">
                <Checkbox
                  id={`cat-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                  className="h-5 w-5"
                />
                <label htmlFor={`cat-${category}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="dietary">
        <AccordionTrigger className="text-base font-semibold hover:no-underline">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Dietary Options
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 pt-2">
            {dietaryOptions.map((diet) => (
              <div key={diet} className="flex items-center space-x-3">
                <Checkbox
                  id={`diet-${diet}`}
                  checked={selectedDietary.includes(diet)}
                  onCheckedChange={() => handleDietaryChange(diet)}
                  className="h-5 w-5"
                />
                <label htmlFor={`diet-${diet}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {diet}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="price">
        <AccordionTrigger className="text-base font-semibold hover:no-underline">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Price Range
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-4">
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
            <div className="flex justify-between text-sm text-muted-foreground mt-3">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="p-6 sticky top-24 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold font-headline flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5 text-primary"/>
                        Filters
                    </h3>
                    <Button onClick={resetFilters} variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs">
                        <X className="mr-1 h-3 w-3" /> Reset All
                    </Button>
                </div>
                <FilterControls />
            </div>
          </aside>

          {/* Menu Grid */}
          <div className="lg:col-span-3">
             <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter font-headline text-foreground">Our Full Menu</h1>
                <p className="max-w-2xl mt-4 text-muted-foreground md:text-lg">
                    Explore our entire collection of exquisite sweets, cakes, and drinks. Use the filters to find your perfect treat.
                </p>
            </div>
             
            <div className="flex flex-col sm:flex-row gap-4 mb-8 sticky top-20 bg-background/80 backdrop-blur-sm z-10 py-4 -mt-4">
              <div className="relative flex-1">
                <Input
                  placeholder="Search for an item..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base shadow-sm"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12 w-full sm:w-[180px] shadow-sm">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-5 w-5" />
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A-Z</SelectItem>
                  </SelectContent>
                </Select>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden h-12 flex items-center gap-2 shadow-sm">
                      <SlidersHorizontal className="h-5 w-5" />
                      <span>Filters</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[340px]">
                     <SheetHeader className="mb-6 border-b pb-4">
                        <SheetTitle className="flex items-center gap-2 text-xl font-headline">
                          <SlidersHorizontal className="h-5 w-5 text-primary"/>
                          Filter Menu Items
                        </SheetTitle>
                      </SheetHeader>
                      <FilterControls />
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                  {filteredItems.map((item) => (
                    <MenuItemCard key={item.name} item={item} />
                  ))}
                </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-[400px] bg-secondary/40 rounded-lg p-12">
                  <Search className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-2xl font-headline font-semibold">No Matches Found</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm">Try adjusting your search or filters to find what you're looking for.</p>
                  <Button onClick={resetFilters} variant="outline" className="mt-6">
                    <X className="mr-2 h-4 w-4" /> Clear All Filters
                  </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
