export interface Template {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  previewImage: string;
  githubUrl: string;
  previewUrl?: string;
  featured?: boolean;
}
