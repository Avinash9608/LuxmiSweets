import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="grid h-14 grid-cols-3 items-center px-4 md:px-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="font-bold font-headline text-lg text-primary">LuxmiSweets</span>
          </Link>
        </div>
        
        <nav className="flex justify-center items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Home</Link>
          <Link href="#order" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Order</Link>
        </nav>

        <div className="flex items-center justify-end">
          <Button asChild>
            <a href="#order">Order Now</a>
          </Button>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
