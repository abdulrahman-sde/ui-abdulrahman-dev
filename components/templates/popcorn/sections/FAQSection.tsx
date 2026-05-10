"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is Bloom?",
      answer:
        "Bloom is a calm, focused productivity app that brings your tasks, habits, and calendar together in one place. It's designed to help you build momentum without overwhelm.",
    },
    {
      question: "Is Bloom really free?",
      answer:
        "Yes. Bloom has a generous free plan with unlimited tasks, habits, and calendar sync. Pro unlocks AI scheduling, advanced integrations, and priority support.",
    },
    {
      question: "Does it work on both iOS and Android?",
      answer:
        "Absolutely. Bloom is available on iPhone, iPad, Android, and as a web app. Your data syncs instantly across all your devices.",
    },
    {
      question: "Can I import from other apps?",
      answer:
        "Yes. You can import tasks from Todoist, Things 3, Apple Reminders, and Notion in just a few taps. Your history comes with you.",
    },
    {
      question: "How is Bloom different from other planners?",
      answer:
        "Bloom blends tasks, habits, and calendar into one unified view so you stop switching between apps. The daily planner auto-schedules your to-dos around your existing events.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes. No lock-in contracts. Cancel Pro at any time and your data stays accessible on the free plan forever.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-24 text-foreground">
      <div className="mb-12 text-center">
        <div className="mb-8 inline-flex items-center justify-center rounded-full border border-border bg-surface-elevated px-4 py-1.5 text-xs font-medium shadow-sm">
          FAQs
        </div>
        <h2 className="mb-4 font-serif text-4xl font-medium md:text-5xl">
          Common questions,
          <br />
          quick answers.
        </h2>
      </div>

      <Accordion defaultValue={[]} className="w-full space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="overflow-hidden rounded-2xl border border-border bg-surface-elevated px-2 shadow-sm transition-all hover:bg-surface-container/50"
          >
            <AccordionTrigger className="px-4 py-6 text-left font-medium hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-6 text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
