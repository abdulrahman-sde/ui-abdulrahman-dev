import { HeroHeader } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SubmitForm from "@/app/(main)/submit/_components/submit-form";

export default function SubmitPage() {
  return (
    <div className="bg-background min-h-screen">
      <HeroHeader />
      <SubmitForm />
      <Footer />
    </div>
  );
}
