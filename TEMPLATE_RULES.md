# Template Authoring Rules

This document outlines the standard operating procedure for creating and registering new templates in the UI library. Follow these rules to ensure consistency, proper registry generation, and Shadcn UI compatibility.

## 1. Folder Structure
Every new template must follow a strict separation between the Next.js App Router preview and the reusable component source code.

- **Preview Routes**: `app/templates/[slug]/`
  - Must contain `page.tsx` and `layout.tsx`.
  - `layout.tsx` must import the template's specific `globals.css` (e.g., `import "@/components/templates/[slug]/globals.css";`).
  - These files are shipped to users to ensure their installation perfectly matches the preview.

- **Source Code**: `components/templates/[slug]/`
  - Must contain all template-specific code, including `globals.css`.
  - Organize components logically (e.g., `sections/`, `ui/`, `icons/`).

## 2. Global CSS Rules
The `components/templates/[slug]/globals.css` file is crucial as it overrides the base application styles when users install the template.

- **Standard Shadcn v4 Syntax**: You must use standard Shadcn CSS variables mapped via `@theme inline`.
- **Single Theme Strategy**: Templates are designed to have a single, fixed theme. Define all color variables (whether light or dark) directly inside `:root`. Do not use `.dark` classes or theme toggles.
- **Base Layer**: Always include the following base layer reset:
  ```css
  @layer base {
    * {
      @apply border-border outline-ring/50;
    }
    body {
      @apply bg-background text-foreground;
    }
  }
  ```
- **Custom Utilities**: Append any custom classes (e.g., `.glass-panel`) at the end of the file. Do not use generic template wrapper classes like `.template-theme` on the body.

## 3. Registry Configuration
For a template to be installable via CLI, it must be properly registered.

- **File**: `lib/registry/build-registry-item.ts`
- Add the template's metadata to the `METAS` object.
- **Dependencies**: Thoroughly audit the components for external packages and list them in the `dependencies` array (e.g., `tw-animate-css`, `lucide-react`, `motion`).
- **Registry Dependencies**: List any base Shadcn UI components required by the template in `registryDependencies` (e.g., `["button", "card", "accordion"]`).

```typescript
// Example:
[slug]: {
  name: "[slug]",
  title: "Template Name",
  description: "A description of the template.",
  dependencies: ["tw-animate-css", "motion"],
  registryDependencies: ["button", "card"],
}
```

## 4. Templates List
To display the template in the marketplace/gallery:

- **File**: `constants/templates.ts`
- Add an entry to the `TEMPLATES` array.
- Required fields: `slug`, `title`, `description`, `color`, `accent`.
- Optional: `thumbnail` (import from `public/thumbnails/`).
- **Template Color**: If the `color` you want to use is not supported, add it to the `TemplateColor` union type in `types/template.ts`.
