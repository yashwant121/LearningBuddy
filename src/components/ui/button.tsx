import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-2xl text-lg font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 active:scale-95 hover:animate-bounce-gentle",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-md hover:shadow-lg",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-lg hover:shadow-xl",
        success:
          "bg-success text-success-foreground hover:bg-success/90 shadow-lg hover:shadow-xl",
        warning:
          "bg-warning text-warning-foreground hover:bg-warning/90 shadow-lg hover:shadow-xl",
        game:
          "bg-game text-game-foreground hover:bg-game/90 shadow-lg hover:shadow-xl",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-16 px-6 py-4 min-w-[120px]",
        sm: "h-12 rounded-xl px-4 min-w-[100px]",
        lg: "h-20 rounded-3xl px-8 min-w-[160px] text-xl",
        xl: "h-24 rounded-3xl px-10 min-w-[200px] text-2xl",
        icon: "h-16 w-16",
        "icon-sm": "h-12 w-12",
        "icon-lg": "h-20 w-20",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
