import { MapPin, Clock, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function MapSection() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          Visit Our Store
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Map to LuxmiSweets"
            layout="fill"
            objectFit="cover"
            data-ai-hint="map abstract"
            className="opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white font-bold text-lg">LuxmiSweets</h3>
            <p className="text-white/90 text-sm">123 Sweet Lane, Flavor Town</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <Clock className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
            <div>
              <p className="font-semibold">Opening Hours</p>
              <p className="text-muted-foreground">Mon - Sun: 9:00 AM - 9:00 PM</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
            <div>
              <p className="font-semibold">Contact Us</p>
              <p className="text-muted-foreground">(123) 456-7890</p>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button className="w-full" asChild>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
