import { cn } from "@/lib/utils";

export function H1({ children, className }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-2xl font-bold tracking-tight md:text-3xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
