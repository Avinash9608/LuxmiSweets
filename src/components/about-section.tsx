
"use client";

import Image from 'next/image';
import { Button } from './ui/button';
import { Icons } from './icons';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card, CardContent } from './ui/card';
import { Clock, IndianRupee } from 'lucide-react';

const breakfastItems = [
    {
        name: "Samosa",
        image: "https://plus.unsplash.com/premium_photo-1695297516676-04a259917c03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2Ftb3NhfGVufDB8fDB8fHww",
        hint: "samosa snack",
        price: 10,
        unit: "per piece",
        timing: "12 PM to 8 PM",
    },
    {
        name: "Kachori",
        image: "https://media.istockphoto.com/id/1413566890/photo/shegaon-or-rajasthani-aloo-pyas-ki-kachori-served-with-tamarind-chutney-and-sev-kachori-or.webp?a=1&b=1&s=612x612&w=0&k=20&c=O1OHQ2d_6KInyDzCvoNfl7lGxPWQiKxNh2HLffy-5yc=",
        hint: "kachori snack",
        price: 10,
        unit: "per piece",
        timing: "9 AM to 12 PM",
    },
];

export function AboutSection() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
                            ✨ Experience LuxmiSweets<br />Discover the Best Part of Your Day!
                        </h2>
                        <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            At LuxmiSweets, we believe that food is more than just taste — it’s joy, comfort, and connection. From a piping-hot samosa in the morning to a beautifully customized cake in the evening, we serve smiles all day long. Whether you're stopping by for a quick snack or placing a special order for a celebration, you'll always find freshness, flavor, and heartfelt service in everything we offer.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                                <Icons.drink className="w-8 h-8 text-accent-foreground" />
                            </div>
                            <h3 className="text-xl font-bold font-headline">Our Drinks</h3>
                            <p className="text-muted-foreground">
                               Need a quick cool-down? Our collection of cold drinks offers the perfect sip to refresh your day. From fizzy favorites to chilled juices, we’ve got your thirst covered.
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                                <Icons.sweet className="w-8 h-8 text-accent-foreground" />
                            </div>
                            <h3 className="text-xl font-bold font-headline">Our Sweets</h3>
                            <p className="text-muted-foreground">
                                We prepare all our sweets fresh in-house, using classic recipes. Each bite is handcrafted with purity and love, perfect for gifting or a personal treat.
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                                <Icons.cake className="w-8 h-8 text-accent-foreground" />
                            </div>
                            <h3 className="text-xl font-bold font-headline">Our Cakes</h3>
                            <p className="text-muted-foreground">
                               Celebrating something special? Our cakes are baked and designed just the way you want — from flavors to custom designs for any occasion.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
                <div className="container mx-auto px-4 md:px-6">
                    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative aspect-square">
                                <Image
                                    src="https://plus.unsplash.com/premium_photo-1695297516676-04a259917c03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2Ftb3NhfGVufDB8fDB8fHww"
                                    alt="Hot Samosas"
                                    fill
                                    data-ai-hint="samosa snack"
                                    className="rounded-lg shadow-lg object-cover"
                                />
                            </div>
                            <div className="space-y-6 text-center lg:text-left">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                                    🥟 Subah ka Swad — Garma Garam Nasta LuxmiSweet Mein!
                                </h2>
                                <p className="text-muted-foreground">
                                   Start your day with ghar jaisa taste — hot & crispy Samosa, Kachori, aur chatpata Chhola, served with hari aur imli wali chutney. Sab kuch freshly bana hua, right from our family kitchen in Lakhna.
                                </p>
                                <p className="text-muted-foreground">
                                    LuxmiSweet ka nasta sirf pet bharne ke liye nahi, dil khush karne ke liye hota hai. Chahe office jaane se pehle ho ya doston ke saath chhoti meet-up — ek baar try karo, roz aane ka mann karega!
                                </p>
                                <CollapsibleTrigger asChild>
                                    <Button size="lg">{isOpen ? "Hide Menu" : "See Breakfast Menu"}</Button>
                                </CollapsibleTrigger>
                            </div>
                        </div>

                        <CollapsibleContent className="mt-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {breakfastItems.map(item => (
                                    <Card key={item.name} className="overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300">
                                        <CardContent className="p-0">
                                            <div className="relative aspect-video">
                                                <Image src={item.image} alt={item.name} fill data-ai-hint={item.hint} className="object-cover" />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-2xl font-bold font-headline">{item.name}</h3>
                                                <div className="flex items-center gap-6 mt-4 text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <IndianRupee className="h-5 w-5 text-primary" />
                                                        <span className="font-semibold text-lg text-foreground">₹{item.price} <span className="text-sm font-normal">{item.unit}</span></span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-5 w-5 text-primary" />
                                                        <span className="font-semibold text-foreground">{item.timing}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                             <div className="mt-12 text-center bg-card p-6 rounded-lg border border-dashed border-primary/50">
                                <h4 className="text-xl font-bold font-headline">खाने के लिए हमारे दुकान पर आएं</h4>
                                <p className="text-muted-foreground mt-2">Visit our shop to enjoy these delicious, freshly made snacks!</p>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </section>
        </>
    );
}
