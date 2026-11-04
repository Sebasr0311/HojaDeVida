import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Componente local con la API habitual de shadcn/ui (Button + CVA + Radix Slot).
const buttonVariants = cva("button", {
  variants: {
    variant: {
      default: "button--primary",
      secondary: "button--secondary",
      outline: "button--outline",
      ghost: "button--ghost"
    },
    size: {
      default: "button--default",
      sm: "button--small",
      lg: "button--large",
      icon: "button--icon"
    }
  },
  defaultVariants: { variant: "default", size: "default" }
});

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
};

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
