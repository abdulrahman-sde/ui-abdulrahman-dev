import { JsonLd } from "@/components/shared/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "Are Kairo UI templates really free?",
    answer:
      "Yes. All templates are MIT-licensed — free for personal and commercial use. No signup, no attribution required.",
  },
  {
    question: "How do I install a Kairo UI template?",
    answer:
      "Run: bunx shadcn add https://www.kairoui.online/r/<slug>.json — replacing <slug> with the template name. The shadcn CLI will prompt you before writing any files.",
  },
  {
    question: "Which frameworks do Kairo UI templates support?",
    answer:
      "Templates are built for Next.js 16 with React 19 and Tailwind CSS v4. They require a shadcn-initialized Next.js project.",
  },
  {
    question: "Can I use Kairo UI templates for client projects?",
    answer:
      "Yes. The MIT license allows commercial use without restriction.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Faq() {
  return (
    <section className="py-24">
      <JsonLd data={faqSchema} />
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="font-serif text-4xl font-medium text-center mb-12">
          Frequently asked questions
        </h2>
        <Accordion className="divide-y divide-border">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={String(i)}>
              <AccordionTrigger className="py-5 text-base font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
