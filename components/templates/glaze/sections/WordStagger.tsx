import * as motion from "motion/react-client";
import { wordVariant, wordContainer, viewportOnce } from "./_motion";

interface WordStaggerProps {
  text: string;
  className?: string;
  /** Use animate instead of whileInView (for above-fold hero text) */
  onLoad?: boolean;
  stagger?: number;
  delay?: number;
}

export function WordStagger({
  text,
  className,
  onLoad = false,
  stagger = 0.055,
  delay = 0,
}: WordStaggerProps) {
  const words = text.split(" ");

  const containerProps = onLoad
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: viewportOnce };

  return (
    <motion.span
      variants={wordContainer(stagger, delay)}
      initial="hidden"
      {...containerProps}
      className={`inline ${className ?? ""}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariant}
          className="inline-block whitespace-pre"
        >
          {word}{i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
