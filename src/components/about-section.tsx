
import Image from 'next/image';
import { Button } from './ui/button';
import { Icons } from './icons';

export function AboutSection() {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square">
              <Image 
                src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Breakfast pastries"
                fill
                data-ai-hint="pastries breakfast"
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Breakfast Croissants and Sandwiches
              </h2>
              <p className="text-muted-foreground">
                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
              </p>
              <Button size="lg">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
