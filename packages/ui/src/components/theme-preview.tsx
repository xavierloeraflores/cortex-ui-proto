"use client";

import { useEffect, useId, useState } from "react";
import { Check, Palette, RotateCcw, X } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const themes = [
  { value: "cyan", label: "Cyan" },
  { value: "red", label: "Red" },
  { value: "amber", label: "Amber" },
  { value: "green", label: "Green" },
  { value: "violet", label: "Violet" },
] as const;

type Theme = (typeof themes)[number]["value"];

/** A document-wide, temporary preview. Mount once in the app shell. */
export function ThemePreview() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme | null>(null);
  const id = useId();

  useEffect(() => {
    if (theme === null) return;
    const root = document.documentElement;
    const previous = root.getAttribute("data-cortex-theme");
    root.setAttribute("data-cortex-theme", theme);
    return () => {
      if (previous === null) root.removeAttribute("data-cortex-theme");
      else root.setAttribute("data-cortex-theme", previous);
    };
  }, [theme]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 h-11 gap-2 rounded-full border-primary/50 bg-popover px-4 text-popover-foreground shadow-lg dark:bg-popover"
          aria-label="Preview themes"
        >
          <Palette className="text-primary" />
          Themes
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        collisionPadding={16}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        className="max-h-[var(--radix-popover-content-available-height)] w-80 max-w-[calc(100vw-2rem)] overflow-y-auto p-5"
      >
        <div className="mb-2 flex items-center justify-between gap-4">
          <h2 id={`${id}-title`} className="text-sm font-medium">
            Preview a theme
          </h2>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Close theme preview"
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
        </div>
        <p id={`${id}-description`} className="mb-5 text-xs leading-relaxed text-muted-foreground">
          See the whole page in a different color.
        </p>
        <fieldset className="space-y-2">
          <legend className="mb-3 font-mono text-xs text-muted-foreground">
            Accent color
          </legend>
          {themes.map(({ value, label }) => (
            <label key={value} className="relative flex cursor-pointer items-center gap-3 rounded-md border border-border px-3 py-2.5 text-sm hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-accent has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring">
              <input
                type="radio"
                name={`${id}-theme`}
                value={value}
                checked={theme === value}
                onChange={() => setTheme(value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                data-cortex-theme={value}
                className="size-4 rounded-full bg-primary"
              />
              {label}
              {theme === value && <Check aria-hidden="true" className="ml-auto size-4 text-primary" />}
            </label>
          ))}
        </fieldset>
        <div className="mt-5 flex items-center justify-between gap-2 border-t pt-4">
          <span className="text-xs text-muted-foreground" role="status">
            {theme ? `${themes.find((item) => item.value === theme)?.label} preview` : "Original theme"}
          </span>
          <Button variant="ghost" size="sm" disabled={theme === null} onClick={() => setTheme(null)}>
            <RotateCcw /> Reset
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Preview only. Reload to restore the original.</p>
      </PopoverContent>
    </Popover>
  );
}
