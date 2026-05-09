const STEPS = [
  {
    number: "1",
    title: "Describe Your Vision",
    desc: "Type a prompt or use smart suggestions to describe exactly what you want. Our AI understands context, style, and composition.",
    gradient: "from-[#F5C344] to-[#FFB347]",
  },
  {
    number: "2",
    title: "Generate & Refine",
    desc: "Watch your image come to life in seconds. Adjust parameters, tweak the prompt, or let Nexora enhance it automatically.",
    gradient: "from-[#F28482] to-[#E5A1F5]",
  },
  {
    number: "3",
    title: "Export & Integrate",
    desc: "Download in multiple formats or push directly to your project library. Access everything via API for automated workflows.",
    gradient: "from-[#B567C2] to-[#E5A1F5]",
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="flex justify-center bg-[#F4F8F9] px-5 py-20">
      <div className="w-full max-w-[1100px] text-center">
        <p className="mb-4 inline-block bg-[linear-gradient(90deg,#F5C344,#F28482,#B567C2)] bg-clip-text text-xs font-semibold uppercase tracking-[1px] text-transparent">
          How It Works
        </p>
        <h2 className="mb-3 text-[2.75rem] font-medium tracking-[-0.02em] text-[#0f172a] max-md:text-4xl">
          Three Steps to Create
        </h2>
        <p className="mb-14 text-lg leading-normal text-[#64748b]">
          A simple workflow that turns your imagination into reality
        </p>

        <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-[20px] bg-white p-7 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]"
            >
              <div
                className={`mb-5 flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br ${step.gradient} text-base font-semibold text-white`}
              >
                {step.number}
              </div>
              <h3 className="mb-2.5 text-[1.1rem] font-semibold text-[#1e293b]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#64748b]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
