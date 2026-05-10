export default function TestimonialsSection() {
  const starPath =
    "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

  const testimonials = [
    { quote: "The only planner I\u2019ve actually stuck with", author: "sarah_m", stars: 4 },
    { quote: "Finally replaced five apps with just Bloom", author: "devjake", stars: 5 },
    { quote: "My whole team uses it for standups now", author: "torres_pm", stars: 4 },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="rounded-[3rem] bg-surface-container p-16 text-center">
        <h2 className="mb-16 font-serif text-4xl font-medium">
          They love it, so will you
        </h2>
        <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div key={idx} className="rounded-3xl border border-border bg-surface-elevated p-8 shadow-sm">
              <div className="mb-4 flex gap-1 text-foreground">
                {[...Array(t.stars)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d={starPath} />
                  </svg>
                ))}
                {t.stars < 5 && (
                  <svg className="h-4 w-4 fill-current text-foreground/20" viewBox="0 0 20 20">
                    <path d={starPath} />
                  </svg>
                )}
              </div>
              <p className="mb-4 font-serif text-xl leading-tight">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-sm font-medium text-muted-foreground">{t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
