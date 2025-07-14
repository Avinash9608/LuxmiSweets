import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { OrderItemDialog } from "./order-item-dialog";
import type { MenuItem } from "@/lib/types";
import { ShoppingCart } from "lucide-react";

const menuItems = {
  cakes: [
    { name: "Chocolate Truffle Cake", price: 800, priceUnit: "per cake", image: "https://placehold.co/300x200.png", hint: "chocolate cake", category: "Cakes" },
    { name: "Red Velvet Cake", price: 950, priceUnit: "per cake", image: "https://placehold.co/300x200.png", hint: "red velvet cake", category: "Cakes" },
    { name: "Pineapple Paradise", price: 750, priceUnit: "per cake", image: "https://placehold.co/300x200.png", hint: "pineapple cake", category: "Cakes" },
    { name: "Classic Cheesecake", price: 1200, priceUnit: "per cake", image: "https://placehold.co/300x200.png", hint: "cheesecake", category: "Cakes" },
  ],
  sweets: [
    { name: "Kaju Katli", price: 1100, priceUnit: "/kg", image: "https://placehold.co/300x200.png", hint: "indian sweets", category: "Sweets" },
    { name: "Motichoor Laddu", price: 600, priceUnit: "/kg", image: "https://placehold.co/300x200.png", hint: "ladoo", category: "Sweets" },
    { name: "Golden Jalebi", price: 550, priceUnit: "/kg", image: "https://placehold.co/300x200.png", hint: "jalebi", category: "Sweets" },
    { name: "Royal Gulab Jamun", price: 500, priceUnit: "/kg", image: "https://placehold.co/300x200.png", hint: "gulab jamun", category: "Sweets" },
  ],
  drinks: [
    { name: "Mango Lassi", price: 150, priceUnit: "per glass", image: "https://placehold.co/300x200.png", hint: "mango lassi", category: "Drinks" },
    { name: "Rose Sherbet", price: 120, priceUnit: "per glass", image: "https://placehold.co/300x200.png", hint: "rose drink", category: "Drinks" },
    { name: "Cold Coffee", price: 180, priceUnit: "per glass", image: "https://placehold.co/300x200.png", hint: "cold coffee", category: "Drinks" },
    { name: "Fresh Lime Soda", price: 100, priceUnit: "per glass", image: "https://placehold.co/300x200.png", hint: "lime soda", category: "Drinks" },
  ],
};

const featuredItems: MenuItem[] = [
    ...menuItems.cakes.slice(0, 2),
    ...menuItems.sweets.slice(0, 1),
    ...menuItems.drinks.slice(0, 1)
];

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

export function MenuSection({ showExploreMoreButton = true }: { showExploreMoreButton?: boolean }) {
  return (
    <section id="menu" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">Our Featured Items</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our delightful range of handcrafted treats, made with the finest ingredients and a touch of love.
            </p>
          </div>
        </div>
        <div className="w-full max-w-6xl mx-auto mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
              {featuredItems.map((item) => <MenuItemCard key={item.name} item={item} />)}
            </div>
        </div>

        {showExploreMoreButton && (
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/menu">Explore Full Menu</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
