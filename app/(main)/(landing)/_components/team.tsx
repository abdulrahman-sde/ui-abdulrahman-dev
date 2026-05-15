import Image from "next/image";
import Link from "next/link";
import avatar from "@/public/avatar.webp";

export default function Team() {
  return (
    <section id="about" className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="space-y-4">
          <h2 className="text-balance font-serif text-4xl font-medium">
            Made by one person
          </h2>
          <p className="text-muted-foreground text-balance">
            Kairo UI is a solo project. The templates here are built by me or
            inspired and adapted from designs found around the internet — all
            free to use, no accounts, no fees.
          </p>
        </div>

        <div className="mt-12 grid gap-12 text-sm">
          <div className="relative grid grid-cols-[auto_1fr] gap-4">
            <div className="before:border-foreground/10 shadow-foreground/6.5 dark:shadow-black/6.5 relative size-28 shrink-0 rounded-xl shadow-md before:absolute before:inset-0 before:rounded-xl before:border overflow-hidden">
              <Image
                src={avatar}
                alt="Abdul Rahman"
                className="rounded-xl aspect-square object-cover object-[-33px_0px]"
                width={120}
                height={120}
              />
            </div>
            <div className="flex flex-col justify-between gap-6 py-1">
              <div className="space-y-0.5">
                <Link
                  href="https://abdulrahmanasif.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium hover:underline underline-offset-4"
                >
                  Abdul Rahman
                </Link>
                <p className="text-muted-foreground text-sm">
                  Full-stack engineer
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                Full-stack engineer who builds and shares free templates —
                originals and internet-inspired, all open to use.{" "}
                <Link
                  href="https://abdulrahmanasif.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4"
                >
                  abdulrahmanasif.dev
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
