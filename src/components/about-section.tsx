import Image from 'next/image';
import { Button } from './ui/button';
import { Icons } from './icons';

export function AboutSection() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
              Experience LuxmiSweets, Discover the Best Part of Your Day!
            </h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <Icons.drink className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold font-headline">Our Drinks</h3>
              <p className="text-muted-foreground">
                Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
               <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <Icons.sweet className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold font-headline">Our Sweets</h3>
              <p className="text-muted-foreground">
                Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
               <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <Icons.cake className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold font-headline">Our Cakes</h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square">
              <Image 
                src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Breakfast pastries"
                fill
                data-ai-hint="pastries breakfast"
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="space-y-6">
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
