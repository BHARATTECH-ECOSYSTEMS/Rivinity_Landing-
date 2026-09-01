"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Site-wide arrow CTA. Dark pill by default (matches the reference chip
 * "Get started ↗"), with light + ghost variants for use on dark backgrounds
 * or inside footer link lists. The trailing arrow is baked in — do not add
 * another one in children.
 *
 * Renders as <button> by default, or as its child via asChild (e.g. Link).
 */
const arrowButtonVariants = cva(
  "group/arrow inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-medium cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        dark: "bg-ink text-white hover:bg-ink/90 shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_1px_2px_0_rgba(0,0,0,0.15)] focus-visible:ring-white/90 focus-visible:ring-offset-ink",
        light:
          "bg-white text-ink border border-hairline hover:bg-white/80 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] focus-visible:ring-ink/70",
        ghost:
          "text-ink-muted hover:text-ink px-0 rounded-none gap-1 focus-visible:ring-ink/60 focus-visible:rounded-sm [&>span.arrow-chip]:bg-transparent [&>span.arrow-chip]:h-auto [&>span.arrow-chip]:w-auto",
      },
      size: {
        sm: "h-8 px-3 text-[12.5px]",
        md: "h-9 px-4 text-[13px]",
        lg: "h-11 px-5 text-[13.5px]",
      },
    },
    defaultVariants: { variant: "dark", size: "md" },
  },
);

export interface ArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof arrowButtonVariants> {
  asChild?: boolean;
  /** Hide the trailing arrow (rare — prefer default). */
  hideArrow?: boolean;
}

export const ArrowButton = React.forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ className, variant, size, asChild = false, hideArrow = false, children, ...props }, ref) => {
    const inner = (
      <>
        <span>{children}</span>
        {!hideArrow && (
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5"
            aria-hidden
          />
        )}
      </>
    );
    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
      }>;
      return (
        <Slot
          ref={ref}
          className={cn(arrowButtonVariants({ variant, size }), className)}
          {...props}
        >
          {React.cloneElement(child, {
            children: (
              <>
                <span>{child.props.children}</span>
                {!hideArrow && (
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5"
                    aria-hidden
                  />
                )}
              </>
            ),
          })}
        </Slot>
      );
    }
    return (
      <button
        ref={ref}
        className={cn(arrowButtonVariants({ variant, size }), className)}
        {...props}
      >
        {inner}
      </button>
    );
  },
);
ArrowButton.displayName = "ArrowButton";

export { arrowButtonVariants };
export default ArrowButton;
