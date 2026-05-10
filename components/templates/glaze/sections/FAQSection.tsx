"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Horizon?",
    answer:
      "Horizon is a unified analytics and workflow platform that connects your data sources, surfaces real-time insights, and keeps your team aligned — all in one place.",
  },
  {
    question: "Do I need to write any code to get started?",
    answer:
      "Not at all. Horizon is designed so any team member can build dashboards, create alerts, and query data using plain language. Developers can go deeper with our API and custom integrations.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Horizon is SOC 2 Type II certified. Data is encrypted in transit and at rest. You retain full ownership of your data and can export or delete it at any time.",
  },
  {
    question: "Can I share dashboards with external stakeholders?",
    answer:
      "Absolutely. You can share a read-only link with anyone outside your organization, or embed dashboards directly into your internal tools and docs.",
  },
];

export default function FAQSection() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-xl font-medium tracking-tight text-foreground">
          FAQ
        </h2>
        <Accordion defaultValue={[]} className="w-full border-t border-border">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
            <AccordionTrigger className="py-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </div>
    </section>
  );
}
