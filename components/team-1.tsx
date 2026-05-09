import Image from "next/image";
import avatar from "@/public/avatar.png";
const members = [
  {
    avatar: avatar,
    name: "Abdul Rahman",
    role: "Builder & designer behind ui.abdulrahman.dev",
    bio: "I build and share free landing page templates for developers. Everything here is open to use — no accounts, no fees.",
  },
];

export default function Team() {
  return (
    <section id="about" className="bg-background @container py-24 ">
      <div className="mx-auto max-w-3xl px-6">
        <div className="space-y-4">
          <h2 className="text-balance font-serif text-4xl font-medium">
            Made by one person
          </h2>
          <p className="text-muted-foreground text-balance">
            This is a solo project. I make templates I&apos;d want to use myself
            and share them for free.
          </p>
        </div>
        <div className="mt-12 grid gap-12 text-sm">
          {members.map((member, index) => (
            <div
              key={index}
              className="relative grid grid-cols-[auto_1fr] gap-4"
            >
              <div aria-hidden className="max-h-26 absolute" />
              <div aria-hidden className="w-26 absolute " />
              <div className="before:border-foreground/10 shadow-foreground/6.5 dark:shadow-black/6.5 relative size-28 shrink-0 rounded-xl shadow-md before:absolute before:inset-0 before:rounded-xl before:border overflow-hidden">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  className="rounded-xl h-30"
                  width={120}
                  height={120}
                />
              </div>

              <div className="flex flex-col justify-between gap-6 py-1">
                <div className="space-y-0.5">
                  <p className="text-foregroun text-base font-medium">
                    {member.name}
                  </p>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </div>

                <p className="text-muted-foreground text-balance text-sm">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
