import React from "react";

const cardVariants = {
  default:
    "bg-white border border-gray-200",
  elevated:
    "bg-white shadow-lg hover:shadow-xl border border-gray-200",
  glass:
    "backdrop-blur-md bg-white/20 border border-white/30",
  gradient:
    "bg-gradient-to-br from-white to-gray-50 border border-gray-200",
  feature:
    "bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200",
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof cardVariants;
  hover?: boolean;
  glow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = "",
      variant = "default",
      hover = false,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "rounded-xl overflow-hidden transition-all duration-300";
    const hoverClasses = hover ? "hover:scale-105 hover:-translate-y-1" : "";
    const glowClasses = glow ? "hover:shadow-2xl hover:shadow-blue-500/25" : "";

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${cardVariants[variant]} ${hoverClasses} ${glowClasses} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 ${className}`}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-gray-600 ${className}`}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`p-6 ${className}`} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`flex items-center p-6 ${className}`} {...props} />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
