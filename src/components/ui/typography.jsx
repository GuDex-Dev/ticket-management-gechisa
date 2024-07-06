import { cn } from "@/lib/utils";

export function H1({ children, className }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight md:text-[2.5rem]",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function TimeSubtitle({ children, className }) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-sm font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h4>
  );
}
