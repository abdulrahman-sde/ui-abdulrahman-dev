"use client";
import { useState } from "react";
import Link from "next/link";
import { TEMPLATES } from "@/constants/templates";
import { Button } from "@/components/ui/button";
import { ChevronRight, Check, Heart, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = TEMPLATES.map((t) => t.category)
  .filter((v, i, a) => a.indexOf(v) === i)
  .sort();

const STACK_OPTIONS = ["Next.js", "Astro", "Vite", "Tailwind", "TypeScript", "MDX", "Motion", "Dark mode"];

type FormState = {
  name: string;
  category: string;
  description: string;
  repo: string;
  preview: string;
  email: string;
  stack: string[];
};

const EMPTY_FORM: FormState = { name: "", category: "SaaS", description: "", repo: "", preview: "", email: "", stack: [] };

export default function SubmitForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof FormState, v: string | string[]) => setForm((f) => ({ ...f, [k]: v }));
  const toggleStack = (s: string) =>
    set("stack", form.stack.includes(s) ? form.stack.filter((x) => x !== s) : [...form.stack, s]);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-muted-foreground mb-8 flex items-center gap-2 text-sm">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="size-3" />
          <Link href="/templates" className="hover:text-foreground">Templates</Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">Submit</span>
        </div>

        <div className="mb-10 space-y-3">
          <h1 className="font-serif text-5xl font-medium">Submit a template</h1>
          <p className="text-muted-foreground max-w-lg text-balance">
            Built something you&apos;d like to share? Send it over and I&apos;ll review it within a few days. All accepted templates stay free and credit you as the author.
          </p>
        </div>

        {submitted ? (
          <div className="border-border bg-card rounded-3xl border p-10 text-center">
            <div className="bg-primary/15 text-primary mx-auto mb-4 flex size-14 items-center justify-center rounded-full">
              <Check className="size-6" />
            </div>
            <h2 className="font-serif text-3xl font-medium">Got it — thank you.</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Your submission is in the queue. I&apos;ll email you at{" "}
              <span className="text-foreground font-mono">{form.email || "your address"}</span> once it&apos;s reviewed.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/templates">Browse templates</Link>
              </Button>
              <Button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); }}>
                Submit another
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="border-border bg-card space-y-6 rounded-3xl border p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Template name" required>
                <FormInput required value={form.name} onChange={(v) => set("name", v)} placeholder="e.g. Northwind" />
              </Field>
              <Field label="Category" required>
                <select value={form.category} onChange={(e) => set("category", e.target.value)} className="form-input">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
            </div>

            <Field label="One-line description" required>
              <FormInput required value={form.description} onChange={(v) => set("description", v)} placeholder="What is this template for?" />
              <span className="text-muted-foreground mt-1 block text-[10px]">{form.description.length}/120</span>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="GitHub repo" required>
                <FormInput required value={form.repo} onChange={(v) => set("repo", v)} placeholder="github.com/you/template" />
              </Field>
              <Field label="Live preview URL">
                <FormInput value={form.preview} onChange={(v) => set("preview", v)} placeholder="preview.your-domain.com" />
              </Field>
            </div>

            <Field label="Your email" required>
              <FormInput required type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="you@domain.com" />
            </Field>

            <div>
              <p className="mb-3 text-sm font-medium">
                Stack <span className="text-muted-foreground font-normal">(check all that apply)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {STACK_OPTIONS.map((s) => {
                  const on = form.stack.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleStack(s)}
                      className={cn(
                        "border h-8 cursor-pointer inline-flex items-center gap-1.5 rounded-full px-3 text-xs transition-colors",
                        on ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-muted/50",
                      )}
                    >
                      {on && <Check className="size-3" />}
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-border bg-background flex items-start gap-3 rounded-2xl border p-4">
              <input id="lic" type="checkbox" required className="mt-1 size-4 accent-primary" />
              <label htmlFor="lic" className="text-muted-foreground text-sm leading-relaxed">
                I agree to publish under <span className="text-foreground font-medium">MIT</span>, and confirm I own the rights to all assets included.
              </label>
            </div>

            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-between">
              <p className="text-muted-foreground text-xs">Reviewed within 3–5 days. No spam.</p>
              <div className="flex w-full gap-2 sm:w-auto">
                <Button variant="outline" type="button" className="flex-1 sm:flex-none" asChild>
                  <Link href="/templates">Cancel</Link>
                </Button>
                <Button type="submit" className="flex-1 pr-1.5 sm:flex-none">
                  Submit <ChevronRight className="opacity-50" />
                </Button>
              </div>
            </div>
          </form>
        )}

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <FactCard icon={<Heart className="size-4" />} title="Stays free, forever" body="No paywalls or rev-share. Ever." />
          <FactCard icon={<Star className="size-4" />} title="You keep the credit" body="Linked from the detail page." />
          <FactCard icon={<Zap className="size-4" />} title="Fast review" body="Most templates ship in a week." />
        </div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          height: 2.75rem;
          padding: 0 1rem;
          border-radius: 9999px;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          font-size: 0.875rem;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
          font-family: inherit;
          color: inherit;
        }
        .form-input:focus {
          border-color: var(--color-ring);
          box-shadow: 0 0 0 3px color-mix(in oklch, var(--color-ring) 30%, transparent);
        }
        select.form-input {
          padding-right: 2rem;
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.4)' d='M0 0h10L5 6z'/></svg>");
          background-repeat: no-repeat;
          background-position: right 1rem center;
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">
        {label}{required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}

function FormInput({ value, onChange, placeholder, required, type = "text" }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <input
      required={required}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="form-input"
    />
  );
}

function FactCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <div className="bg-muted text-primary flex size-8 items-center justify-center rounded-xl">{icon}</div>
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className="text-muted-foreground mt-1 text-xs">{body}</p>
    </div>
  );
}
