function CheckIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F28482"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const PLANS = [
  {
    plan: "Starter",
    price: "$0",
    period: "/ month",
    desc: "Perfect for trying out Nexora and exploring AI image generation.",
    features: [
      "50 generations per month",
      "Standard resolution output",
      "Community prompt library",
      "Basic prompt suggestions",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    label: "Most Popular",
    plan: "Pro",
    price: "$19",
    period: "/ month",
    desc: "For creators and teams who need speed, volume, and full API access.",
    features: [
      "Unlimited generations",
      "4K resolution output",
      "Full API access",
      "Smart prompt suggestions",
      "Priority generation queue",
      "Project library with search",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    plan: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Tailored solutions for organizations with advanced needs and dedicated support.",
    features: [
      "Everything in Pro",
      "Custom model fine-tuning",
      "Dedicated infrastructure",
      "SSO & team management",
      "SLA & priority support",
    ],
    cta: "Contact Sales",
    featured: false,
  },
] as const;

export default function Pricing() {
  return (
    <section className="flex justify-center px-5 py-20">
      <div className="w-full max-w-[1100px] text-center">
        <p className="mb-4 inline-block bg-[linear-gradient(90deg,#F5C344,#F28482,#B567C2)] bg-clip-text text-xs font-semibold uppercase tracking-[1px] text-transparent">
          Pricing
        </p>
        <h2 className="mb-3 text-[2.75rem] font-medium tracking-[-0.02em] text-[#0f172a] max-md:text-4xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mb-14 text-lg leading-normal text-[#64748b]">
          Start free. Upgrade when you need more power.
        </p>

        <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.plan}
              className={`flex flex-col rounded-[20px] p-7 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] ${
                plan.featured
                  ? "bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] outline outline-2 outline-[#F28482]"
                  : "bg-[#F4F8F9]"
              }`}
            >
              {plan.featured && (
                <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.5px] text-[#F28482]">
                  {plan.label}
                </p>
              )}
              <p className="mb-2 text-[1.15rem] font-semibold text-[#1e293b]">
                {plan.plan}
              </p>
              <p className="mb-1 text-4xl font-medium tracking-[-0.02em] text-[#0f172a]">
                {plan.price}{" "}
                {plan.period && (
                  <span className="text-[0.9rem] font-normal text-[#64748b]">
                    {plan.period}
                  </span>
                )}
              </p>
              <p className="mb-6 border-b border-[#e2e8f0] pb-6 text-[0.85rem] leading-normal text-[#64748b]">
                {plan.desc}
              </p>
              <ul className="mb-7 flex flex-1 flex-col gap-3">
                {plan.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-2.5 text-[0.85rem] text-[#475569]"
                  >
                    <span
                      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                        plan.featured ? "bg-[#fff0f0]" : "bg-[#F4F8F9]"
                      }`}
                    >
                      <CheckIcon />
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-full py-3.5 text-center text-[0.85rem] font-semibold ${
                  plan.featured
                    ? "bg-gradient-to-br from-[#F5C344] via-[#F28482] to-[#B567C2] text-white shadow-[0_8px_24px_rgba(245,195,68,0.2)]"
                    : "border border-[#e2e8f0] bg-white text-[#1e293b]"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
