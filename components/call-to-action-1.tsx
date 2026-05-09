import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-background @container py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center">
          <h2 className="text-balance font-serif text-4xl font-medium">
            Find your next template.
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-balance">
            All templates are free. No account needed — just pick one and start
            building.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button className="pr-1.5" asChild>
              <Link href="#templates">
                <span>Browse Templates</span>
                <ChevronRight className="opacity-50" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
