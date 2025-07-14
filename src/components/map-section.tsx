import { MapPin, Clock, Phone } from "lucide-react";
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
        <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
          <iframe
            src="https://maps.google.com/maps?q=LuxmiSweets%2C%20Lakhna%2C%20Bihar%20804453&t=&z=17&ie=UTF8&iwloc=B&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map of LuxmiSweets location"
          ></iframe>
        </div>

        <div className="space-y-3 text-sm">
           <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
            <div>
              <p className="font-semibold">Our Address</p>
              <p className="text-muted-foreground">Lakhna Bazar, Bihar 804453</p>
            </div>
          </div>
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
              href="https://www.google.com/maps/dir/?api=1&destination=Lakhna+Bazar+Bihar+804453"
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
