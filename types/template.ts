import type { StaticImageData } from "next/image";

export interface Template {
  slug: string;
  title: string;
  description: string;
  /** Path relative to /public, e.g. "/previews/notio.jpg". 1280×800 (16/10). */
  thumbnail?: StaticImageData;
}
