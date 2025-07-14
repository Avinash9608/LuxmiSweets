import { Header } from "@/components/header";
import { MenuSection } from "@/components/menu-section";
import { Footer } from "@/components/footer";

export default function MenuPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <MenuSection showExploreMoreButton={false} />
      </main>
      <Footer />
    </div>
  );
}
