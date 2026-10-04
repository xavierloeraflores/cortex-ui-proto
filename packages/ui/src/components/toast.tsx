import type * as React from "react";
import { Toast as ToastPrimitive } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "../lib/utils";
export const ToastProvider = ToastPrimitive.Provider;
export function ToastViewport({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Viewport>) { return <ToastPrimitive.Viewport data-slot="toast-viewport" className={cn("fixed bottom-0 right-0 z-[100] flex w-full max-w-sm flex-col gap-2 p-4 outline-none", className)} {...props} />; }
export function Toast({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Root>) { return <ToastPrimitive.Root data-slot="toast" className={cn("relative rounded-md border border-primary/40 bg-popover p-4 pr-10 text-popover-foreground shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:translate-x-full", className)} {...props} />; }
export function ToastTitle({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Title>) { return <ToastPrimitive.Title className={cn("text-sm font-medium", className)} {...props} />; }
export function ToastDescription({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Description>) { return <ToastPrimitive.Description className={cn("mt-1 text-xs text-muted-foreground", className)} {...props} />; }
export function ToastAction({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Action>) { return <ToastPrimitive.Action className={cn("mt-3 rounded border px-2 py-1 text-xs text-primary", className)} {...props} />; }
export function ToastClose({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Close>) { return <ToastPrimitive.Close aria-label="Dismiss notification" className={cn("absolute top-3 right-3 rounded p-1 hover:bg-accent", className)} {...props}><X size={14} /></ToastPrimitive.Close>; }
