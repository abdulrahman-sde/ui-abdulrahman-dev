import { TEMPLATES } from "@/constants/templates";

export async function GET() {
  const templateList = TEMPLATES.map(
    (t) =>
      `- [${t.title}](https://www.kairoui.online/template/${t.slug}): ${t.description}`,
  ).join("\n");

  const content = `# Kairo UI

A free, open-source library of MIT-licensed Next.js landing page templates built with Tailwind CSS v4 and React 19.

## What this site is
Kairo UI provides free landing page templates that developers can install directly into their Next.js projects using the shadcn CLI. No signup, no paywalls. All templates are MIT-licensed.

## Templates

${templateList}

## Install any template
\`\`\`
bunx shadcn add https://www.kairoui.online/r/<slug>.json
\`\`\`

## Technical details
- Framework: Next.js 16 with React 19
- Styling: Tailwind CSS v4
- Install method: shadcn CLI registry
- License: MIT

## Creator
Abdul Rahman Asif — @abdurahmanasif on Twitter/X
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
