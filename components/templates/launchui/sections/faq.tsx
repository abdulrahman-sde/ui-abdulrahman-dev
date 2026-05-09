import { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/templates/launchui/ui/accordion";
import { Section } from "@/components/templates/launchui/ui/section";

interface FAQItem {
  question: string;
  answer: ReactNode;
  value?: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItem[] | false;
  className?: string;
}

export default function FAQ({
  title = "Questions and Answers",
  items = [
    {
      question: "Why is building a great landing page critical for your business?",
      answer: (
        <p className="text-muted-foreground max-w-[640px] text-balance">
          In today&apos;s AI-driven world, standing out is harder than ever.
          While anyone can build a product, a professional landing page makes
          the difference between success and failure. Launch UI helps you ship
          faster without compromising on quality.
        </p>
      ),
    },
    {
      question: "Why use Launch UI instead of a no-code tool?",
      answer: (
        <p className="text-muted-foreground max-w-[600px]">
          No-code tools lock you into their ecosystem with recurring fees and
          limited control. Launch UI gives you full ownership of your code while
          maintaining professional quality — no vendor lock-in, no hidden costs.
        </p>
      ),
    },
    {
      question: "How is Launch UI different from other component libraries?",
      answer: (
        <p className="text-muted-foreground max-w-[580px]">
          Launch UI stands out with premium design quality, delightful custom
          animations, and components carefully crafted to make your product look
          professional — not like a generic template.
        </p>
      ),
    },
    {
      question: 'What does "The code is yours" mean?',
      answer: (
        <p className="text-muted-foreground max-w-[580px]">
          The basic version is open-source and free forever. The pro version is
          a one-time purchase with lifetime access — use it for unlimited
          personal and commercial projects, no recurring fees.
        </p>
      ),
    },
    {
      question: "Are Figma files included?",
      answer: (
        <p className="text-muted-foreground max-w-[580px]">
          Yes! The complete Launch UI template is available for free on the
          Figma community.
        </p>
      ),
    },
  ],
  className,
}: FAQProps) {
  return (
    <Section className={className}>
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <Accordion type="single" collapsible className="w-full max-w-[800px]">
            {items.map((item, index) => (
              <AccordionItem
                key={item.value ?? item.question}
                value={item.value ?? `item-${index + 1}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}
