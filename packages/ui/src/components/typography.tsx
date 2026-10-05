import type * as React from "react";
import { cn } from "../lib/utils";
const styles = {
  h1: "text-4xl font-medium tracking-tight lg:text-5xl",
  h2: "text-3xl font-medium tracking-tight",
  h3: "text-2xl font-medium tracking-tight",
  h4: "text-xl font-medium",
  p: "text-sm leading-7",
  lead: "text-lg text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-xs font-medium",
  muted: "text-xs text-muted-foreground",
  blockquote:
    "border-s-2 border-primary ps-4 text-sm italic text-muted-foreground",
  code: "rounded bg-muted px-1.5 py-1 font-mono text-xs text-primary",
} as const;
export type TypographyProps = React.HTMLAttributes<HTMLElement> & {
  variant?: keyof typeof styles;
};
export function Typography({
  variant = "p",
  className,
  ...props
}: TypographyProps) {
  const Tag = (
    {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      p: "p",
      lead: "p",
      large: "p",
      small: "small",
      muted: "p",
      blockquote: "blockquote",
      code: "code",
    } as const
  )[variant];
  return (
    <Tag
      data-slot="typography"
      className={cn(styles[variant], className)}
      {...props}
    />
  );
}
