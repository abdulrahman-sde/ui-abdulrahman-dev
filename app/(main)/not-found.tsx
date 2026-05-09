import { HeroHeader } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import NotFoundView from "@/app/(main)/(landing)/_components/not-found-view";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeroHeader />
      <NotFoundView />
      <Footer />
    </div>
  );
}
