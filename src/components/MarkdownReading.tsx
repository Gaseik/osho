import ReactMarkdown from "react-markdown";

interface MarkdownReadingProps {
  content: string;
}

export default function MarkdownReading({ content }: MarkdownReadingProps) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => (
          <h2 className="text-zen-gold/85 text-[1.1rem] font-semibold mt-6 first:mt-0 mb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-zen-gold/70 text-[1rem] font-medium mt-4 mb-1.5">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-white/80 leading-[1.8] mb-3">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="pl-5 mb-3">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="pl-5 mb-3 list-decimal">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-white/75 leading-[1.8] mb-1">
            {children}
          </li>
        ),
        strong: ({ children }) => (
          <strong className="text-zen-gold/90 font-semibold">
            {children}
          </strong>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-zen-gold/30 pl-4 text-white/60 italic my-4">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
