import Link from "next/link";

interface BackButtonProps {
  href: string;
}

export default function BackButton({ href }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="fixed top-6 left-6 w-10 h-10 flex items-center justify-center
                 rounded-lg border border-zen-gold/30 bg-zen-gold/5 text-zen-gold-dim
                 hover:bg-zen-gold/10 hover:border-zen-gold/50 transition-all duration-300 z-50
                 no-underline"
    >
      <span className="text-base leading-none">←</span>
    </Link>
  );
}
