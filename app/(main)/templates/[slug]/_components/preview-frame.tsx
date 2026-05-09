interface PreviewFrameProps {
  slug: string;
  title: string;
}

export default function PreviewFrame({ slug, title }: PreviewFrameProps) {
  const previewUrl = `/templates/${slug}/preview`;

  return (
    /*
     * aspect-[16/10] is set on the wrapper so the browser reserves the exact
     * pixel height before the iframe loads — eliminates layout shift.
     * The iframe fills the wrapper via absolute positioning.
     */
    <div className="relative w-full bg-muted" style={{ aspectRatio: "16/10" }}>
      <iframe
        src={previewUrl}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        title={`${title} preview`}
      />
    </div>
  );
}
