
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
import MenuItemModel from "@/models/MenuItem";
import { connectDB } from "@/lib/db";


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

export async function MenuSection({ showExploreMoreButton = true }: { showExploreMoreButton?: boolean }) {
  await connectDB();
  const featuredItems = await MenuItemModel.find({ isFeatured: true }).limit(4).lean();
  
  const formattedItems: MenuItem[] = featuredItems.map(item => ({
    ...item,
    _id: item._id.toString(),
  }));

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
          {formattedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
              {formattedItems.map((item) => <MenuItemCard key={item.name} item={item} />)}
            </div>
          ) : (
             <div className="text-center py-12 text-muted-foreground">
                No featured items available at the moment.
             </div>
          )}
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
