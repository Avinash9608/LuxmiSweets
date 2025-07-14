
"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Loader2, Mail, MessageCircle, User, AtSign, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendQuickOrderEmail } from "@/app/actions";
import type { MenuItem } from "@/lib/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

interface OrderItemDialogProps {
  item: MenuItem;
  children: React.ReactNode;
}

const QuickOrderSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().optional(),
  location: z.string().min(1, { message: "Location is required." }),
  itemName: z.string(),
  itemPrice: z.string(),
});

type QuickOrderForm = z.infer<typeof QuickOrderSchema>;

export function OrderItemDialog({ item, children }: OrderItemDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const fullPrice = `₹${item.price} ${item.priceUnit || ''}`.trim();

  const form = useForm<QuickOrderForm>({
    resolver: zodResolver(QuickOrderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      itemName: item.name,
      itemPrice: fullPrice,
    },
  });

  const { isSubmitting } = form.formState;

  const handleWhatsAppOrder = () => {
    const message = `Hello LuxmiSweets, I would like to order:\n\nItem: ${item.name}\nPrice: ${fullPrice}`;
    const whatsappUrl = `https://wa.me/919608989499?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    toast({
      title: "Action Required",
      description: "Please send the pre-filled message in WhatsApp to place your order.",
    });
    setOpen(false);
  };

  const handleEmailOrder = async (data: QuickOrderForm) => {
    const result = await sendQuickOrderEmail(data);

    if (result.success) {
      toast({
        title: "Order Request Sent!",
        description: "Thank you for your order. Our team will shortly connect with you via call, WhatsApp, or email.",
      });
      setOpen(false);
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: result.message,
      });
    }
  };
  
  // Reset form when dialog is closed
  React.useEffect(() => {
    if (!open) {
      form.reset({
        name: "",
        email: "",
        phone: "",
        location: "",
        itemName: item.name,
        itemPrice: fullPrice,
      });
    }
  }, [open, form, item, fullPrice]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Confirm Your Order</DialogTitle>
          <DialogDescription>
            You're ordering '{item.name}'. Please provide your details below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center gap-4 py-2">
          <div className="relative w-20 h-20 flex-shrink-0">
             <Image src={item.image} alt={item.name} fill className="rounded-md object-cover" />
          </div>
          <div className="space-y-1">
             <h3 className="text-lg font-semibold">{item.name}</h3>
             <p className="text-lg font-bold text-primary">{fullPrice}</p>
             <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
        </div>

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEmailOrder)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Your Name" {...field} className="pl-9" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                     <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Your Email" {...field} className="pl-9" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Phone Number</FormLabel>
                  <FormControl>
                     <div className="relative">
                       <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Phone Number (Optional)" {...field} className="pl-9" />
                    </div>
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Location</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Your Location / Address" {...field} className="pl-9" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4">
                <Button type="button" onClick={handleWhatsAppOrder} variant="secondary">
                    <MessageCircle className="mr-2" /> Order on WhatsApp
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                    <Mail className="mr-2 h-4 w-4" />
                    )}
                    Order via Email
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
