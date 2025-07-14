import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const menuItems = {
  cakes: [
    { name: "Chocolate Truffle Cake", price: "₹800", image: "https://placehold.co/400x300.png", hint: "chocolate cake" },
    { name: "Red Velvet Cake", price: "₹950", image: "https://placehold.co/400x300.png", hint: "red velvet cake" },
    { name: "Pineapple Paradise", price: "₹750", image: "https://placehold.co/400x300.png", hint: "pineapple cake" },
    { name: "Classic Cheesecake", price: "₹1200", image: "https://placehold.co/400x300.png", hint: "cheesecake" },
  ],
  sweets: [
    { name: "Kaju Katli", price: "₹1100/kg", image: "https://placehold.co/400x300.png", hint: "indian sweets" },
    { name: "Motichoor Laddu", price: "₹600/kg", image: "https://placehold.co/400x300.png", hint: "ladoo" },
    { name: "Golden Jalebi", price: "₹550/kg", image: "https://placehold.co/400x300.png", hint: "jalebi" },
    { name: "Royal Gulab Jamun", price: "₹500/kg", image: "https://placehold.co/400x300.png", hint: "gulab jamun" },
  ],
  drinks: [
    { name: "Mango Lassi", price: "₹150", image: "https://placehold.co/400x300.png", hint: "mango lassi" },
    { name: "Rose Sherbet", price: "₹120", image: "https://placehold.co/400x300.png", hint: "rose drink" },
    { name: "Cold Coffee", price: "₹180", image: "https://placehold.co/400x300.png", hint: "cold coffee" },
    { name: "Fresh Lime Soda", price: "₹100", image: "https://placehold.co/400x300.png", hint: "lime soda" },
  ],
};

const MenuItemCard = ({ name, price, image, hint }: { name: string; price: string; image: string; hint: string }) => (
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
    <CardHeader className="p-0">
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image src={image} alt={name} layout="fill" objectFit="cover" data-ai-hint={hint} className="transition-transform duration-500 group-hover:scale-110" />
      </div>
    </CardHeader>
    <CardContent className="p-4 bg-card">
      <CardTitle className="text-lg font-headline text-foreground">{name}</CardTitle>
      <CardDescription className="text-base text-primary dark:text-accent font-semibold mt-1">{price}</CardDescription>
    </CardContent>
  </Card>
);

export function MenuSection() {
  return (
    <section id="menu" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">Our Menu</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our delightful range of handcrafted treats, made with the finest ingredients and a touch of love.
            </p>
          </div>
        </div>
        <Tabs defaultValue="cakes" className="w-full max-w-5xl mx-auto mt-12">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="cakes">Cakes</TabsTrigger>
            <TabsTrigger value="sweets">Sweets</TabsTrigger>
            <TabsTrigger value="drinks">Cold Drinks</TabsTrigger>
          </TabsList>
          <TabsContent value="cakes">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {menuItems.cakes.map((item) => <MenuItemCard key={item.name} {...item} />)}
            </div>
          </TabsContent>
          <TabsContent value="sweets">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {menuItems.sweets.map((item) => <MenuItemCard key={item.name} {...item} />)}
            </div>
          </TabsContent>
          <TabsContent value="drinks">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {menuItems.drinks.map((item) => <MenuItemCard key={item.name} {...item} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
