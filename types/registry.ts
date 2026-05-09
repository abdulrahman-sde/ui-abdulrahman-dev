export type RegistryItemType =
  | "registry:block"
  | "registry:component"
  | "registry:ui"
  | "registry:page"
  | "registry:hook"
  | "registry:lib";

export interface RegistryFile {
  path: string;
  type: RegistryItemType;
  target?: string;
  content: string;
}

export interface RegistryCssVars {
  light?: Record<string, string>;
  dark?: Record<string, string>;
}

export interface RegistryItem {
  $schema: string;
  name: string;
  type: RegistryItemType;
  title: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  cssVars?: RegistryCssVars;
  tailwind?: { config?: { theme?: { extend?: Record<string, unknown> } } };
}

export interface TemplateMeta {
  name: string;
  title: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  cssVars?: RegistryCssVars;
  fileTargets?: Record<string, string>;
}

export interface TemplateSourceFile {
  path: string;
  content: string;
  html: string;
}

export interface TemplateSource {
  slug: string;
  files: TemplateSourceFile[];
}
