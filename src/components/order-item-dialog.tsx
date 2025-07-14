"use client";

import React from "react";
import Image from "next/image";
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
import { Loader2, Mail, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendQuickOrderEmail } from "@/app/actions";
import type { MenuItem } from "@/lib/types";

interface OrderItemDialogProps {
  item: MenuItem;
  children: React.ReactNode;
}

export function OrderItemDialog({ item, children }: OrderItemDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const fullPrice = `₹${item.price} ${item.priceUnit || ''}`.trim();

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

  const handleEmailOrder = async () => {
    setIsSubmitting(true);
    const result = await sendQuickOrderEmail({ name: item.name, price: fullPrice });

    if (result.success) {
      toast({
        title: "Order Request Sent!",
        description: "Thank you for your order. Our team will shortly connect with you via call, WhatsApp, or email.",
      });
      setOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: result.message,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Order Confirmation</DialogTitle>
          <DialogDescription>
            Confirm your order for '{item.name}'. Choose your preferred method below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 py-4">
          <div className="relative w-24 h-24 flex-shrink-0">
             <Image src={item.image} alt={item.name} fill className="rounded-md object-cover" />
          </div>
          <div className="space-y-1">
             <h3 className="text-lg font-semibold">{item.name}</h3>
             <p className="text-lg font-bold text-primary">{fullPrice}</p>
             <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
        </div>
        <DialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button type="button" onClick={handleWhatsAppOrder} variant="secondary">
                <MessageCircle className="mr-2" /> Order on WhatsApp
            </Button>
            <Button type="button" onClick={handleEmailOrder} disabled={isSubmitting}>
                {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                <Mail className="mr-2 h-4 w-4" />
                )}
                Order via Email
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
