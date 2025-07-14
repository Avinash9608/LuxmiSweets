import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold font-headline text-lg text-primary">LuxmiSweets</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-4">
          <Link href="#menu" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Menu</Link>
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
